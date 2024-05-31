import React, { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFileHistory } from "@/app/drive/files/[id]/actions";
import { parseISO, formatDistanceToNow, format } from "date-fns";

interface Action {
  type: string;
  executedAt: string;
  actor: {
    email: string;
  };
}
type Props = {
  // currDir: Dir | null;
  id: string;
};

const Filehistory: FC<Props> = (props) => {
  const { id } = props;
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    getFileHistory(id).then((res) => {
      console.log(res);
      setActions(res);
    });
  }, [id]);

  return (
    <Container className="p-5">
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => window.history.back()}
      >
        Kembali
      </Button>
      <h2>History file</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tipe</th>
            <th>When</th>
            <th>Timestamp</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{activity.type}</td>
              <td>
                {formatDistanceToNow(parseISO(activity.executedAt), {
                  addSuffix: true,
                })}
              </td>
              <td>
                {format(parseISO(activity.executedAt), "dd MMM yyyy HH:mm")}
              </td>
              <td>{activity.actor.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Filehistory;
