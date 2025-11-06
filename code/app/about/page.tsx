"use client"

import { Navbar } from "@/components/navbar"
import { ArrowRight, Zap, TrendingUp, BookOpen } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About KeyFlow</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Your comprehensive resource for mastering keyboard shortcuts across all your favorite applications. We
            believe that learning shortcuts is one of the fastest ways to boost your productivity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                We believe that keyboard shortcuts are one of the most underutilized tools for professional
                productivity. By learning just a few key combinations for your most-used applications, you can save
                hours every week.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                KeyFlow was built to make discovering, learning, and mastering these shortcuts as easy as possible. Our
                searchable, categorized database eliminates the need to search across multiple sources or dig through
                application menus.
              </p>
            </div>
            <div
              className="bg-card p-8 rounded-lg border border-border hover-light-effect transition-all animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Zap className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Save Time Daily</h3>
                    <p className="text-muted-foreground text-sm">
                      Users who master shortcuts save 15-30 minutes per day on average
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Increase Efficiency</h3>
                    <p className="text-muted-foreground text-sm">
                      Work flows faster and smoother without constant mouse interruptions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BookOpen className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Learn Fast</h3>
                    <p className="text-muted-foreground text-sm">
                      Organized by category and purpose, not just alphabetically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Who Should Use KeyFlow?</h2>
            <p className="text-lg text-muted-foreground">
              KeyFlow is for anyone who uses software professionally or frequently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                emoji: "👔",
                title: "Office Workers",
                desc: "Spend your day in Word, Excel, and PowerPoint? Master the shortcuts that matter most for your workflow.",
                benefits: [
                  "Format documents faster with Text Formatting shortcuts",
                  "Navigate spreadsheets efficiently with Navigation keys",
                  "Create presentations quicker with Design shortcuts",
                ],
              },
              {
                emoji: "🎨",
                title: "Designers",
                desc: "Professional design tools require efficiency. Shortcuts are essential for maintaining creative flow.",
                benefits: [
                  "Master Photoshop tools without menu hunting",
                  "Switch between tools instantly for faster workflow",
                  "Zoom and navigate canvas efficiently",
                ],
              },
              {
                emoji: "💻",
                title: "Developers",
                desc: "Development is all about efficiency. Master the terminal and IDE shortcuts that matter most.",
                benefits: [
                  "Navigate terminals with essential keyboard commands",
                  "Boost code editing speed with IDE shortcuts",
                  "Manage git and version control faster",
                ],
              },
              {
                emoji: "🎓",
                title: "Students",
                desc: "Get ahead by building efficient habits early. Start shortcuts practice now for future success.",
                benefits: [
                  "Write papers faster in Word with formatting shortcuts",
                  "Create project presentations more efficiently",
                  "Get ahead with professional shortcuts knowledge",
                ],
              },
            ].map((usecase, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 bg-card rounded-lg border border-border hover-light-effect transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl mb-4">{usecase.emoji}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{usecase.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">{usecase.desc}</p>
                <ul className="space-y-2">
                  {usecase.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                      <span className="text-primary mt-1 flex-shrink-0">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Why Learn Shortcuts?</h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Save Time",
                description:
                  "Switch between keyboard and mouse is time-consuming. Shortcuts keep your hands on the keyboard, dramatically reducing wasted motion.",
              },
              {
                title: "Better Focus",
                description:
                  "Removing the need to hunt through menus keeps you in flow state. Your creative and analytical thinking isn't interrupted.",
              },
              {
                title: "Reduce Strain",
                description:
                  "Less reliance on the mouse means less repetitive strain injuries. Keyboard-first workflows are healthier for your body.",
              },
              {
                title: "Professional Edge",
                description:
                  "In professional environments, efficiency is noticed. Users who master shortcuts are perceived as more skilled.",
              },
              {
                title: "Consistent Skills",
                description:
                  "Many shortcuts are consistent across applications. Learn them in Word and they work in Excel too.",
              },
              {
                title: "Career Growth",
                description:
                  "Professional shortcuts knowledge is a valuable skill that translates across industries and positions.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 bg-background rounded-lg border border-border hover-light-effect transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <h3 className="text-lg font-bold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Shortcuts" },
              { number: "10+", label: "Applications" },
              { number: "26+", label: "Categories" },
              { number: "∞", label: "Time Saved" },
            ].map((stat, idx) => (
              <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Master Shortcuts?</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring shortcuts for your favorite applications today and begin saving time immediately.
          </p>
          <Link
            href="/shortcuts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all transform hover:scale-105 hover-light-effect"
          >
            Explore Shortcuts <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm md:text-base">
          <p>KeyFlow - Master 500+ Keyboard Shortcuts in Seconds</p>
          <p className="mt-2 text-xs md:text-sm">All platforms supported: Windows, Mac, Linux</p>
        </div>
      </footer>
    </div>
  )
}
