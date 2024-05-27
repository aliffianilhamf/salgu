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
        router.push("/");
      })
      .catch((err) => {
        setError(err?.message || "An error occurred");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col">
        <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
          <img src="img/user-icon.png" alt="" />
          <h1 className=" tw-font-bold">Sign In</h1>
        </div>
        <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-400 tw-rounded tw-p-5 tw-w-full tw-max-w-xs">
          <p className={`tw-font-medium tw-mb-3`}>
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
            minLength={8}
            maxLength={256}
          >
            Password
          </InputBlock>
          {error && <p className="tw-text-red-500">{error}</p>}
          <Button variant="tw-bg-gray-500 hover:tw-bg-gray-600" type="submit">
            Sign In
          </Button>
          <div className="tw-flex tw-justify-center">
            <p className="tw-mr-2">Dont have an account?</p>
            <Link href="/sign-up" className="tw-text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
