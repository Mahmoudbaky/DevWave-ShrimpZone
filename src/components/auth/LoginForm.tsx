import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.login(email);
      if (response.success) {
        setExpiresAt(response.data.expiresAt);
        setStep("otp");
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.verifyOtp(email, otp);
      if (response.success) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Redirect to home page or dashboard
        window.location.href = "/";
      } else {
        setError(response.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
    setError("");
    setExpiresAt(null);
  };

  const formatExpiryTime = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffInMinutes = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60)
    );
    return diffInMinutes > 0 ? `${diffInMinutes} minute(s)` : "expired";
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={step === "email" ? handleEmailSubmit : handleOtpSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {step === "email" ? "Login to your account" : "Enter OTP"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {step === "email"
            ? "Enter your email below to login to your account"
            : `We've sent a verification code to ${email}`}
        </p>
      </div>

      <div className="grid gap-6 mb-20">
        {step === "email" ? (
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="grid gap-3">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isLoading}
              maxLength={6}
            />
            {expiresAt && (
              <p className="text-xs text-muted-foreground">
                Code expires in {formatExpiryTime(expiresAt)}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? step === "email"
              ? "Sending OTP..."
              : "Verifying..."
            : step === "email"
            ? "Send OTP"
            : "Verify & Login"}
        </Button>

        {step === "otp" && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleBackToEmail}
            disabled={isLoading}
          >
            Back to Email
          </Button>
        )}
      </div>
    </form>
  );
}
