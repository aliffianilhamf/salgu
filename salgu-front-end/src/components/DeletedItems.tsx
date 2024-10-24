import api from "@/api";
import { File } from "@/types";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaFile, FaFolder, FaTrashAlt, FaTrashRestore } from "react-icons/fa";

interface DeletedItem {
  id: string;
  name: string;
  type: "file" | "folder";
  deletedAt: Date;
}

const DeletedItems: React.FC = () => {
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([]);

  useEffect(() => {
    api.get("/files", { params: { onlyDeleted: true } }).then((res) => {
      const files: File[] = res.data;
      setDeletedItems(
        files.map((file) => ({
          id: file.id,
          type: "file",
          name: file.name,
          deletedAt: new Date(file.deletedAt!),
        })),
      );
    });
  }, []);

  return (
    <div className="tw-overflow-x-auto">
      <h1>Deleted Files and Folders</h1>
      <table className="tw-min-w-full tw-bg-white tw-border tw-border-gray-200">
        <thead>
          <tr>
            <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
              Type
            </th>
            <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
              Name
            </th>
            <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
              Deletion Time
            </th>
          </tr>
        </thead>
        <tbody>
          {deletedItems.map((item) => (
            <tr key={item.id}>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {item.type === "file" ? <FaFile /> : <FaFolder />}
              </td>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {item.name}
              </td>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {format(item.deletedAt, "yyyy-MM-dd HH:mm:ss")}
              </td>
              {/* <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                <div className="tw-flex tw-gap-2">
                  <button
                    onClick={() => handleRestore(item.id)}
                    className="btn btn-outline-dark tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-green-600 tw-flex tw-items-center"
                  >
                    <FaTrashRestore className="tw-mr-2" /> Restore
                  </button>
                  <button
                    onClick={() => handleDeletePermanently(item.id)}
                    className="btn btn-dark tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-red-600 tw-flex tw-items-center"
                  >
                    <FaTrashAlt className="tw-mr-2" /> Delete Permanently
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedItems;
