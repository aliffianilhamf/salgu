"use client";
import Link from "next/link";
import Button from "../../../components/button";
import Form from "../../../components/Input/form";

export default function SignIn() {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col">
      <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
        <img src="img/user-icon.png" alt="" />
        <h1 className=" tw-font-bold">Sign Up</h1>
      </div>
      <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-slate-500 tw-rounded tw-p-5 tw-w-full tw-max-w-xs">
        <p className={`tw-font-medium tw-mb-3`}>
          Welcome, Please Sign Up First!
        </p>
        <Form name="username" type="text" placeholder="John Doe">
          Username
        </Form>
        <Form name="username" type="email" placeholder="johndoe@mail.com">
          Email
        </Form>
        <Form name="password" type="password" placeholder="********">
          Password
        </Form>
        <Button variant="tw-bg-blue-500">Sign Up</Button>
        <div className="tw-flex tw-justify-center">
          <p className="tw-mr-2">Have an account?</p>
          <Link href="/sign-in" className="tw-text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
