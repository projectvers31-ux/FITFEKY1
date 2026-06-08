'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-muted">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {progress >= 25 && progress < 90 && (
        <span className="absolute top-2 right-4 text-xs text-muted-foreground">
          {Math.round(progress)}% read
        </span>
      )}
      {progress >= 90 && (
        <span className="absolute top-2 right-4 text-xs font-medium text-primary">
          Almost done!
        </span>
      )}
    </div>
  )
}
