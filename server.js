import express from "express";
import cors from "cors";

const server = express();
const port = process.env.PORT || 3001;

// ****************************************************** MIDDLEWARES **********************************************

server.use(cors());
server.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
