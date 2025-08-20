import { useRouter } from "next/router";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PasswordResetForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      password: "",
      token: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.resetPassword(
        { newPassword: value.password, token: value.token },
        {
          onSuccess: () => {
            toast.success("Password reset email sent successfully");
            router.push("/sign-in");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        token: z.string().min(1, "Token is required"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-full mt-10 max-w-md p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Reset Password</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Password</Label>
                <Input {...field} type="password" placeholder="*******" />
                {field.error && (
                  <p className="text-red-500 text-sm">{field.error.message}</p>
                )}
              </div>
            )}
          </form.Field>
          <Button type="submit" className="w-full">
            Send Reset Email
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-200">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-blue-200 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
