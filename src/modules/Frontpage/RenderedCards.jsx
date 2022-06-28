import { Card, Button } from "react-bootstrap";

let RenderedCards = ({ array }) => {
  return (
    <Card>
      <Card.Header></Card.Header>
      <Card.Img
        variant="top"
        src={array?.logo?.url}
        style={{ width: "200px" }}
      />
      <Card.Body>
        <Card.Title>{array.name}</Card.Title>
        <Card.Text>{array.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RenderedCards;
