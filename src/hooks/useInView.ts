'use client'
import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // If element is already in viewport on mount, show immediately
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true)
        return
      }
    }

    // Fallback: show content after 800ms even if observer never fires
    const fallback = setTimeout(() => setInView(true), 800)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          clearTimeout(fallback)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [threshold])

  return { ref, inView }
}
