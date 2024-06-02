"use client";
import Link from "next/link";
import Button from "../../components/Button";
import InputBlock from "../../components/Input/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignIn from "@/hooks/use-sign-in";

export default function SignIn() {
  const signIn = useSignIn();
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn({ email, password })
      .then(() => {
        router.push("/drive/home");
      })
      .catch((err) => {
        setError(err?.message || "An error occurred");
      });
  };

  return (
    <div className="tw-flex tw-w-full tw-px-20">
      <div className="tw-flex tw-justify-center tw-items-start tw-min-h-screen tw-w-1/2 tw-mx-10 tw-flex-col">
        <h2 className="tw-font-bold tw-my-1">SALGU</h2>
        <div className="tw-flex tw-justify-start tw-items-start">
          <h1 className="tw-font-bold tw-font-2xl">
            Pay as you go, enjoy flexibility and efficiency for your data.
          </h1>
        </div>
        <div className="tw-flex tw-justify-center tw-items-start">
          <p className="">
            Unlimited storage and Modern storage solutions with Salgu. Pay as
            you go, store unlimited data with the flexibility you need.
          </p>
        </div>
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col tw-w-1/2  ">
        <div className="tw-border-dotted tw-border-2 tw-border-slate-400 tw-bg-white tw-rounded-2xl tw-min-w-full">
          <form onSubmit={handleSubmit}>
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-my-2">
              {/* <img src="img/user-icon.png" alt="" /> */}
              <h1 className=" tw-font-bold">Sign in account</h1>
            </div>
            <div className="tw-flex tw-justify-center tw-flex-col tw-p-5 tw-w-full ">
              <p className={`tw-font-medium tw-text-2xl tw-mb-3`}>
                Welcome, Please Sign In First!
              </p>
              <InputBlock
                name="email"
                type="email"
                placeholder="johndoe@mail.com"
                pattern="^\S+@\S+\.\S+$"
                minLength={2}
                maxLength={255}
              >
                Email
              </InputBlock>
              <InputBlock
                name="password"
                type="password"
                placeholder="********"
                minLength={8}
                maxLength={256}
              >
                Password
              </InputBlock>
              {error && <p className="tw-text-red-500">{error}</p>}
              <Button
                variant="tw-bg-gray-500 hover:tw-bg-gray-600"
                type="submit"
              >
                Sign In
              </Button>
              <div className="tw-flex tw-justify-center">
                <p className="tw-mr-2">Dont have an account?</p>
                <Link href="/sign-up" className="tw-text-blue-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
