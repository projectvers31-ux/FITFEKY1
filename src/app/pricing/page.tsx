import Link from "next/link";

import { Scale, Flame, Utensils, Heart, Percent, ArrowRight, ClipboardList, Star } from "lucide-react";

import { AffiliateCard } from "@/components/affiliate/AffiliateCard";
import { Background } from "@/components/background";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { tools, type Tool } from "@/data/tools";
import { getAllPosts } from "@/lib/mdx";
import { getAllToolPosts } from "@/lib/mdx-tools";
import { buildMetadata } from "@/lib/seo";

const ICONS: Record<string, typeof Scale> = {
  bmi: Scale,
  calorie: Flame,
  macro: Utensils,
  "heart-rate": Heart,
  "body-fat": Percent,
};

export const metadata = buildMetadata({
  title: "All Free Resources — Calculators, Guides & Quizzes | FitFeky",
  description:
    "Every free tool FitFeky offers in one place — BMI, calorie and macro calculators, heart rate zones, expert guides, and a personalised fitness quiz. No sign-up required.",
  path: "/pricing",
  keywords: [
    "free fitness resources",
    "FitFeky resources",
    "free calculators women",
    "fitness guides for women",
    "personalised fitness quiz",
    "free workout tools",
  ],
  imageAlt: "All FitFeky free resources — calculators, guides, quizzes",
});

export default async function ResourcesPage() {
  const posts = (await getAllPosts()).slice(0, 3)
  const toolArticles = (await getAllToolPosts()).slice(0, 3)
  const topProducts = products.slice(0, 3)

  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl tracking-tight md:text-4xl lg:text-5xl">
              All Resources
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-snug">
              Everything FitFeky has to offer — free calculators, expert guides, interactive quizzes, and more.
            </p>
          </div>

          {/* Calculators */}
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <Scale className="text-primary size-6" />
              <h2 className="text-2xl font-bold tracking-tight">Free Fitness Calculators</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {tools.map((tool) => {
                const Icon = ICONS[tool.slug] ?? Scale;
                return (
                  <Link key={tool.id} href={`/tools/${tool.slug}`} className="group">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardContent className="flex flex-col items-start gap-3 p-5">
                        <div className="bg-primary/10 rounded-xl p-2.5">
                          <Icon className="text-primary size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-muted-foreground mt-0.5 text-sm">{tool.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/tools">View All Calculators <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Blog */}
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <ClipboardList className="text-primary size-6" />
              <h2 className="text-2xl font-bold tracking-tight">Expert Reviews & Guides</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={{
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.description,
                    image: post.cover,
                    category: post.category,
                    date: post.date,
                  }}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/blog">Read All Articles <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Tool deep-dives */}
          {toolArticles.length > 0 && (
            <div className="mt-16">
              <div className="mb-6 flex items-center gap-3">
                <ClipboardList className="text-primary size-6" />
                <h2 className="text-2xl font-bold tracking-tight">In-depth tool guides</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {toolArticles.map((post) => {
                  const tool: Tool | undefined = tools.find((t) => t.id === post.tool)
                  if (!tool) return null
                  return (
                    <BlogCard
                      key={post.slug}
                      href={`/tools/${tool.slug}/blog/${post.slug}`}
                      post={{
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.description,
                        cover: post.cover,
                        category: post.category,
                        date: post.date,
                        readTime: post.readingTime,
                      }}
                    />
                  )
                })}
              </div>
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link href="/blog">Browse All Guides <ArrowRight className="size-4" /></Link>
                </Button>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <Star className="text-primary size-6" />
              <h2 className="text-2xl font-bold tracking-tight">Editor-tested products</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topProducts.map((product) => (
                <AffiliateCard key={product.id} product={product} showBadge={false} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/products">See All Products <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Quiz */}
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <Star className="text-primary size-6" />
              <h2 className="text-2xl font-bold tracking-tight">Interactive Quizzes</h2>
            </div>
            <Card>
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <p className="text-muted-foreground max-w-lg leading-snug">
                  Not sure where to start? Take our quizzes to get personalized fitness and nutrition recommendations tailored to your goals.
                </p>
                <Button asChild>
                  <Link href="/quiz">Take a Quiz <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Background>
  );
}
