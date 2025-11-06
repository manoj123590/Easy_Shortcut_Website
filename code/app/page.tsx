"use client"

import { Navbar } from "@/components/navbar"
import { useState, useEffect } from "react"
import Link from "next/link"

const KeyDisplay = ({ keys }: { keys: string[] }) => {
  const [currentKey, setCurrentKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKey((prev) => (prev + 1) % keys.length)
    }, 500)
    return () => clearInterval(interval)
  }, [keys.length])

  return (
    <div className="flex gap-2 items-center">
      {keys.map((key, idx) => (
        <div
          key={idx}
          className={`px-4 py-3 rounded-lg font-mono font-bold transition-all duration-300 transform ${
            idx === currentKey
              ? "bg-primary text-primary-foreground scale-110 animate-glow"
              : "bg-muted text-foreground"
          }`}
        >
          {key}
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Master Keyboard Shortcuts in Seconds"

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [displayedText])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-bounce-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
              <span className="text-primary font-semibold text-sm">⚡ Learn Faster, Work Smarter</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              <span className="inline-block">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your complete hub for keyboard shortcuts across Office, Creative Tools, Development, and more. Boost your
              productivity instantly.
            </p>
          </div>

          {/* Animated Key Display */}
          <div className="mb-16 flex flex-col sm:flex-row gap-8 justify-center items-center">
            <KeyDisplay keys={["Ctrl", "C"]} />
            <span className="text-muted-foreground">•</span>
            <KeyDisplay keys={["Ctrl", "V"]} />
            <span className="text-muted-foreground">•</span>
            <KeyDisplay keys={["Ctrl", "Z"]} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/shortcuts"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Explore Shortcuts →
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-foreground text-foreground rounded-lg font-bold hover:bg-foreground hover:text-background transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              { emoji: "⌨", title: "All Applications", desc: "Office, Creative, Dev Tools & More" },
              { emoji: "⚡", title: "Instant Learning", desc: "Searchable, Filterable & Organized" },
              { emoji: "🎯", title: "Category Based", desc: "Find shortcuts by purpose & use case" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Categories Preview */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Explore by Application</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "MS Word", emoji: "📄", color: "from-blue-600 to-blue-500" },
              { name: "MS Excel", emoji: "📊", color: "from-green-600 to-green-500" },
              { name: "VS Code", emoji: "💻", color: "from-slate-700 to-slate-600" },
              { name: "Git", emoji: "🔀", color: "from-orange-600 to-orange-500" },
              { name: "Linux Terminal", emoji: "🐧", color: "from-gray-700 to-gray-600" },
              { name: "Jupyter Notebook", emoji: "📓", color: "from-orange-600 to-orange-500" },
              { name: "Adobe Photoshop", emoji: "🎨", color: "from-blue-400 to-blue-600" },
              { name: "Python", emoji: "🐍", color: "from-blue-500 to-yellow-500" },
              { name: "Power BI", emoji: "📈", color: "from-yellow-600 to-yellow-500" },
              { name: "Mac System", emoji: "🍎", color: "from-gray-800 to-gray-700" },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/apps/${encodeURIComponent(cat.name)}`}
                className={`group p-6 rounded-lg bg-gradient-to-br ${cat.color} text-white font-bold text-center hover:shadow-2xl transition-all transform hover:scale-110 hover:-translate-y-1 cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce">{cat.emoji}</div>
                <div className="text-sm md:text-base font-semibold group-hover:translate-y-1 transition-transform">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
