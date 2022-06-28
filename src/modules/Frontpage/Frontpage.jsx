import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import RenderedCards from "./RenderedCards";

const Frontpage = () => {
  const [DataState, setDataState] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setcurrentLongitude] = useState(0);
  const [distance, setDistance] = useState([]);
  const [mergedArray, setMergedArray] = useState([]);

  const myLocation = [currentLatitude, currentLongitude];

  let data3 = [];

  function pythagoreanDistanceBetweenPoints(lat2, lon2) {
    const R = 6371e3;
    const x =
      (lon2 - currentLongitude) * Math.cos((currentLatitude + lat2) / 2);
    const y = lat2 - currentLatitude;
    const d = Math.round((Math.sqrt(x * x + y * y) * R) / 10000);
    data3.push(d);
    return d;
  }

  useEffect(() => {
    fetchData();
    getLocation();
  }, []);

  let fetchData = async () => {
    const response = await fetch("http://localhost:3001/data");
    if (response.ok) {
      let data = await response.json();
      /* console.log(data); */
      setDataState(data);
      if (data) {
        data.map((d) => {
          pythagoreanDistanceBetweenPoints(d.location.lat, d.location.lon);
          /* console.log(data3, "data3"); */

          setDistance(data3);
        });
      }
    }
  };

  let combineArrays = () => {
    setMergedArray(
      DataState.map((d, index) => ({
        ...d,
        distance_from_current_Location: distance[index],
      }))
    );
  };

  useEffect(() => {
    combineArrays(data3);
  }, [distance]);

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  let getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const success = (pos) => {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setCurrentLatitude(crd.latitude);
    setcurrentLongitude(crd.longitude);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  const selectedShops = mergedArray.sort((a, b) =>
    a.distance_from_current_Location > b.distance_from_current_Location ? 1 : -1
  );
  /*   console.log("Selected shops: ", selectedShops);
   */
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            {selectedShops.slice(0, 5).map((array) => (
              <RenderedCards key={array._id} array={array} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Frontpage;
