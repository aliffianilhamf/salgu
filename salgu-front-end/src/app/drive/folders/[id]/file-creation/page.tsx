"use client";
import Button from "@/components/Button";
import { useState, ChangeEvent } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";

export default function FileCreation({ params }: any) {
  // 1. dapatkan dirID dari URL
  const dirId: string = params.id;
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("file") as File).name;

    api
      .post("/files", {
        name,
        dirId: parseInt(dirId),
      })
      .then((res) => {
        console.log("File uploaded");
        // console log res utk dapatkan file id
        const fileId = res.data.id;
        api
          .put(
            `/files/${fileId}/data`,
            { file: formData.get("file") },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )
          .then((res) => {
            router.push(
              `${process.env.NEXT_PUBLIC_HOST}/drive/folders/${dirId}`,
            );
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="tw-flex justify-content-center tw-items-center tw-w-full">
      <form action="" className="tw-max-w-2xl" onSubmit={handleSubmit}>
        <label
          className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
          htmlFor="large_size"
        >
          Large file input
        </label>
        <input
          className="tw-block tw-w-full tw-text-lg tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-400 focus:tw-outline-none dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400"
          id="large_size"
          type="file"
          name="file"
        />
        <Button variant="tw-bg-blue-500" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
}
