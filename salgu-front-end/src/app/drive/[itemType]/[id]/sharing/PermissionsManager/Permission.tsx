import { Permission as PermissionData } from "@/types";
import Link from "next/link";
import { FC, useId, useRef, useState } from "react";

type Props = {
  data: PermissionData;
  onChange?: (data: PermissionData) => void;
  onDelete?: () => void;
};

type Entry = {
  type: "email" | "domain";
  value: string;
};

const ROLES = ["none", "read", "read-write"] as const;

const Permission: FC<Props> = (props) => {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [entries, setEntries] = useState<Entry[]>([
    ...(props.data.userEmails?.map((email) => ({
      type: "email" as const,
      value: email,
    })) || []),
    ...props.data.domains.map((domain) => ({
      type: "domain" as const,
      value: domain,
    })),
  ]);

  const readonly = props.data.isInherited || false;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      // otherwise it will be double called
      return;
    }

    const form = formRef.current!;
    const formData = new FormData(form);

    const newPermission: PermissionData = {
      ...props.data,
      domains: [],
      userEmails: [],
    };

    const dataEntries = formData.entries();

    for (const [key, value] of dataEntries) {
      if (key === "roles") {
        newPermission.level = value as PermissionData["level"];
      } else {
        const match = key.match(/(\w+)\[(\d+)\]/);
        if (!match) continue;
        const entry = entries[parseInt(match[2])];

        if (entry.type === "email") {
          newPermission.userEmails!.push(entry.value);
        } else {
          newPermission.domains.push(entry.value);
        }
      }
    }

    props.onChange?.(newPermission);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="tw-border-2 tw-border-dotted tw-border-gray-800 tw-rounded-lg tw-p-4"
    >
      <div>
        <div>
          {props.data.isInherited && (
            <p className="tw-text-sm tw-text-gray-600">
              Inherited from{" "}
              <Link
                className="tw-text-blue-500 tw-hover:tw-underline"
                href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.data.sourceDir!.id}`}
              >
                {props.data.sourceDir!.path}
              </Link>
            </p>
          )}
        </div>
        <label
          htmlFor={id + "roles"}
          className="tw-block tw-font-medium tw-text-md tw-text-gray-700"
        >
          Role
        </label>
        <select
          name="roles"
          id={id + "roles"}
          className="tw-form-select tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-gray-300"
          disabled={readonly}
          onChange={() => handleSubmit()}
          value={props.data.level}
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <table className="tw-table-auto tw-w-full tw-mt-4">
        <thead>
          <tr>
            <th className="tw-px-4 tw-py-2 tw-text-left">Subject(s)</th>
            <th className="tw-px-4 tw-py-2 tw-text-left">Variant</th>
            <th className="tw-px-4 tw-py-2 tw-text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td className="tw-border tw-px-4 tw-py-2">
                <input
                  type="text"
                  value={entry.value}
                  name={`${entry.type}[${i}]`}
                  onChange={(e) => {
                    const newEntries = [...entries];
                    newEntries[i].value = e.target.value;
                    setEntries(newEntries);
                  }}
                  onBlur={() => handleSubmit()}
                  disabled={readonly}
                  className="tw-w-full tw-border-gray-300 tw-rounded-md tw-px-3 tw-py-2"
                />
              </td>
              <td className="tw-border tw-px-4 tw-py-2">
                {entry.type === "email" ? "Email" : "Domain"}
              </td>
              <td className="tw-border tw-px-4 tw-py-2">
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setEntries(entries.filter((_, index) => index !== i));
                    handleSubmit();
                  }}
                  disabled={readonly}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!readonly && (
        <div className="tw-flex tw-justify-between tw-mt-4">
          <button
            className="tw-flex-1 tw-mr-2 btn btn-outline-dark"
            onClick={() => {
              setEntries([...entries, { type: "email", value: "" }]);
            }}
            disabled={readonly}
          >
            Add Email
          </button>
          <button
            className="tw-flex-1 btn btn-outline-dark"
            onClick={() => {
              setEntries([...entries, { type: "domain", value: "" }]);
            }}
            disabled={readonly}
          >
            Add Domain
          </button>
        </div>
      )}
      {!readonly && (
        <button
          className="tw-mt-4 btn btn-dark tw-w-full"
          disabled={readonly}
          onClick={props.onDelete}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default Permission;
