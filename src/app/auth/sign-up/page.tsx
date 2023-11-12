import UserAuthForm from "@/components/UserAuthForm";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page: NextPage = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="absolute -z-10 lg:relative w-full h-full flex-col bg-muted p-10 text-white border border-muted-foreground lg:flex lg:w-[55%] blur-sm opacity-20 lg:blur-none lg:opacity-100">
        <Image
          src="/assets/fg-coach.jpeg"
          alt="authentication"
          className="absolute inset-0 object-cover w-[105%] h-full object-top"
          quality={60}
          fill
        />
        <div className="hidden lg:flex relative z-20 mt-auto w-fit">
          <blockquote className="space-y-2">
            <span className="text-lg bg-backgroundComment p-1.5">
              &ldquo;The new way to be healthy! FitGenie customized all my
              workouts routines, regardless of whether I do it at the gym or at
              home. It&apos;s great!&rdquo;
            </span>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 z-60 h-full w-full lg:w-[45%]">
        <div className="mx-auto flex h-full w-[350px] flex-col justify-center items-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
