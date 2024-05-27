"use client";
import Link from "next/link";
import Button from "../../components/Button";
import InputBlock from "../../components/Input/Form";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export default function SignIn() {
  const signIn = useSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <form>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col">
        <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
          <img src="img/user-icon.png" alt="" />
          <h1 className=" tw-font-bold">Sign In</h1>
        </div>
        <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-400 tw-rounded tw-p-5 tw-w-full tw-max-w-xs">
          <p className={`tw-font-medium tw-mb-3`}>
            Welcome, Please Sign In First!
          </p>
          <InputBlock name="email" type="email" placeholder="johndoe@mail.com">
            Email
          </InputBlock>
          <InputBlock name="password" type="password" placeholder="********">
            Password
          </InputBlock>
          <Button variant="tw-bg-gray-500 hover:tw-bg-gray-600">Sign In</Button>
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
