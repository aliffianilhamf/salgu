import { Dir, File } from "@/types";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaFile, FaTrashAlt, FaFolder } from "react-icons/fa";
import css from "./Browser.module.css";
import { deleteDirsById } from "@/app/drive/folders/[id]/actions";
import { deleteFilesById } from "@/app/drive/files/[id]/actions";

type Props = {
  currDir: Dir | null;
  currPath: string;
  files: File[];
  dirs: Dir[];
  onRefreshRequired?: () => void;
};
const Browser: FC<Props> = (props) => {
  const [fileSelected, setFileSelected] = useState<boolean[]>([]);
  const [dirSelected, setDirSelected] = useState<boolean[]>([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setFileSelected(new Array(props.files.length).fill(false));
    setDirSelected(new Array(props.dirs.length).fill(false));
  }, [props.files, props.dirs]);

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

  const selectedDirIds = props.dirs
    .filter((dir, i) => dirSelected[i])
    .map((dir) => dir.id);
  const selectedFileIds = props.files
    .filter((file, i) => fileSelected[i])
    .map((file) => file.id);

  const handleDelete = () => {
    deleteDirsById(selectedDirIds);
    deleteFilesById(selectedFileIds);

    // We set a timeout to allow the server
    // to delete the files before refreshing
    // TODO: Find a better way to handle this.
    setTimeout(() => {
      props.onRefreshRequired?.();
    }, 500);
  };

  if (
    fileSelected.length !== props.files.length ||
    dirSelected.length !== props.dirs.length
  )
    return null;

  return (
    <div className={"m-2 " + css.Browser}>
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
      <button className="btn btn-outline-dark ms-2 my-2" onClick={handleDelete}>
        <div className="d-flex align-items-center">
          <FaTrashAlt />
          <span className="ms-2">Delete</span>
        </div>
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected}
                onChange={() => selectAll()}
              />
            </th>
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
