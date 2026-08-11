import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

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
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/">
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
                </CardContent>
            </Card>
        </div>
    );
}

export default NotFound;
