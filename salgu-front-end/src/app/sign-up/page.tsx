"use client";
import Link from "next/link";
import Button from "../../components/Button";
import InputBlock from "../../components/Input/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import Image from "next/image";

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
    <div className="tw-flex tw-w-full tw-px-20">
      <div className="tw-flex tw-justify-center tw-items-start tw-min-h-screen tw-w-1/2 tw-mx-10 tw-flex-col">
        <div className="">
          <h2 className="tw-font-bold tw-my-5">SALGU</h2>
        </div>
        <div className="tw-flex tw-justify-center tw-items-start">
          <img src="/img/tick.png" width="30px" alt="" />
          <p className="tw-ml-5">
            Register and start storing your important files.
          </p>
        </div>
        <div className="tw-flex tw-justify-center tw-items-start">
          <img src="/img/tick.png" width="30px" alt="" />
          <p className="tw-ml-5">
            Salgu Storage provides flexible and efficient storage solutions,
            with pay as you go. Save more, pay less!
          </p>
        </div>
        <div className="tw-flex tw-justify-center tw-items-start">
          <img src="/img/tick.png" width="30px" alt="" />
          <p className="tw-ml-5">
            Access data easily, safely and flexibly. Salgu Storage provides
            reliable and efficient storage solutions.
          </p>
        </div>
        <div className="tw-flex tw-justify-center tw-items-start">
          <img src="/img/tick.png" width="30px" alt="" />
          <p className="tw-ml-5">
            Access from anywhere, anywhere, as long as it is connected to the
            internet, enjoy the service now!
          </p>
        </div>
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col tw-w-1/2 tw-my-10">
        <div className="tw-border-dotted tw-border-2 tw-border-slate-400 tw-bg-white tw-rounded-2xl tw-min-w-full tw-py-2 tw-px-2">
          <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
            {/* <img src="/img/user-icon.png" alt="" /> */}
            <h1 className=" tw-font-bold">Sign Up </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="tw-flex tw-justify-center tw-flex-col tw-p-5 tw-w-full "
          >
            <p className={`tw-font-medium tw-text-2xl tw-mb-3`}>
              Welcome, Please Sign Up First!
            </p>
            <div className="tw-flex  tw-gap-5">
              <InputBlock name="firstName" type="text" placeholder="John">
                First Name
              </InputBlock>
              <InputBlock name="lastName" type="text" placeholder="Doe">
                Last Name
              </InputBlock>
            </div>

            <InputBlock
              name="email"
              type="email"
              placeholder="johndoe@mail.com"
            >
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
      </div>
    </div>
  );
}
