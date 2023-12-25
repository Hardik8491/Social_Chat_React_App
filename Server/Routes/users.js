import express from "express";
import jsonData from "../Dummy/MOCK_DATA.json" assert { type: "json" };
const router = express.Router();

// const User = require('./user'); // If using MongoDB
let dataArray = [];
dataArray = jsonData;
router.post("/register", (req, res) => {
  const fakeUser = {
    // username: faker.internet.userName(),
    // email: faker.internet.email(),
    // password: faker.internet.password(),
  };

  // If using MongoDB, you can save the user data to the database
  // const newUser = new User(fakeUser);
  // newUser.save();
  const newUser = new User(fakeUser);
  newUser.save();
  console.log(newUser);
  res.json(fakeUser);
});

export default router;
