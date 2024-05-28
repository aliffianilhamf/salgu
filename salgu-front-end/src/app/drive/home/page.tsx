import api from "@/api";
import { redirect } from "next/navigation";

export default async function Home() {
  const rootDirId = await api
    .get("dirs", {
      params: { path: process.env.NEXT_PUBLIC_ROOT_DIR, recursive: false },
    })
    .then((res) => res.data[0].id);

  redirect(`/drive/folders/${rootDirId}`);
}
