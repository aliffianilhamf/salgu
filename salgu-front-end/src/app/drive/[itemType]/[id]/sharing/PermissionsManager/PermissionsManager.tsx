import { Permission as PermissionData } from "@/types";
import { FC } from "react";
import Permission from "./Permission";

type Props = {
  permissions: PermissionData[];
  onChange?: (permissions: PermissionData[]) => void;
  onSave?: () => void;
};

const PermissionsManager: FC<Props> = (props) => {
  return (
    <div>
      {props.permissions.map((permission, i) => (
        <Permission
          key={i}
          data={permission}
          onChange={(newPermission) => {
            props.onChange?.(
              props.permissions.map((p, j) => (j === i ? newPermission : p)),
            );
          }}
          onDelete={() => {
            props.onChange?.(props.permissions.filter((_, j) => j !== i));
          }}
        />
      ))}
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          props.onChange?.([
            ...props.permissions,
            {
              id: -1,
              domains: [],
              level: "none",
              fileId: null,
              dirId: null,
            },
          ]);
        }}
      >
        Add Permission Entry
      </button>
      <button className="btn btn-outline-dark" onClick={() => props.onSave?.()}>
        Save
      </button>
    </div>
  );
};

export default PermissionsManager;
