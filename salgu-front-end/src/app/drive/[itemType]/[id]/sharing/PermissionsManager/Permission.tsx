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
      className="card border-black border-2"
    >
      <div>
        <div>
          {props.data.isInherited && (
            <span>
              Inherited from{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_HOST}/drive/folders/${props.data.sourceDir!.id}`}
              >
                {props.data.sourceDir!.path}
              </Link>
            </span>
          )}
        </div>
        <label htmlFor={id + "roles"}>Role</label>
        <select
          name="roles"
          id={id + "roles"}
          className="form-select"
          disabled={readonly}
          onChange={handleSubmit}
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Subject(s)</th>
            <th>Variant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td>
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
                />
              </td>
              <td>{entry.type === "email" ? "Email" : "Domain"}</td>
              <td>
                <button
                  className="btn btn-outline-dark"
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
          <tr className="flex-row"></tr>
        </tbody>
      </table>
      {!readonly && (
        <div className="btn-group">
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              setEntries([...entries, { type: "email", value: "" }]);
            }}
            disabled={readonly}
          >
            Add Email
          </button>
          <button
            className="btn btn-outline-dark"
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
          className="btn btn-outline-dark"
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
