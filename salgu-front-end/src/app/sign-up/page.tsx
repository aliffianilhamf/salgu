"use client";
import Link from "next/link";
import Button from "../../components/Button";
import Form from "../../components/Input/Form";

export default function SignIn() {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-flex-col">
      <div className="tw-flex tw-justify-center tw-items-center tw-flex-col">
        <img src="img/user-icon.png" alt="" />
        <h1 className=" tw-font-bold">Sign Up</h1>
      </div>
      <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-400 tw-rounded tw-p-5 tw-w-full tw-max-w-sm">
        <p className={`tw-font-medium tw-mb-3`}>
          Welcome, Please Sign Up First!
        </p>
        <div className="tw-flex">
          <div className="tw-mr-1">
            <Form name="firstName" type="text" placeholder="John">
              First Name
            </Form>
          </div>
          <div>
            <Form name="lastName" type="text" placeholder="Doe">
              Last Name
            </Form>
          </div>
        </div>
        <Form name="username" type="email" placeholder="johndoe@mail.com">
          Email
        </Form>
        <Form
          name="gender"
          type="radio"
          placeholder="Doe"
          options={["male", "female"]}
        >
          Gender
        </Form>
        <Form name="password" type="password" placeholder="********">
          Password
        </Form>
        <Form name="confirmPassword" type="password" placeholder="********">
          Confirm Password
        </Form>
        <Button variant="tw-bg-gray-500 hover:tw-bg-gray-600">Sign Up</Button>
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
