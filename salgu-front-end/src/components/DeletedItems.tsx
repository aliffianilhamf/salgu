import React, { useState } from "react";
import { FaFile, FaFolder, FaTrashAlt, FaTrashRestore } from "react-icons/fa";

interface DeletedItem {
  id: number;
  name: string;
  type: "file" | "folder";
  deletedDate: string;
}

const DeletedItems: React.FC = () => {
  const [deletedFiles, setDeletedFiles] = useState<DeletedItem[]>([
    { id: 1, name: "file1.txt", type: "file", deletedDate: "2023-06-01" },
    { id: 2, name: "Folder1", type: "folder", deletedDate: "2023-06-09" },
    { id: 3, name: "file2.png", type: "file", deletedDate: "2023-06-15" },
  ]);

  const handleRestore = (id: number) => {
    // Implement restore logic here
    console.log(`Restoring item with id ${id}`);
  };

  const handleDeletePermanently = (id: number) => {
    // Implement delete permanently logic here
    console.log(`Deleting permanently item with id ${id}`);
  };

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
              Deleted Date
            </th>
            <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {deletedFiles.map((item) => (
            <tr key={item.id}>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {item.type === "file" ? <FaFile /> : <FaFolder />}
              </td>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {item.name}
              </td>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
                {item.deletedDate}
              </td>
              <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedItems;
