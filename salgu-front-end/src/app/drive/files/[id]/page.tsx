"use client";
import api from "@/api";
import { useEffect, useMemo, useState } from "react";
import Browser from "@/components/Browser";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { filetypemime } from "magic-bytes.js";
import isutf8 from "isutf8";

export default function File({ params }: any) {
  const id: string = params.id;
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

    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [id]);

  return (
    <Container className="p-5">
      <div id="tw-flex tw-gap-2">
        <a className="btn btn-outline-dark ms-2 my-2" href={blobUrl} download>
          Download
        </a>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/sharing`}
          className="btn btn-dark"
        >
          Sharing
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/history`}
          className="btn btn-light border"
        >
          History
        </Link>
        <p>Mime type: {mime}</p>
        <div>
          {mediaType === "image" && <img src={blobUrl} alt="User file" />}
          {mediaType === "text" && <pre>{textContent}</pre>}
          {mediaType === "video" && (
            <video controls style={{ maxWidth: 200 }}>
              <source src={blobUrl} type={mime} />
            </video>
          )}
          {mediaType === "audio" && (
            <audio controls>
              <source src={blobUrl} type={mime} />
            </audio>
          )}
        </div>
      </div>
    </Container>
  );
}
