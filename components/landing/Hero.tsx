"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaLabel = "Get Started",
  ctaHref = "/home",
}: HeroProps) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20 bg-white">
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-4">
                {subtitle}
              </span>
            </>
          )}
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href={ctaHref}>
            <Button size="lg" className="rounded-lg">
              {ctaLabel}
            </Button>
          </Link>
          <Link href={ctaHref}>
            <Button size="lg" variant="outline" className="rounded-lg">
              View Editor
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

