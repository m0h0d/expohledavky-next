"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/section-wrapper"

// Sample blog posts data - in a real app, this would come from a CMS or API
const blogPosts = {
  "best-practices-sprava-pohledavek": {
    title:
      "Best practices pro správu pohledávek: Jak efektivně řídit a monitorovat pohledávky v rámci českého právního prostředí",
    date: "11. března 2025",
    author: "Jan Novák",
    authorPosition: "Specialista na pohledávky",
    authorImage: "/placeholder.svg?height=120&width=120",
    readTime: "6 minut čtení",
    category: "Správa pohledávek",
    image: "/placeholder.svg?height=800&width=1600",
    excerpt:
      "Přehledný článek o tématu Best practices pro správu pohledávek: Jak efektivně řídit a monitorovat pohledávky v rámci českého právního prostředí. Zjistěte klíčové informace pro správu a vymáhání pohledávek.",
    content: `
      <p>
        Přehledný článek o tématu Best practices pro správu pohledávek: Jak efektivně řídit a monitorovat pohledávky v
        rámci českého právního prostředí. Zjistěte klíčové informace pro správu a vymáhání pohledávek.
      </p>

      <h2 id="uvod-do-problematiky">Úvod do problematiky</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h2 id="klicove-body">Klíčové body správy pohledávek</h2>
      <ul>
        <li>Pravidelné monitorování a hodnocení pohledávek</li>
        <li>Efektivní komunikace s dlužníky</li>
        <li>Správné nastavení interních procesů</li>
        <li>Využití moderních technologií</li>
      </ul>

      <h2 id="zaver">Závěr</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    `,
    tableOfContents: [
      { id: "uvod-do-problematiky", title: "Úvod do problematiky" },
      { id: "klicove-body", title: "Klíčové body správy pohledávek" },
      { id: "zaver", title: "Závěr" },
    ],
  },
  "dopad-neplacenych-pohledavek": {
    title: "Dopad neplacených pohledávek na cash flow: Jak neuhrazené faktury ovlivňují finanční zdraví firmy",
    date: "11. března 2025",
    author: "Jan Novák",
    authorPosition: "Specialista na pohledávky",
    authorImage: "/placeholder.svg?height=120&width=120",
    readTime: "5 minut čtení",
    category: "Správa pohledávek",
    image: "/placeholder.svg?height=800&width=1600",
    excerpt: "Analýza dopadu neplacených pohledávek na finanční zdraví firem a jejich cash flow.",
    content: `
      <p>
        Analýza dopadu neplacených pohledávek na finanční zdraví firem a jejich cash flow.
      </p>

      <h2 id="uvod-do-problematiky">Úvod do problematiky</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h2 id="klicove-body">Klíčové body správy pohledávek</h2>
      <ul>
        <li>Pravidelné monitorování a hodnocení pohledávek</li>
        <li>Efektivní komunikace s dlužníky</li>
        <li>Správné nastavení interních procesů</li>
        <li>Využití moderních technologií</li>
      </ul>

      <h2 id="zaver">Závěr</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    `,
    tableOfContents: [
      { id: "uvod-do-problematiky", title: "Úvod do problematiky" },
      { id: "klicove-body", title: "Klíčové body správy pohledávek" },
      { id: "zaver", title: "Závěr" },
    ],
  },
  "efektivni-strategie-vymahani": {
    title:
      "Efektivní strategie vymáhání pohledávek: Přehled soudních i mimosoudních metod vymáhání, včetně role exekucí",
    date: "11. března 2025",
    author: "Jan Novák",
    authorPosition: "Specialista na pohledávky",
    authorImage: "/placeholder.svg?height=120&width=120",
    readTime: "7 minut čtení",
    category: "Vymáhání pohledávek",
    image: "/placeholder.svg?height=800&width=1600",
    excerpt: "Komplexní přehled strategií pro vymáhání pohledávek včetně soudních a mimosoudních metod.",
    content: `
      <p>
        Komplexní přehled strategií pro vymáhání pohledávek včetně soudních a mimosoudních metod.
      </p>

      <h2 id="uvod-do-problematiky">Úvod do problematiky</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h2 id="klicove-body">Klíčové body správy pohledávek</h2>
      <ul>
        <li>Pravidelné monitorování a hodnocení pohledávek</li>
        <li>Efektivní komunikace s dlužníky</li>
        <li>Správné nastavení interních procesů</li>
        <li>Využití moderních technologií</li>
      </ul>

      <h2 id="zaver">Závěr</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    `,
    tableOfContents: [
      { id: "uvod-do-problematiky", title: "Úvod do problematiky" },
      { id: "klicove-body", title: "Klíčové body správy pohledávek" },
      { id: "zaver", title: "Závěr" },
    ],
  },
  "eticke-spotrebitelske-aspekty": {
    title: "Etické a spotřebitelské aspekty: Jak zajistit férové a transparentní postupy při vymáhání pohledávek",
    date: "11. března 2025",
    author: "Jan Novák",
    authorPosition: "Specialista na pohledávky",
    authorImage: "/placeholder.svg?height=120&width=120",
    readTime: "5 minut čtení",
    category: "Etika vymáhání",
    image: "/placeholder.svg?height=800&width=1600",
    excerpt:
      "Etické a spotřebitelské aspekty vymáhání pohledávek: Průvodce férovými a transparentními postupy pro spravedlivé řešení.",
    content: `
      <p>
        Etické a spotřebitelské aspekty vymáhání pohledávek: Průvodce férovými a transparentními postupy pro spravedlivé řešení.
      </p>

      <h2 id="uvod-do-problematiky">Úvod do problematiky</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h2 id="klicove-body">Klíčové body správy pohledávek</h2>
      <ul>
        <li>Pravidelné monitorování a hodnocení pohledávek</li>
        <li>Efektivní komunikace s dlužníky</li>
        <li>Správné nastavení interních procesů</li>
        <li>Využití moderních technologií</li>
      </ul>

      <h2 id="zaver">Závěr</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    `,
    tableOfContents: [
      { id: "uvod-do-problematiky", title: "Úvod do problematiky" },
      { id: "klicove-body", title: "Klíčové body správy pohledávek" },
      { id: "zaver", title: "Závěr" },
    ],
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const post = blogPosts[slug as keyof typeof blogPosts]
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!post) {
    return (
      <div className="container min-h-screen py-32 text-center">
        <h1 className="text-3xl font-bold">Článek nenalezen</h1>
        <p className="mt-4">Požadovaný článek neexistuje nebo byl odstraněn.</p>
        <Button className="mt-8" asChild>
          <Link href="/blog">Zpět na blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-gray-50 pb-16 pt-32">
      {/* Breadcrumbs with fade-in animation */}
      <div
        className={`container border-b border-gray-200 pb-4 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-orange-500 transition-colors duration-300">
            ExPohledávky
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-orange-500 transition-colors duration-300">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/blog/${slug}`}
            className="text-zinc-700 hover:text-orange-500 transition-colors duration-300"
          >
            {post.title}
          </Link>
        </div>
      </div>

      <div className="container mt-8">
        <Button variant="ghost" className="mb-6 transition-all duration-300 hover:scale-105" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na blog
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl">
          {/* Article Header with fade-in animation */}
          <header
            className={`mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="mb-6 text-3xl font-bold text-zinc-900 md:text-4xl">{post.title}</h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-zinc-500">{post.authorPosition}</div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-zinc-500">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="text-sm text-zinc-500">{post.date}</div>
                <Link
                  href={`/blog/kategorie/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 transition-all duration-300 hover:bg-orange-200"
                >
                  {post.category}
                </Link>
              </div>
            </div>

            {/* Featured Image with zoom-in animation */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <div className="relative aspect-[21/9]">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className={`object-cover transition-transform duration-[2s] ${isLoaded ? "scale-100" : "scale-110"}`}
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            </div>

            {/* Article Excerpt with fade-in animation */}
            <div
              className="mb-8 rounded-lg bg-zinc-100 p-6 text-lg text-zinc-700 transition-all duration-700 delay-300"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {post.excerpt}
            </div>
          </header>

          {/* Table of Contents with fade-in animation */}
          <SectionWrapper animation="fade-right">
            <div className="mb-8 rounded-lg border border-gray-200 p-6 hover:border-orange-200 transition-colors duration-300">
              <h4 className="mb-4 font-bold">Obsah článku</h4>
              <ul className="space-y-2">
                {post.tableOfContents.map((item, index) => (
                  <li
                    key={item.id}
                    className="transform transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-orange-600 hover:text-orange-800 hover:underline transition-colors duration-300"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SectionWrapper>

          {/* Article Content with fade-up animation */}
          <SectionWrapper animation="fade-up">
            <div className="prose prose-zinc prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
          </SectionWrapper>

          {/* Share Section with fade-up animation */}
          <SectionWrapper animation="fade-up" delay={200}>
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Share2 className="h-5 w-5" />
                Sdílet článek
              </h3>
              <div className="flex gap-4">
                {["Facebook", "LinkedIn", "Twitter", "Email"].map((platform, index) => (
                  <Button
                    key={platform}
                    variant="outline"
                    size="sm"
                    className="transition-all duration-300 hover:scale-105 hover:bg-orange-50"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Author Bio with fade-left animation */}
          <SectionWrapper animation="fade-left" delay={300}>
            <div className="mt-12 rounded-xl bg-zinc-50 p-6 hover:bg-zinc-100 transition-colors duration-500">
              <h3 className="mb-4 text-xl font-bold">O autorovi</h3>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full transition-transform duration-500 hover:scale-105">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">{post.author}</h4>
                  <p className="mb-2 text-sm text-zinc-500">{post.authorPosition}</p>
                  <p className="text-zinc-700">
                    Specialista na správu a vymáhání pohledávek s více než 10 lety zkušeností v oboru. Pomáhá firmám
                    efektivně řídit jejich pohledávky a minimalizovat rizika spojená s neplacením.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* CTA Section with bounce animation */}
          <SectionWrapper animation="bounce" delay={400}>
            <div className="mt-12 rounded-xl bg-zinc-100 p-6 hover:shadow-md transition-all duration-500">
              <h3 className="mb-4 text-xl font-bold">Potřebujete pomoc s vymáháním pohledávek?</h3>
              <p className="mb-4">
                Naši specialisté jsou připraveni vám pomoci s jakýmkoliv problémem týkajícím se pohledávek.
              </p>
              <Button asChild className="transition-all duration-300 hover:scale-105">
                <Link href="/poptavka">Kontaktujte nás</Link>
              </Button>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </article>
  )
}

