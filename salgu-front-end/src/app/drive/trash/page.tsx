"use client";
import Link from "next/link";
import React from "react";
import { NextPage } from "next";
import DeletedItems from "@/components/DeletedItems";

const TrashPage: NextPage = () => {
  return (
    <div className="tw-bg-gray-100 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <DeletedItems />
    </div>
  );
};

export default TrashPage;
