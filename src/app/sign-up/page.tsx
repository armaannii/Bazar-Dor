
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient, signUp } from "@/lib/auth-client";
import { Github } from "lucide-brands";
import { ArrowLeft } from "lucide-react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check password matching
    if (password !== confirmPassword) {
      setConfirmError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setConfirmError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(
        formData.entries()
      ) as Record<string, string>;
      console.log("data from the form", data);

      const { data: resData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // console.log("signUp", resData);
      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("Signup successful!")
      // console.log("Signup successful:", resData);
      // Redirect or show success message here

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
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          নিরাপদ যাত্রা শুরু করতে নতুন অ্যাকাউন্ট খুলুন
        </p>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white/70 border border-gray-200 rounded-xl p-6">

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >
          {/* Name */}
          <TextField
            isRequired
            name="name"
            type="text"
          >
            <Label>নাম</Label>
            <Input
              placeholder="যেমন: রহিম উদ্দিন"
              className="h-10"
            />
            <FieldError />
          </TextField>

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
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }

              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি বড় হাতের অক্ষর দিন";
              }

              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে একটি সংখ্যা দিন";
              }

              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Description>
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা
            </Description>
            <FieldError />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            name="confirmPassword"
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              type="password"
              placeholder="আবার লিখুন"
              className="h-10"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmError("");
              }}
            />
            {confirmError && (
              <p className="text-sm text-danger">
                {confirmError}
              </p>
            )}
          </TextField>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full bg-[#078b40] text-white font-semibold hover:bg-[#067735]"
            isDisabled={isLoading}
          >
            {isLoading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">

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

          {/* Sign In */}
          <p className="text-center text-xs text-gray-600 mt-1">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-[#078b40] font-semibold hover:underline"
            >
              সাইন ইন করুন
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
