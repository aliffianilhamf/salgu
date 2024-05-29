import { Dir, File } from "@/types";
import Link from "next/link";
import { FC, useState } from "react";

type Props = {
  currDir: Dir | null;
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

  return (
    <div className="m-2">
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.currDir?.id}/file-creation`}
        className="btn btn-dark "
      >
        Upload File
      </Link>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.currDir?.id}/folder-creation`}
        className="btn btn-outline-dark ms-2 my-2"
      >
        New Folder
      </Link>
      <button onClick={selectAll}>Select all</button>
      <table>
        <thead>
          <tr>
            <td>
              <button
                onClick={selectAll}
                className="btn-link text-dark text-decoration-none"
              >
                Select all
              </button>
            </td>
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
                  href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${dir.id}`}
                  className="text-dark"
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
                  href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${file.id}`}
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
