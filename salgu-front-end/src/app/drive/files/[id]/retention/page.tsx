"use client";
import api from "@/api";
import Button from "@/components/Button";
import { add, formatDate, formatDistanceStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RetentionPage = ({ params }: any) => {
  const fileId: string = params.id;
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [retentionDate, setRetentionDate] = useState<string>(
    formatDate(add(new Date(), { months: 1 }), "yyyy-MM-dd"),
  );
  const [retentionEnabled, setRetentionEnabled] = useState<boolean>(false);

  useEffect(() => {
    api.get(`/files/${fileId}`).then((res) => {
      setFileName(res.data.name);

      if (res.data.retainedUntil) {
        setRetentionEnabled(true);
        const retainedUntil = formatDate(
          new Date(res.data.retainedUntil),
          "yyyy-MM-dd",
        );
        setRetentionDate(retainedUntil);
      }
    });
  }, [fileId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const deletionDateFormValue = formData.get("deletionDate");

    if (!retentionEnabled) {
      api.patch(`/files/${fileId}`, { retainedUntil: null });
      return;
    }

    if (!deletionDateFormValue) return;

    const deletionDateIso = new Date(
      deletionDateFormValue as string,
    ).toISOString();

    api.patch(`/files/${fileId}`, { retainedUntil: deletionDateIso });
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
          Scheduled deletion setup
        </label>
        <input
          className="tw-mb-2"
          type="checkbox"
          name="retentionEnabled"
          checked={retentionEnabled}
          onChange={(e) => setRetentionEnabled(!retentionEnabled)}
        />
        <input
          className="tw-block tw-w-full tw-text-lg tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-900 focus:tw-outline-none dark:tw-bg-gray-400 dark:tw-border-gray-600 dark:tw-placeholder-gray-900 tw-mb-10"
          id="large_size"
          type="date"
          name="deletionDate"
          value={retentionEnabled ? retentionDate : ""}
          onChange={(e) => setRetentionDate(e.target.value)}
          disabled={!retentionEnabled}
          required={retentionEnabled}
        />
        <p>
          {retentionEnabled
            ? `The file will be deleted in ${formatDistanceStrict(
                new Date(),
                new Date(retentionDate),
              )}`
            : "The file will not be deleted"}
        </p>
        <Button
          variant="tw-bg-gray-900 hover:tw-bg-gray-500  tw-border-2 tw-w-full"
          type="submit"
        >
          Save
        </Button>
        <Button
          variant="tw-bg-gray-900 hover:tw-bg-gray-500  tw-border-2 tw-w-full"
          onClick={() => router.push(`/drive/files/${fileId}`)}
        >
          Back
        </Button>
      </form>
    </div>
  );
};

export default RetentionPage;
