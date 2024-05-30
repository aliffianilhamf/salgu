import { Dir, File } from "@/types";
import Link from "next/link";
import { FC, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

type Props = {
  currDir: Dir | null;
  currPath: string;
  files: File[];
  dirs: Dir[];
};
const Browser: FC<Props> = (props) => {
  const [fileSelected, setFileSelected] = useState<boolean[]>([]);
  const [dirSelected, setDirSelected] = useState<boolean[]>([]);
  const [selected, setSelected] = useState(false);

  const selectAll = () => {
    if (!selected) {
      setFileSelected(new Array(props.files.length).fill(true));
      setDirSelected(new Array(props.dirs.length).fill(true));
    } else {
      setFileSelected(new Array(props.files.length).fill(false));
      setDirSelected(new Array(props.dirs.length).fill(false));
    }
    setSelected(!selected);
  };
  return (
    <div className="m-2">
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.currDir?.id}/file-creation`}
        className="btn btn-outline-dark"
      >
        <div className="d-flex align-items-center">
          <FaFile />
          <span className="ms-2">Upload File</span>
        </div>
      </Link>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.currDir?.id}/folder-creation`}
        className="btn btn-outline-dark ms-2 my-2"
      >
        <div className="d-flex align-items-center">
          <FaFolder />
          <span className="ms-2">New Folder</span>
        </div>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>
              <button
                onClick={selectAll}
                className="btn-link text-dark"
              >
                <div className="d-flex align-items-center">
                  {selected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                  <span className="ms-2">Select all</span>
                </div>
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
                  className="text-dark text-decoration-none"
                >
                  <div className="d-flex align-items-center">
                    <FaFolder />
                    <span className="ms-2">{dir.name}</span>
                  </div>
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
                  className="btn-link text-dark text-decoration-none"
                >
                  <div className="d-flex align-items-center">
                    <FaFile />
                    <span className="ms-2">{file.name}</span>
                  </div>
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
