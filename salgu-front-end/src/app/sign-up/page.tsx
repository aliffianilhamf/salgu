"use client";
import Link from "next/link";
import Button from "../../components/Button";
import InputBlock from "../../components/Input/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";

export default function SignIn() {
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    formData.delete("confirmPassword");

    api
      .post("/users", formData)
      .then(() => {
        router.push("/sign-in");
      })
      .catch((err) => {
        console.error(err);
        setError(err?.message || "An error occurred");
      });
  };

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col">
      <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
        <img src="img/user-icon.png" alt="" />
        <h1 className=" tw-font-bold">Sign Up</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-400 tw-rounded tw-p-5 tw-w-full tw-max-w-sm"
      >
        <p className={`tw-font-medium tw-mb-3`}>
          Welcome, Please Sign Up First!
        </p>
        <div className="tw-flex">
          <div className="tw-mr-1">
            <InputBlock name="firstName" type="text" placeholder="John">
              First Name
            </InputBlock>
          </div>
          <div>
            <InputBlock name="lastName" type="text" placeholder="Doe">
              Last Name
            </InputBlock>
          </div>
        </div>
        <InputBlock name="email" type="email" placeholder="johndoe@mail.com">
          Email
        </InputBlock>
        <InputBlock
          name="gender"
          type="select"
          placeholder="Doe"
          options={["male", "female"]}
        >
          Gender
        </InputBlock>
        <InputBlock name="password" type="password" placeholder="********">
          Password
        </InputBlock>
        <InputBlock
          name="confirmPassword"
          type="password"
          placeholder="********"
        >
          Confirm Password
        </InputBlock>
        <Button variant="tw-bg-gray-500 hover:tw-bg-gray-600" type="submit">
          Sign Up
        </Button>
        <div className="tw-flex tw-justify-center">
          {error && <p className="tw-text-red-500">{error}</p>}
          <p className="tw-mr-2">Have an account?</p>
          <Link href="/sign-in" className="tw-text-blue-500">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
