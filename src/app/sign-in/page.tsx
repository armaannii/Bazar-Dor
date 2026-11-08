
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient, signIn } from "@/lib/auth-client";
import { Github } from "lucide-brands";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField
} from "@heroui/react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(
      formData.entries()
    ) as Record<string, string>;

    setIsLoading(true);

    try {
      const { data: resData, error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (resData) {
      toast.success("Sign In successfull!");
      // console.log(data);
    }

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      // console.log("Sign in successful:", resData);

    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });

  };

  const handleGithubSignIn = async () => {
 await authClient.signIn.social({
      provider: "github",
    });
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0] flex flex-col items-center justify-center px-4 py-10">

      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-[#25352c]">
          সাইন ইন
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          বিস্তারিত নাম, পাসওয়ার্ড ভুলে গেলে ও অ্যাকাউন্টে ঢুকুন
        </p>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md bg-white/70 border border-gray-200 rounded-xl p-6">

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }

              return null;
            }}
          >
            <Label>ইমেইল</Label>

            <Input
              placeholder="you@example.com"
              className="h-10"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <Label>পাসওয়ার্ড</Label>

            <Input
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="h-10"
            />

            <FieldError />
          </TextField>


          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-[#078b40] text-white font-semibold hover:bg-[#067735]"
            isDisabled={isLoading}
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-500">
              অথবা
            </span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">

            {/* Google */}
            <Button
              type="button"
            //   variant="bordered"
              className="w-full text-xs bg-white text-black border border-gray-200"
              onClick={handleGoogleSignIn}
            >
              <span className="font-bold">
                G
              </span>

              Google দিয়ে চালিয়ে যান
            </Button>

            {/* Github */}
            <Button
              type="button"
            //   variant="bordered"
              className="w-full text-xs bg-white text-black border border-gray-200"
              onClick={handleGithubSignIn}
            >
              <Github size={17} />

              GitHub দিয়ে চালিয়ে যান
            </Button>

          </div>

          {/* Sign Up */}
          <p className="text-center text-xs text-gray-600 mt-1">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-[#078b40] font-semibold hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>

        </Form>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xs text-gray-500 mt-5 hover:text-gray-800"
      >
        <ArrowLeft size={14} />
        হোম পেজে ফিরে যান
      </Link>

    </div>
  );
}
