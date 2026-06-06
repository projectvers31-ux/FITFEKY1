#!/usr/bin/env python3
"""Generate MDX blog posts from products.json using the Gemini API.

Reads:
    scripts/products.json  (list of product objects)

Writes:
    content/blog/{slug}.mdx  (one per processed product, with draft:true)

Logs:
    logs/YYYY-MM-DD.log

Env vars (read from .env in project root):
    GEMINI_API_KEY   required
    GEMINI_MODEL     optional, default "gemini-1.5-flash"
    BLOG_AUTHOR      optional, default "FitFeky Team"

Usage:
    python scripts/generate_blog.py [--batch-size N] [--dry-run]
"""

from __future__ import annotations

import argparse
import json
import os
import random
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "scripts" / "products.json"
CONTENT_DIR = ROOT / "content" / "blog"
LOGS_DIR = ROOT / "logs"
ENV_FILE = ROOT / ".env"

BATCH_SIZE_DEFAULT = 3
MAX_RETRIES = 3
RETRY_BACKOFF_SEC = 2.0
GEMINI_MODEL_DEFAULT = "gemini-1.5-flash"

VALID_CATEGORIES = [
    "weight-loss", "muscle-gain", "endurance",
    "general-fitness", "strength", "nutrition", "cardio", "recovery",
]


def load_env() -> None:
    if not ENV_FILE.exists():
        return
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text.strip())
    return text[:80].strip("-")


def log_line(log_fp, message: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{ts}] {message}"
    print(line)
    log_fp.write(line + "\n")
    log_fp.flush()


def existing_slugs() -> set[str]:
    if not CONTENT_DIR.exists():
        return set()
    return {p.stem for p in CONTENT_DIR.glob("*.mdx")}


def load_products() -> list[dict[str, Any]]:
    if not PRODUCTS_JSON.exists():
        return []
    return json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))


def build_prompt(product: dict[str, Any]) -> str:
    name = product.get("name", "")
    price = product.get("price", "")
    benefits = product.get("benefits", [])
    category = product.get("category", "general-fitness")
    goals = product.get("goals", [])

    return f"""You are a fitness writer for FitFeky.com. Write an honest, helpful blog post
reviewing the following product. Do NOT include hype or fake claims. Use plain English.
Aim for 600-900 words with 3-5 sections using Markdown (## and ### headings).

Product:
- Name: {name}
- Price: ${price}
- Category: {category}
- Goals: {", ".join(goals) if goals else "general fitness"}
- Benefits: {", ".join(benefits) if benefits else "n/a"}

Output STRICT JSON with this exact shape (no prose, no markdown fence):
{{
  "title": "...",
  "excerpt": "1-2 sentence summary (<=180 chars)",
  "metaDescription": "SEO meta description (<=160 chars)",
  "category": "one of: {", ".join(VALID_CATEGORIES)}",
  "tags": ["3", "to", "5", "lowercase", "tags"],
  "content": "Full MDX body in Markdown. No frontmatter. Start with a short intro paragraph, then ## sections."
}}

Constraints:
- "content" must be plain Markdown (## for h2, ### for h3, plain paragraphs, - for lists)
- No code blocks, no HTML
- "excerpt" and "metaDescription" must each be <= the stated char limits
- "category" MUST be one of the listed valid values
"""


def call_gemini(prompt: str, api_key: str, model: str) -> dict[str, Any]:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={api_key}"
    )
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "topP": 0.9,
            "maxOutputTokens": 2048,
            "responseMimeType": "application/json",
        },
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode("utf-8")
    parsed = json.loads(body)
    text = parsed["candidates"][0]["content"]["parts"][0]["text"]
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    return json.loads(text)


def generate_with_retry(product: dict[str, Any], api_key: str, model: str) -> dict[str, Any]:
    last_err: Exception | None = None
    prompt = build_prompt(product)
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return call_gemini(prompt, api_key, model)
        except (urllib.error.URLError, urllib.error.HTTPError, KeyError, json.JSONDecodeError) as e:
            last_err = e
            if attempt < MAX_RETRIES:
                backoff = RETRY_BACKOFF_SEC * (2 ** (attempt - 1)) + random.uniform(0, 0.5)
                time.sleep(backoff)
    raise RuntimeError(f"Gemini call failed after {MAX_RETRIES} attempts: {last_err}")


def yaml_escape(value: str) -> str:
    if re.search(r'[":#\n]', value) or value != value.strip():
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return value


def build_frontmatter(fields: dict[str, Any]) -> str:
    lines = ["---"]
    for key, value in fields.items():
        if isinstance(value, bool):
            lines.append(f"{key}: {'true' if value else 'false'}")
        elif isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {yaml_escape(str(item))}")
        elif value is None:
            lines.append(f"{key}: ")
        else:
            lines.append(f"{key}: {yaml_escape(str(value))}")
    lines.append("---")
    lines.append("")
    return "\n".join(lines)


def validate_post(post: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if not post.get("title"):
        errors.append("missing title")
    excerpt = post.get("excerpt", "")
    if len(excerpt) > 200:
        errors.append(f"excerpt too long ({len(excerpt)} chars)")
    meta = post.get("metaDescription", "")
    if len(meta) > 170:
        errors.append(f"metaDescription too long ({len(meta)} chars)")
    category = post.get("category", "")
    if category not in VALID_CATEGORIES:
        errors.append(f"invalid category '{category}'")
    if not post.get("content", "").strip():
        errors.append("missing content")
    tags = post.get("tags", [])
    if not isinstance(tags, list) or not (3 <= len(tags) <= 6):
        errors.append(f"tags must be 3-6 items (got {len(tags) if isinstance(tags, list) else 'n/a'})")
    return errors


def process_product(
    product: dict[str, Any],
    api_key: str,
    model: str,
    author: str,
    log_fp,
) -> bool:
    product_id = product.get("id", "")
    name = product.get("name", "")
    if not product_id or not name:
        log_line(log_fp, f"SKIP: missing id or name: {product}")
        return False

    slug = slugify(product_id)
    target = CONTENT_DIR / f"{slug}.mdx"
    if target.exists():
        log_line(log_fp, f"SKIP existing: {slug}.mdx")
        return False

    log_line(log_fp, f"GENERATE: {product_id} -> {slug}.mdx")
    try:
        post = generate_with_retry(product, api_key, model)
    except RuntimeError as e:
        log_line(log_fp, f"FAIL: {e}")
        return False

    issues = validate_post(post)
    if issues:
        log_line(log_fp, f"VALIDATION FAILED for {slug}: {', '.join(issues)}")
        return False

    today = date.today().isoformat()
    image = product.get("image", "")
    affiliate_link = product.get("affiliateLink", "")

    frontmatter = build_frontmatter({
        "title": post["title"],
        "date": today,
        "slug": slug,
        "excerpt": post["excerpt"],
        "image": image,
        "category": post["category"],
        "tags": post["tags"],
        "affiliateLink": affiliate_link,
        "author": author,
        "draft": True,
        "metaDescription": post["metaDescription"],
    })

    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(f"{frontmatter}\n{post['content'].strip()}\n", encoding="utf-8")
    log_line(log_fp, f"OK: wrote {target.relative_to(ROOT)}")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate MDX blog posts via Gemini.")
    parser.add_argument("--batch-size", type=int, default=BATCH_SIZE_DEFAULT)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    load_env()
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    model = os.environ.get("GEMINI_MODEL", GEMINI_MODEL_DEFAULT).strip()
    author = os.environ.get("BLOG_AUTHOR", "FitFeky Team").strip()

    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    log_path = LOGS_DIR / f"{date.today().isoformat()}.log"
    log_fp = open(log_path, "a", encoding="utf-8")

    try:
        if not api_key:
            log_line(log_fp, "ERROR: GEMINI_API_KEY not set in .env or environment.")
            return 1

        products = load_products()
        if not products:
            log_line(log_fp, "ERROR: products.json is empty or missing.")
            return 1

        taken = existing_slugs()
        pending = []
        for product in products:
            slug = slugify(product.get("id", ""))
            if slug and slug not in taken:
                pending.append(product)
            if len(pending) >= args.batch_size:
                break

        log_line(log_fp, f"Batch: {len(pending)} of {args.batch_size} requested. Model={model}.")

        if not pending:
            log_line(log_fp, "Nothing to do. All products already have blog posts.")
            return 0

        if args.dry_run:
            log_line(log_fp, "DRY-RUN: would process " + ", ".join(p.get("id", "?") for p in pending))
            return 0

        success = 0
        for product in pending:
            if process_product(product, api_key, model, author, log_fp):
                success += 1

        log_line(log_fp, f"DONE: {success}/{len(pending)} posts generated successfully.")
        return 0 if success > 0 else 2
    finally:
        log_fp.close()


if __name__ == "__main__":
    sys.exit(main())
