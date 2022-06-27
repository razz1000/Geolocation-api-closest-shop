import { Card } from "react-bootstrap";

let RenderedCards = (props) => {
  props.mergedArray.map((a) => {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{a.name}</Card.Title>
          <Card.Text>{a.description}</Card.Text>
          <Card.Text>{a.distance_from_current_Location} km from you</Card.Text>
        </Card.Body>
      </Card>
    );
  });
};

export default RenderedCards;
