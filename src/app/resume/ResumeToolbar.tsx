"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Screen-only chrome above the résumé sheet.
 *
 * Split from the page so the document itself — the part that matters for
 * search and for print — stays a Server Component. `window.print()` and the
 * theme toggle are the only things here that need the browser.
 */
export function ResumeToolbar() {
  return (
    <div className="mb-4 flex items-center justify-between print:hidden">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </Link>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2.5 text-xs"
          onClick={() => window.print()}
        >
          <Printer className="mr-1 h-3.5 w-3.5" />
          Print / Save as PDF
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
