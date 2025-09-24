import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-14 items-center justify-center rounded-md">
              <img
                src="/images/logo.png"
                alt="Image"
                className="max-w-full max-h-full object-contain dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="border-2 bg-muted relative items-center justify-center min-h-screen hidden lg:flex">
        <img
          src="/images/logo.png"
          alt="Image"
          className="max-w-full max-h-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
