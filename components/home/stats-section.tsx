"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { label: "APIs Available", value: 1247, suffix: "+" },
  { label: "Active Developers", value: 50000, suffix: "+" },
  { label: "API Calls / Month", value: 2.4, suffix: "B", decimals: 1 },
  { label: "Uptime", value: 99.99, suffix: "%", decimals: 2 },
]

function AnimatedCounter({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(target * eased)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-4xl font-bold text-foreground sm:text-5xl">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      <span className="text-primary">{suffix}</span>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
