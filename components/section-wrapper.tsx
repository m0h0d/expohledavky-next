"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom" | "bounce"
  delay?: number
}

export function SectionWrapper({ children, className, animation = "fade-up", delay = 0 }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation class when the section comes into view
            const animationClass = `animate-section-${animation}`
            entry.target.classList.add(animationClass)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [animation])

  return (
    <div 
      ref={sectionRef} 
      className={cn(
        "opacity-0",
        "transition-all duration-700",
        className
      )} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

