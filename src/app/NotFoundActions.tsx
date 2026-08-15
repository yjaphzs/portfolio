"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * The 404's two buttons, split out so `not-found.tsx` itself can stay a Server
 * Component and export metadata. "Go back" is the only client-only bit —
 * session history has no server equivalent.
 */
export function NotFoundActions() {
  return (
    <div className="flex justify-center gap-3 pt-2">
      <Button variant="outline" size="sm" asChild>
        <Link href="/">
          <Home className="h-4 w-4 mr-1.5" />
          Home
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Go back
      </Button>
    </div>
  );
}
