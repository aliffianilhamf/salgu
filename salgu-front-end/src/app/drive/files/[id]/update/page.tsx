"use client";
import Button from "@/components/Button";
import api from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FileUpdate({ params }: any) {
  const fileId: string = params.id;
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/files/${fileId}`).then((res) => {
      setFileName(res.data.name);
    });
  }, [fileId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("file") as File).name;

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
        router.push(`${process.env.NEXT_PUBLIC_HOST}/drive/files/${fileId}`);
      })
      .catch((err) => {
        console.error(err);
      });

    api.patch(`/files/${fileId}`, { name });
  };

  return (
    <div className="tw-flex justify-content-center tw-items-center tw-w-full tw-min-h-full ">
      <form
        action=""
        className="tw-max-w-2xl tw-border-dotted tw-border-2 tw-border-gray-700 tw-w-1/3 tw-px-2 tw-py-2 tw-rounded-md"
        onSubmit={handleSubmit}
      >
        <label
          className="tw-block tw-mb-2 tw-text-md tw-font-medium tw-text-gray-900 "
          htmlFor="large_size"
        >
          Upload and update :{fileName ? ` ${fileName}` : "file"}
        </label>
        <input
          className="tw-block tw-w-full tw-text-lg tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-900 focus:tw-outline-none dark:tw-bg-gray-400 dark:tw-border-gray-600 dark:tw-placeholder-gray-900 tw-mb-10"
          id="large_size"
          type="file"
          name="file"
        />
        <Button
          variant="tw-bg-gray-900 hover:tw-bg-gray-500  tw-border-2 tw-w-full"
          type="submit"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
