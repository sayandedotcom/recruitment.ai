"use client";

import { motion } from "framer-motion";
import { ArrowRight, Grid, Newspaper, User } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gray-950 p-8 md:p-12 min-h-screen">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.15]">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-gray-100/30" />
        ))}
      </div>

      {/* Corner Badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8"
      >
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-gray-950/50 backdrop-blur-sm"
        >
          <User className="w-3 h-3" />
          Beta
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-8 right-8"
      >
        <Link
          href="/login"
          className={`flex items-center gap-1 cursor-pointer ${buttonVariants()}`}
        >
          Log In
          {/* <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" /> */}
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto pt-24 text-center">
        {/* AI Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-16 h-16 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-2xl bg-orange-500/80 blur-xl" />
          <div className="relative bg-gray-900 rounded-2xl p-4 shadow-lg">
            <span className="font-bold text-orange-500">AI</span>
          </div>
        </motion.div>

        {/* Company Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Badge variant="secondary" className="mb-8 bg-gray-900">
            <Link href="https://www.sayande.com/">Built by sayande.com</Link>
          </Badge>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          AI-Powered resume
          <br />
          <span className="text-gray-500">filtering</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
        >
          Let AI instantly screen resumes, surface top talent, and eliminate
          hours of manual work—so you can focus on hiring, not filtering.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/dashboard"
            className={`group ${buttonVariants({ size: "lg" })}`}
          >
            Go to dashboard
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
