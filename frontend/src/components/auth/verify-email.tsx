import { useEffect } from "react";
import { verifyEmail } from "@/lib/auth-client";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        return navigate("/");
      }

      try {
        await verifyEmail(
          { query: { token } },
          {
            onSuccess: () => {
              navigate("/onboarding");
            },
            onError: (ctx) => {
              console.error(ctx.error.message);
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    verify();
  }, [token, navigate]);

  return <div>Verifying your email...</div>;
}
