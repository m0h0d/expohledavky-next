"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Search, X } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  readTime?: string
  category?: string
  author?: string
  authorImage?: string
}

const featuredPost: BlogPost = {
  id: "1",
  title:
    "Best practices pro správu pohledávek: Jak efektivně řídit a monitorovat pohledávky v rámci českého právního prostředí",
  excerpt:
    "Přehledný článek o tématu Best practices pro správu pohledávek: Jak efektivně řídit a monitorovat pohledávky v rámci českého právního prostředí. Zjistěte klíčové informace pro správu a vymáhání pohledávek.",
  date: "11. března 2025",
  image: "/placeholder.svg?height=600&width=800",
  slug: "best-practices-sprava-pohledavek",
  readTime: "6 minut čtení",
  category: "Správa pohledávek",
  author: "Jan Novák",
  authorImage: "/placeholder.svg?height=120&width=120",
}

const posts: BlogPost[] = [
  {
    id: "2",
    title: "Dopad neplacených pohledávek na cash flow: Jak neuhrazené faktury ovlivňují finanční zdraví firmy",
    excerpt: "Analýza dopadu neplacených pohledávek na finanční zdraví firem a jejich cash flow.",
    date: "11. března 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "dopad-neplacenych-pohledavek",
    readTime: "5 minut čtení",
    category: "Správa pohledávek",
    author: "Jan Novák",
    authorImage: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "3",
    title:
      "Efektivní strategie vymáhání pohledávek: Přehled soudních i mimosoudních metod vymáhání, včetně role exekucí",
    excerpt: "Komplexní přehled strategií pro vymáhání pohledávek včetně soudních a mimosoudních metod.",
    date: "11. března 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "efektivni-strategie-vymahani",
    readTime: "7 minut čtení",
    category: "Vymáhání pohledávek",
    author: "Jan Novák",
    authorImage: "/placeholder.svg?height=120&width=120",
  },
  {
    id: "4",
    title: "Etické a spotřebitelské aspekty: Jak zajistit férové a transparentní postupy při vymáhání pohledávek",
    excerpt:
      "Etické a spotřebitelské aspekty vymáhání pohledávek: Průvodce férovými a transparentními postupy pro spravedlivé řešení.",
    date: "11. března 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "eticke-spotrebitelske-aspekty",
    readTime: "5 minut čtení",
    category: "Etika vymáhání",
    author: "Jan Novák",
    authorImage: "/placeholder.svg?height=120&width=120",
  },
]

const categoryDefinitions = [
  { name: "Všechny články", slug: "" },
  { name: "Správa pohledávek", slug: "sprava-pohledavek" },
  { name: "Vymáhání pohledávek", slug: "vymahani-pohledavek" },
  { name: "Odkup pohledávek", slug: "odkup-pohledavek" },
  { name: "Etika vymáhání", slug: "etika-vymahani" },
  { name: "Právní aspekty", slug: "pravni-aspekty" },
]

function FeaturedArticle({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[16/9] md:aspect-auto">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-6 lg:py-12 xl:py-24">
            <div className="mb-2 flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author || "Autor"}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-zinc-600">{post.author}</span>
              <span className="text-sm text-zinc-400">•</span>
              <span className="text-sm text-zinc-500">{post.date}</span>
            </div>

            <div className="mb-3 w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
              {post.category}
            </div>

            <h2 className="mb-3 text-2xl font-bold text-zinc-900 group-hover:text-orange-500">{post.title}</h2>
            <p className="mb-4 text-zinc-600">{post.excerpt}</p>

            <div className="mt-auto flex items-center gap-1 text-sm text-zinc-500">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="h-full overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white inline">
              {post.category}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={post.authorImage || "/placeholder.svg"}
                alt={post.author || "Autor"}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-zinc-600">{post.author}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">{post.date}</span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-zinc-900 group-hover:text-orange-500">{post.title}</h3>
          <p className="mb-4 text-sm text-zinc-600">{post.excerpt}</p>

          <div className="mt-auto flex items-center gap-1 text-sm text-zinc-500">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<BlogPost[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("")

  const allPosts = useRef([featuredPost, ...posts]).current

  // Calculate category counts based on actual data
  const categories = useMemo(() => {
    // Create a map to count posts by category slug
    const categoryCounts = new Map<string, number>()

    // Count posts for each category, but avoid double-counting the featured post
    // First, count the regular posts
    posts.forEach((post) => {
      if (post.category) {
        const categorySlug = post.category
          .toLowerCase()
          .replace(/\s+/g, "-")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
        const currentCount = categoryCounts.get(categorySlug) || 0
        categoryCounts.set(categorySlug, currentCount + 1)
      }
    })

    // Then add the featured post only if it's not already counted
    if (featuredPost.category) {
      const featuredCategorySlug = featuredPost.category
        .toLowerCase()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      // Check if this post's ID is not already in the regular posts
      const isUnique = !posts.some((post) => post.id === featuredPost.id)
      if (isUnique) {
        const currentCount = categoryCounts.get(featuredCategorySlug) || 0
        categoryCounts.set(featuredCategorySlug, currentCount + 1)
      }
    }

    // Create the categories array with real counts
    return categoryDefinitions.map((category) => ({
      ...category,
      count:
        category.slug === ""
          ? posts.length + (posts.some((p) => p.id === featuredPost.id) ? 0 : 1)
          : categoryCounts.get(category.slug) || 0,
    }))
  }, [posts, featuredPost])

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const searchTermLower = searchTerm.toLowerCase().trim()
      const matchedItems = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTermLower) ||
          post.excerpt.toLowerCase().includes(searchTermLower) ||
          post.category?.toLowerCase().includes(searchTermLower) ||
          post.author?.toLowerCase().includes(searchTermLower),
      )

      setSuggestions(matchedItems)
      setShowSuggestions(matchedItems.length > 0)
      setSelectedSuggestionIndex(-1)
    } else if (showSuggestions) {
      // If the search field is empty but suggestions should be shown (on focus)
      setSuggestions(allPosts)
    }
  }, [searchTerm, allPosts, showSuggestions])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
    }
    // Enter
    else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault()
      navigateToPost(suggestions[selectedSuggestionIndex])
    }
    // Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  // Navigate to a post
  const navigateToPost = (post: BlogPost) => {
    setShowSuggestions(false)
    setSearchTerm("")
    window.location.href = `/blog/${post.slug}`
  }

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchTerm.trim()) {
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    setShowSuggestions(false)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setShowSuggestions(false)
    setSuggestions([])
    setIsSearching(false)
  }

  // Handle focus on search input
  const handleFocus = () => {
    // Show all posts as suggestions when the field is focused
    setSuggestions(allPosts)
    setShowSuggestions(true)
  }

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return text.replace(regex, '<mark class="px-0.5">$1</mark>')
  }

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return posts // Return regular posts for "All articles" view
    }

    // For specific category, include both regular posts and featured post if it matches
    const regularPostsInCategory = posts.filter((post) => {
      const postCategorySlug = post.category
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      return postCategorySlug === selectedCategory
    })

    // Check if featured post belongs to this category
    const featuredPostCategorySlug = featuredPost.category
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    if (featuredPostCategorySlug === selectedCategory) {
      // Add featured post to the filtered list if it's not already included
      if (!regularPostsInCategory.some((post) => post.id === featuredPost.id)) {
        return [featuredPost, ...regularPostsInCategory]
      }
    }

    return regularPostsInCategory
  }, [selectedCategory, posts, featuredPost])

  // Only show featured post separately on the "Všechny články" view
  const showFeaturedPost = selectedCategory === ""

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-28">
      {/* Add a style for the highlight effect */}
      <style jsx global>{`
        .suggestion-item:hover mark {
          background-color: rgba(249, 115, 22, 0.4);
          color: white;
        }
        .suggestion-item.selected mark {
          background-color: rgba(249, 115, 22, 0.4);
          color: white;
        }
        mark {
          padding: 0;
          background-color: rgba(249, 115, 22, 0.3);
          color: white;
          border-radius: 2px;
        }
      `}</style>

      {/* Hero Section with fade-in animation */}
      <section
        className={`bg-zinc-900 py-16 text-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-white">EX</span>
              <span className="text-orange-500">POHLEDÁVKY</span>
            </h1>
            <h2 className="mb-6 text-xl font-medium md:text-2xl">Odborný portál o správě a vymáhání pohledávek</h2>
            <p className="mb-8 text-gray-200">
              Vítejte na našem blogu věnovaném správě, odkupu a vymáhání pohledávek. Najdete zde odborné články s
              praktickými radami pro firmy a podnikatele v českém právním prostředí.
            </p>

            {/* Search Bar with subtle animation */}
            <div
              className="mx-auto mb-8 max-w-xl transform transition-all duration-500 ease-in-out hover:scale-[1.02]"
              style={{ position: "relative", zIndex: "10" }}
            >
              <div className="relative">
                <form onSubmit={handleSearch} className="relative z-[100]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-20" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Hledat články..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    className="w-full rounded-full border-0 bg-white/10 px-5 pl-10 py-3 text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 p-2 text-white hover:bg-orange-600 transition-colors duration-300"
                  >
                    <Search className="h-5 w-5" />
                  </button>

                  {/* Search suggestions */}
                  {showSuggestions && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-[100] mt-2 w-full bg-zinc-800/95 backdrop-blur-sm rounded-xl shadow-lg max-h-80 overflow-auto border border-zinc-700 transition-all duration-300"
                      style={{ transform: "translateY(4px)" }}
                    >
                      <div className="py-2 px-2">
                        <ul className="space-y-1">
                          {suggestions.map((post, index) => (
                            <li
                              key={post.id}
                              className={`suggestion-item px-3 py-2 cursor-pointer flex items-start rounded-lg transition-all duration-200 ${
                                selectedSuggestionIndex === index
                                  ? "bg-orange-500/20 text-white"
                                  : "hover:bg-zinc-700/50"
                              }`}
                              onClick={() => navigateToPost(post)}
                              onMouseEnter={() => setSelectedSuggestionIndex(index)}
                            >
                              <div className="flex-1 min-w-0 mr-2">
                                {" "}
                                {/* Added min-width and margin */}
                                <div
                                  className={`font-medium text-left truncate ${selectedSuggestionIndex === index ? "text-white" : "text-zinc-200"}`}
                                  dangerouslySetInnerHTML={{
                                    __html: highlightMatch(post.title, searchTerm),
                                  }}
                                />
                                <div
                                  className="text-sm text-zinc-400 truncate text-left mt-1"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightMatch(
                                      post.excerpt.substring(0, 75) + (post.excerpt.length > 75 ? "..." : ""),
                                      searchTerm,
                                    ),
                                  }}
                                />
                              </div>
                              <span className="text-xs bg-orange-500/20 text-orange-300 rounded-full px-2 py-0.5 ml-auto flex-shrink-0 whitespace-nowrap">
                                {post.category}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent text-white hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Link href="/o-nas">Více o nás</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Search Results */}
        {isSearching && (
          <div className="my-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {suggestions.length > 0
                    ? `Výsledky vyhledávání (${suggestions.length})`
                    : "Žádné výsledky nenalezeny"}
                </h2>
                <Button variant="ghost" size="sm" onClick={clearSearch} className="text-zinc-500 hover:text-zinc-700">
                  Zrušit vyhledávání
                </Button>
              </div>

              {suggestions.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {suggestions.map((post) => (
                    <div key={post.id} className="transform transition-all duration-500 ease-in-out hover:scale-[1.03]">
                      <ArticleCard post={post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-zinc-600 mb-4">Zkuste upravit vyhledávací dotaz nebo procházet kategorie níže.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={category.slug ? `/blog/kategorie/${category.slug}` : "/blog"}
                        className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 hover:bg-orange-200 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Only show regular content when not searching */}
        {!isSearching && (
          <>
            {/* Categories Navigation with horizontal scroll animation */}
            <div className="my-8 overflow-x-auto relative">
              <div className="flex gap-4 whitespace-nowrap pb-2">
                {categories.map((category, index) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      category.slug === selectedCategory
                        ? "bg-orange-500 text-white"
                        : "bg-white text-zinc-700 hover:bg-orange-100"
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    {category.name} <span className="ml-1 text-xs opacity-70">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Article Section with fade-up animation - only shown on "Všechny články" */}
            {showFeaturedPost && (
              <SectionWrapper animation="fade-up">
                <section className="py-8">
                  <h2 className="mb-8 text-2xl font-bold text-zinc-900">Nejnovější článek</h2>
                  <div className="transform transition-all duration-500 ease-in-out hover:scale-[1.01]">
                    <FeaturedArticle post={featuredPost} />
                  </div>
                </section>
              </SectionWrapper>
            )}

            {/* All Articles Section with staggered fade-up animations */}
            <SectionWrapper animation="fade-up" delay={200}>
              <section className="py-8">
                <h2 className="mb-8 text-2xl font-bold text-zinc-900">
                  {selectedCategory
                    ? categories.find((c) => c.slug === selectedCategory)?.name || "Články"
                    : "Všechny články"}
                </h2>
                {filteredPosts.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                      <div
                        key={post.id}
                        className="transform transition-all duration-500 ease-in-out hover:scale-[1.03]"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <ArticleCard post={post} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-zinc-600">Žádné články v této kategorii.</p>
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Zobrazit všechny články
                    </button>
                  </div>
                )}
              </section>
            </SectionWrapper>

            {/* Newsletter Section with fade-left animation */}
            <SectionWrapper animation="fade-left" delay={300}>
              <section className="my-12 rounded-xl bg-zinc-100 p-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="mb-4 text-2xl font-bold">Odebírejte náš newsletter</h2>
                  <p className="mb-6 text-zinc-600">
                    Přihlaste se k odběru našeho newsletteru a dostávejte nejnovější články a aktuální informace z
                    oblasti správy a vymáhání pohledávek.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Váš e-mail"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                    />
                    <Button className="whitespace-nowrap transition-all duration-300 hover:scale-105">
                      Přihlásit se
                    </Button>
                  </div>
                </div>
              </section>
            </SectionWrapper>
          </>
        )}
      </div>
    </div>
  )
}

