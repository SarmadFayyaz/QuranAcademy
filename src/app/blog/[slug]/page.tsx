import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import HeroContactForm from "@/components/HeroContactForm";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { BlogPost } from "@/lib/supabase/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return (posts || []).map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<BlogPost>();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      ...(post.featured_image && { images: [{ url: post.featured_image }] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    ...(post.featured_image && { image: post.featured_image }),
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/images/logo.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-6">
            <Calendar size={16} />
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="font-heading mb-6">
            {post.title}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {post.excerpt}
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
        <div className="section-container flex flex-col lg:flex-row gap-10">
          {/* Content */}
          <div className="lg:w-2/3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold mb-8 hover:gap-3 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {post.featured_image && (
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <article className="prose prose-gray max-w-none">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base">
                  {p}
                </p>
              ))}
            </article>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200"
              >
                <ArrowLeft size={16} />
                Back to All Articles
              </Link>
            </div>
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
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Start Your <span className="text-gold-400">Quran Journey</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
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
