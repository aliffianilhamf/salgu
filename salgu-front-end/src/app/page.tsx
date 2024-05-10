import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="p-5">
      <Row>
        <Col md className="text-center">
          <h1>SALGU</h1>
          <p>SALGU Cloud Storage untuk kebutuhan Anda</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <p>Sudah punya akun? Silahkan login untuk mengakses layanan kami</p>
          <Button variant="primary" href="/sign-in">
            Login
          </Button>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <p>Belum punya akun? Silahkan daftar untuk mengakses layanan kami</p>
          <Button variant="primary" href="/sign-up">
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
