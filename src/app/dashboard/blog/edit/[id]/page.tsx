"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) {
        setError("Post not found");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setForm({
        title: json.post.title,
        slug: json.post.slug,
        excerpt: json.post.excerpt,
        content: json.post.content,
        featured_image: json.post.featured_image || "",
        status: json.post.status,
      });
      setLoading(false);
    })();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Failed to update post");
      setSaving(false);
      return;
    }

    router.push("/dashboard/blog");
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/blog"
          className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">Edit Blog Post</h2>
          <p className="text-gray-500 text-sm mt-1">Update your article.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6 max-w-3xl">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            placeholder="post-url-slug"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image URL</label>
          <input
            type="url"
            name="featured_image"
            value={form.featured_image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Short summary of the post..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={12}
            placeholder="Write your blog post content here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Update Post"}
          </button>
          <Link
            href="/dashboard/blog"
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
