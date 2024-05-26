import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

interface Activity {
  type: string;
  timestamp: string;
}

export default function Filehistory() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulasi data aktivitas, dalam aplikasi nyata Anda akan mengambil data ini dari API
    const mockActivities: Activity[] = [
      { type: "created", timestamp: "20240520 09.41" },
      { type: "modified", timestamp: "20240520 10.41" },
      { type: "modified", timestamp: "20240520 11.41" },
      { type: "modified", timestamp: "20240520 14.41" },
    ];

    setActivities(mockActivities);
  }, []);

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
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{activity.type}</td>
              <td>{activity.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
