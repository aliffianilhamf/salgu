"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LinkButton from "../../components/LinkButton";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const LINKS = [
  "/drive/home",
  "/drive/folders/0000",
  "/drive/files/0000",
  "/drive/files/0000/history",
  "/drive/items/0000/sharing",
  "/drive/usage",
];

export default function Home() {
  return (
    <Container className="p-5 gap-4">
      <Row>
        <Col md className="text-center">
          <h1>SALGU</h1>
          <p>SALGU Cloud Storage untuk kebutuhan Anda</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex flex-column align-items-center">
          <p>Sudah punya akun? Silahkan login untuk mengakses layanan kami</p>
          <LinkButton variant="primary" href="/sign-in">
            Login
          </LinkButton>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <p>Belum punya akun? Silahkan daftar untuk mengakses layanan kami</p>
          <LinkButton variant="primary" href="/sign-up">
            Register
          </LinkButton>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12" lg="6">
          <Card>
            <Card.Body>
              <Card.Title>
                Tautan-tautan bermanfaat untuk development
              </Card.Title>
              <ListGroup>
                {LINKS.map((link) => (
                  <ListGroup.Item
                    key={link}
                    as={LinkButton}
                    href={link}
                    className="text-start"
                  >
                    {link}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
