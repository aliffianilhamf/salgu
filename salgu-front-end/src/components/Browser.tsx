import folderCreation from "@/app/drive/folders/[id]/folder-creation/page";
import { Dir, File } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";

type Props = {
  currDir: Dir;
  currPath: string;
  files: File[];
  dirs: Dir[];
};
const Browser: FC<Props> = (props) => {
  const [fileSelected, setFileSelected] = useState<boolean[]>([]);
  const [dirSelected, setDirSelected] = useState<boolean[]>([]);

  const selectAll = () => {
    setFileSelected(new Array(props.files.length).fill(true));
    setDirSelected(new Array(props.dirs.length).fill(true));
  };

  // const router = useRouter();

  // const createNewFolder = () => {
  //   router.push("folder-creation");
  // };
  return (
    <div>
      <Link href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.currDir.id}/folder-creation`} className="btn btn-outline-dark ms-2 my-2">New Folder</Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <td><button onClick={selectAll} className="btn-link text-dark text-decoration-none">Select all</button></td>
            <th>Name</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {props.dirs.map((dir, i) => (
            <tr key={`dir-${dir.id}`}>
              <td>
                <input
                  type="checkbox"
                  checked={dirSelected[i]}
                  onChange={() =>
                    setDirSelected(
                      dirSelected.map((val, index) =>
                        index === i ? !val : val,
                      ),
                    )
                  }
                />
              </td>
              <td>
                <Link
                  href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${dir.id}`} className="text-dark"
                >
                  {dir.name}
                </Link>
              </td>
              <td></td>
            </tr>
          ))}
          {props.files.map((file, i) => (
            <tr key={`file-${file.id}`}>
              <td>
                <input
                  type="checkbox"
                  checked={fileSelected[i]}
                  onChange={() =>
                    setFileSelected(
                      fileSelected.map((val, index) =>
                        index === i ? !val : val,
                      ),
                    )
                  }
                />
              </td>
              <td>
                <Link
                  href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${file.id}`} className="text-dark"
                >
                  {file.name}
                </Link>
              </td>
              <td>{file.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Browser;
