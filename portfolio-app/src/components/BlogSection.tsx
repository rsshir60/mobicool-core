"use client";

import React, { useState, useRef, useEffect } from "react";
import { BLOG_POSTS, BlogPost } from "@/data/portfolioData";
import { BookOpen, Calendar, Clock, ArrowRight, X, Tag } from "lucide-react";

export default function BlogSection() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync native dialog lifecycle with activePost state — modern-web-guidance/accessibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activePost) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [activePost]);

  const tags = ["All", "MLOps", "Information Retrieval", "Data Engineering"];

  const filteredPosts = selectedTag === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedTag || post.tags.includes(selectedTag));

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Technical Writing & Engineering Notes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architecture Articles & Learnings
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Field notes on high-throughput data engineering, distributed hyperparameter search, and production retrieval architectures.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedTag === tag
                  ? "bg-purple-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setActivePost(post)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-purple-600 hover:text-white text-xs font-mono font-bold text-purple-400 border border-purple-500/30 transition-all"
                >
                  Read Full Technical Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In-Depth Article Reader Modal — modern-web-guidance/accessibility */}
        <dialog
          ref={dialogRef}
          onClose={() => setActivePost(null)}
          onClick={(e) => {
            if (e.target === dialogRef.current) setActivePost(null);
          }}
          aria-labelledby="article-modal-title"
          className="m-auto p-0 bg-transparent rounded-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md border-0 max-w-2xl w-[calc(100%-2rem)] shadow-2xl focus:outline-none"
        >
          {activePost && (
            <div className="relative w-full max-h-[85vh] overflow-y-auto rounded-2xl glass-panel p-6 sm:p-8 border border-purple-500/40 shadow-2xl bg-slate-950">
              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label="Close article"
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-purple-400">
                  <span>{activePost.category}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                </div>

                <h3 id="article-modal-title" className="text-2xl font-bold text-white">
                  {activePost.title}
                </h3>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 text-xs text-purple-200">
                  <strong>Abstract:</strong> {activePost.summary}
                </div>

                <div className="space-y-3 pt-2 text-sm text-slate-300 leading-relaxed">
                  {activePost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {activePost.tags.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePost(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-white hover:bg-slate-700 transition-colors"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          )}
        </dialog>

      </div>
    </section>
  );
}
