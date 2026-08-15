import { Card, CardContent } from "@/components/ui/card";

import { NotFoundActions } from "./NotFoundActions";

export const metadata = {
  title: "404 — Page not found",
  // nofollow as well as noindex: there is nothing here worth crawling onward.
  robots: { index: false, follow: false },
  // Drop the inherited canonical — it would otherwise point every missing URL
  // at the homepage, which is a claim that they are the same document.
  alternates: { canonical: null },
};

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full text-center">
                <CardContent className="pt-8 pb-8 space-y-4">
                    <p className="text-6xl font-bold text-muted-foreground">
                        404
                    </p>
                    <h1 className="text-xl font-semibold text-foreground">
                        Page not found
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        The page you’re looking for doesn’t exist or has been
                        moved.
                    </p>
                    <NotFoundActions />
                </CardContent>
            </Card>
        </div>
    );
}

export default NotFound;
