import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { ArrowLeft, Clock, Calendar, Share2, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

// Generování statických parametrů pro všechny články
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Metadata pro SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {
    title: 'Článek nenalezen | EXPOHLEDÁVKY',
    description: 'Požadovaný článek nebyl nalezen'
  };
  
  return {
    title: `${post.frontMatter.title} | EXPOHLEDÁVKY`,
    description: post.frontMatter.description || 'Odborný článek na téma pohledávek',
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      images: [post.frontMatter.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  // Pokud článek neexistuje, zobrazíme stránku s chybou
  if (!post) {
    return notFound();
  }

  // Rozdělení obsahu pro vytvoření obsahu článku
  const headingsRegex = /<h([2-3])\s+id="([^"]+)">([^<]+)<\/h\1>/g;
  const headings: { id: string; title: string; level: number }[] = [];
  
  let match;
  const contentString = post.mdxSource?.compiledSource || '';
  
  while ((match = headingsRegex.exec(contentString)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      title: match[3],
    });
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pb-16 pt-28">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="border-b border-zinc-800/60 pb-4">
          <div className="flex items-center text-sm text-zinc-500">
            <Link href="/" className="hover:text-orange-500 transition-colors duration-300">
              ExPohledávky
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-orange-500 transition-colors duration-300">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400">
              {post.frontMatter.title}
            </span>
          </div>
        </div>

        <Button variant="ghost" className="mt-6 mb-8 text-zinc-400 hover:text-orange-400 hover:bg-zinc-900/40" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na blog
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            {post.frontMatter.category && (
              <Badge className="mb-6 bg-orange-500 text-white hover:bg-orange-600 px-3 py-1 text-xs">
                {post.frontMatter.category}
              </Badge>
            )}
            <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">{post.frontMatter.title}</h1>
            
            {post.frontMatter.subtitle && (
              <p className="mb-8 text-xl text-zinc-300">{post.frontMatter.subtitle}</p>
            )}

            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-zinc-400 bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 rounded-lg border border-zinc-800/40 shadow-sm">
              {post.frontMatter.author && post.frontMatter.authorImage && (
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-orange-500/20">
                    <Image 
                      src={post.frontMatter.authorImage} 
                      alt={post.frontMatter.author} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{post.frontMatter.author}</div>
                    {post.frontMatter.authorPosition && (
                      <div className="text-xs text-zinc-500">{post.frontMatter.authorPosition}</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="ml-auto flex flex-wrap items-center gap-4">
                {post.frontMatter.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>{new Date(post.frontMatter.date).toLocaleDateString('cs-CZ', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                )}
                
                {post.frontMatter.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{post.frontMatter.readTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {post.frontMatter.image && (
              <div className="mb-10 overflow-hidden rounded-lg shadow-xl">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.frontMatter.image}
                    alt={post.frontMatter.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                  />
                </div>
              </div>
            )}
          </header>
          
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-10 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/60 p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Obsah článku
              </h3>
              <ul className="space-y-2">
                {headings.map((item) => (
                  <li
                    key={item.id}
                    className={`transform transition-all duration-300 ${item.level === 3 ? 'ml-4' : ''}`}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-orange-400 hover:text-orange-300 hover:underline transition-colors duration-300"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg mx-auto prose-headings:text-white prose-a:text-orange-400 hover:prose-a:text-orange-300 prose-strong:text-orange-200 prose-code:bg-zinc-800 prose-code:text-orange-300 prose-blockquote:border-orange-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-img:rounded-lg">
            <MDXRemote {...post.mdxSource} />
          </div>

          {/* Tags */}
          {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-zinc-800/40">
              <h3 className="mb-4 text-lg font-semibold text-white">Související témata</h3>
              <div className="flex flex-wrap gap-2">
                {post.frontMatter.tags.map((tag: string) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-10 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/60 p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Share2 className="h-5 w-5 text-orange-500" />
              Sdílet článek
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Facebook", "LinkedIn", "Twitter", "Email"].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>

          {/* Author Information */}
          {post.frontMatter.author && (
            <div className="mt-10 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/60 p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-white">O autorovi</h3>
              <div className="flex items-start gap-4">
                {post.frontMatter.authorImage && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-orange-500/30">
                    <Image 
                      src={post.frontMatter.authorImage} 
                      alt={post.frontMatter.author} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-white">{post.frontMatter.author}</h4>
                  {post.frontMatter.authorPosition && (
                    <p className="text-sm text-zinc-400">{post.frontMatter.authorPosition}</p>
                  )}
                  {post.frontMatter.authorBio && (
                    <p className="mt-2 text-zinc-300 text-sm">{post.frontMatter.authorBio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related Articles - placeholder */}
          <div className="mt-10">
            <h3 className="mb-6 text-xl font-bold text-white">Související články</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/blog" className="group block rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-800 p-4 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/5">
                <h4 className="mb-2 font-medium text-white group-hover:text-orange-400 transition-colors">Vymáhání pohledávek v roce 2025</h4>
                <p className="text-sm text-zinc-400">Zjistěte, jaké jsou nejnovější trendy a postupy v oblasti vymáhání pohledávek.</p>
              </Link>
              <Link href="/blog" className="group block rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-800 p-4 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/5">
                <h4 className="mb-2 font-medium text-white group-hover:text-orange-400 transition-colors">Prevence vzniku pohledávek</h4>
                <p className="text-sm text-zinc-400">Jak nastavit obchodní podmínky a procesy, abyste minimalizovali riziko vzniku nedobytných pohledávek.</p>
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 rounded-lg bg-gradient-to-r from-orange-950 to-zinc-900 border border-orange-900/40 p-8 text-center shadow-lg">
            <h3 className="mb-3 text-2xl font-bold text-white">Potřebujete pomoc s vymáháním pohledávek?</h3>
            <p className="mb-6 text-zinc-300">Naši specialisté jsou připraveni vám pomoci s jakýmkoliv problémem týkajícím se pohledávek.</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 shadow-md">
              <Link href="/kontakt">Kontaktujte nás</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

