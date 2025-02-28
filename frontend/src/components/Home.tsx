import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Link } from "react-router-dom";

export default function Home() {
  const { useSession } = authClient;
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
        <p className="text-xl mb-8">
          Your one-stop solution for everything you need
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {session ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/sign-in">
                <Button size="lg" variant="default">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="lg" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
