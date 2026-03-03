import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import HeroContactForm from "@/components/HeroContactForm";
import type { BlogPost } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles, tips, and guides on Quran learning, Islamic studies, and online education from Hasnain Online Quran Academy.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const blogPosts = (posts || []) as Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "featured_image" | "created_at">[];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Latest <span className="text-gold-400">Articles & Insights</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tips, guides, and stories on Quran learning, Islamic knowledge, and online education.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main 2/3 + 1/3 Layout */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Blog Cards */}
          <div className="lg:w-2/3">
            {blogPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                      {post.featured_image ? (
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl font-bold text-primary-200">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Calendar size={14} />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read More <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <HeroContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-5">
            Start Your <span className="text-gold-400">Quran Journey</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join thousands of students learning Quran online with certified teachers.
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Register Now <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
