"use client";
import api from "@/api";
import { useEffect, useMemo, useState } from "react";
import Browser from "@/components/Browser";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { filetypemime } from "magic-bytes.js";
import isutf8 from "isutf8";
import { saveAs } from "file-saver";
import { File } from "@/types";
import { FaDownload, FaEdit, FaShare, FaHistory } from "react-icons/fa";
import { useErrorBoundary } from "react-error-boundary";

export default function FilePage({ params }: any) {
  const id: string = params.id;
  const { showBoundary } = useErrorBoundary();
  const [file, setFile] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState("");
  const [mime, setMime] = useState("");
  const mediaType = mime.split("/")[0] || "";

  /**
   * Text content of the blob if it is a text file,
   * else empty string.
   */
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    let url: string;

    api
      .get(`/files/${id}`)
      .then((res) => {
        setFile(res.data);
      })
      .then(() => {
        api.get(`/files/${id}/data`, { responseType: "blob" }).then((res) => {
          const blob: Blob = res.data;
          url = window.URL.createObjectURL(blob);
          setBlobUrl(url);

          blob.arrayBuffer().then((buffer) => {
            const arr = new Uint8Array(buffer);
            let m: string;
            const mimes = filetypemime(arr);

            if (mimes.length === 0 && isutf8(arr)) m = "text/plain";
            else m = mimes[0];
            setMime(m);

            if (m.split("/")[0] === "text") {
              blob.text().then((text) => setTextContent(text));
            }
          });
        });
      })
      .catch((err) => {
        showBoundary(err);
      });

    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [id]);

  return (
    <Container className="p-5">
      <h1 className="mb-4">{file?.name || "File Detail"}</h1>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Button
          variant="outline-dark"
          onClick={() => {
            saveAs(blobUrl, file?.name || id);
          }}
          className="d-flex align-items-center"
        >
          <FaDownload className="me-2" /> Download
        </Button>
        <Link
          className="tw-no-underline"
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/update`}
          passHref
        >
          <Button
            variant="outline-dark"
            className="d-flex align-items-center text-decoration-none list-sty"
          >
            <FaEdit className="me-2 " /> Update
          </Button>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/sharing`}
          passHref
          className="tw-no-underline"
        >
          <Button
            variant="outline-dark"
            className="d-flex align-items-center tw-no-underline"
          >
            <FaShare className="me-2" /> Sharing
          </Button>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/history`}
          passHref
          className="tw-no-underline"
        >
          <Button
            variant="outline-dark"
            className="d-flex align-items-center tw-no-underline"
          >
            <FaHistory className="me-2" /> History
          </Button>
        </Link>
      </div>
      <p>
        <strong>Mime type:</strong> {mime}
      </p>
      <div className="mt-4 tw-flex tw-justify-center tw-items-center ">
        <div className="tw-flex tw-justify-center tw-items-center tw-w-2/3 tw-max-h-screen tw-rounded-md tw-border-dotted tw-border-gray-900 tw-border-2 tw-p-2">
          {mediaType === "image" && (
            <img
              src={blobUrl}
              alt="User file"
              className="tw-max-h-screen tw-p-3 tw-rounded-2xl"
            />
          )}
          {mediaType === "text" && (
            <pre className="bg-light p-3 border">{textContent}</pre>
          )}
          {mediaType === "video" && (
            <video controls className="w-100">
              <source src={blobUrl} type={mime} />
            </video>
          )}
          {mediaType === "audio" && (
            <audio controls className="w-100">
              <source src={blobUrl} type={mime} />
            </audio>
          )}
        </div>
      </div>
    </Container>
  );
}
