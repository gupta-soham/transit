import { Button } from "@/components/ui/button";
import { authClient, signOut } from "@/lib/auth-client";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChangePasswordForm } from "./auth/change-password";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { useSession } = authClient;
  const { data: session } = useSession();

  interface UserDetails {
    phoneNumber?: string;
    dob?: string | null;
    gender?: string;
    passport?: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!session?.user.id) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.BACKEND_APP_URL}/api/user/details`,
          {
            params: { userId: session.user.id },
          }
        );

        setUserDetails(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [session]);

  useEffect(() => {
    // Check if user data is loaded and dob is null
    if (!loading && userDetails?.dob === null) {
      navigate("/onboarding");
    }
  }, [userDetails, loading, session, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {loading && <p>Loading user details...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {session?.user && (
          <div className="flex flex-col items-center mb-8">
            {session.user.image ? (
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
                <User className="w-full h-full object-cover" />
              </div>
            )}
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
            <p>{session.user.emailVerified ? "Verified" : "Not Verified"}</p>

            {userDetails && (
              <div className="mt-4 w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Profile Details</h3>
                <div className="bg-gray-100 p-4 rounded shadow-sm">
                  {userDetails.phoneNumber && (
                    <p className="mb-2">
                      <span className="font-medium">Phone:</span>{" "}
                      {userDetails.phoneNumber}
                    </p>
                  )}
                  {userDetails.dob && (
                    <p className="mb-2">
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {userDetails.dob}
                    </p>
                  )}
                  {userDetails.gender && (
                    <p className="mb-2">
                      <span className="font-medium">Gender:</span>{" "}
                      {userDetails.gender}
                    </p>
                  )}
                  {userDetails.passport && (
                    <p className="mb-2">
                      <span className="font-medium">Passport:</span>{" "}
                      {userDetails.passport}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-4 p-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <ChangePasswordForm />
            </DialogContent>
          </Dialog>
        </div>

        <Button variant="destructive" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
