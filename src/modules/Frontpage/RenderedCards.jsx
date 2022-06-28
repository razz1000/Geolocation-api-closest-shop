import { Card, Button } from "react-bootstrap";

let RenderedCards = ({ array }) => {
  return (
    <Card>
      <Card.Header></Card.Header>
      <Card.Body>
        <Card.Title>{array.name}</Card.Title>
        <Card.Text>{array.description}</Card.Text>
      </Card.Body>
    </Card>
  );

  /* <Card>
        <Card.Body>
          {console.log(a.name)}
          <Card.Title>(a.name)</Card.Title>
          <Card.Text>{a.description}</Card.Text>
          <Card.Text>{a.distance_from_current_Location} km from you</Card.Text>
        </Card.Body>
      </Card> */
};

export default RenderedCards;
