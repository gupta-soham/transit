import CardWrapper from "@/components/common/card-wrapper";
import { FormError, FormSuccess } from "@/components/common/form-response";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthState } from "@/hooks/useAuthState";
import { authClient, phoneNumber } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { OnboardingSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const BACKEND_APP_URL = process.env.BACKEND_APP_URL;

const saveUserOnboarding = async (
  data: any,
  {
    onRequest,
    onResponse,
    onSuccess,
    onError,
  }: {
    onRequest?: () => void;
    onResponse?: () => void;
    onSuccess?: () => void;
    onError?: (ctx: { error: { message: string } }) => void;
  }
) => {
  try {
    if (onRequest) onRequest();

    const response = await axios.post(
      `${BACKEND_APP_URL}/api/user/onboarding`,
      data,
      {
        withCredentials: true, // Include cookies for authentication
      }
    );

    if (onResponse) onResponse();

    if (onSuccess) onSuccess();

    return response.data;
  } catch (error) {
    if (onResponse) onResponse();

    if (onError) {
      onError({
        error: {
          message: (error as any)?.message || "Failed to save onboarding data",
        },
      });
    }
    throw error;
  }
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { useSession } = authClient;
  const { data: session, isPending } = useSession();
  const userId = session?.user.id;

  const {
    error,
    success,
    loading,
    setError,
    setSuccess,
    setLoading,
    resetState,
  } = useAuthState();

  // OTP related states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.BACKEND_APP_URL}/api/user/details`,
        {
          params: { userId },
        }
      );
      if (response.data?.dob !== null) {
        navigate("/dashboard");
      }
    };
    fetchData();
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!isPending && !userId) navigate("/");
  }, [isPending, session, navigate]);

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      userId: "",
      passport: undefined,
    },
  });

  // Update userId field when session is loaded
  useEffect(() => {
    if (userId) {
      form.setValue("userId", userId);
    }
  }, [userId, form]);

  // Function to send OTP
  const handleSendOtp = async () => {
    try {
      setOtpError("");
      setSendingOtp(true);
      const phoneNumberValue = form.getValues("phoneNumber");

      if (!phoneNumberValue) {
        setOtpError("Phone number is required to send verification code");
        setSendingOtp(false);
        return;
      }

      await phoneNumber.sendOtp({ phoneNumber: phoneNumberValue });
      setOtpSent(true);
      setSuccess("Verification code sent successfully");
    } catch (error) {
      setOtpError(
        (error as any)?.message || "Failed to send verification code"
      );
    } finally {
      setSendingOtp(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    try {
      setOtpError("");
      setVerifyingOtp(true);
      const phoneNumberValue = form.getValues("phoneNumber");

      if (!otpCode || otpCode.length !== 6) {
        setOtpError("Please enter a valid 6-digit verification code");
        setVerifyingOtp(false);
        return;
      }

      const isVerified = await phoneNumber.verify({
        phoneNumber: phoneNumberValue,
        code: otpCode,
        updatePhoneNumber: true,
        disableSession: true,
      });

      if (isVerified) {
        setOtpVerified(true);
        setSuccess("Phone number verified successfully");
      } else {
        setOtpError("Invalid verification code, please try again");
      }
    } catch (error) {
      setOtpError((error as any)?.message || "Failed to verify code");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    try {
      // Check if phone number needs verification
      if (values.phoneNumber && !otpVerified) {
        setError("Please verify your phone number before submitting");
        return;
      }

      const dataToSubmit = {
        ...values,
        // Only include if it's not empty
        passport: values.passport ? values.passport : undefined,
      };
      await saveUserOnboarding(dataToSubmit, {
        onRequest: () => {
          resetState();
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          setSuccess("Profile information saved successfully");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        },
        onError: (ctx: { error: { message: string } }) => {
          setError(ctx.error.message);
        },
      });
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
        <CardWrapper
          cardTitle="Authentication Required"
          cardDescription="You need to be logged in to complete your profile"
        >
          <Button onClick={() => navigate("/sign-in")} className="w-full">
            Sign In
          </Button>
        </CardWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <CardWrapper
        cardTitle="Complete Your Profile"
        cardDescription="Please provide the following information to complete your onboarding"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Hidden userId field */}
            <input type="hidden" {...form.register("userId")} />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={loading}
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1920-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["male", "female", "transgender"].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() +
                            option.slice(1).replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          disabled={loading || otpSent}
                          placeholder="9899998898"
                          {...field}
                        />
                      </FormControl>
                      {!otpVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          disabled={loading || sendingOtp || otpVerified}
                          onClick={handleSendOtp}
                        >
                          {sendingOtp ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : otpSent ? (
                            "Resend"
                          ) : (
                            "Verify"
                          )}
                        </Button>
                      )}
                      {otpVerified && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-5 w-5 mr-1" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {otpSent && !otpVerified && (
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex gap-2 items-center justify-center">
                          <InputOTP
                            maxLength={6}
                            value={otpCode}
                            onChange={setOtpCode}
                            disabled={verifyingOtp}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          <Button
                            type="button"
                            disabled={
                              loading || verifyingOtp || otpCode.length !== 6
                            }
                            onClick={handleVerifyOtp}
                          >
                            {verifyingOtp ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </div>
                        {otpError && (
                          <p className="text-sm text-red-500">{otpError}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter passport number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={
                loading || (!!form.getValues("phoneNumber") && !otpVerified)
              }
              type="submit"
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Complete Onboarding
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default Onboarding;
