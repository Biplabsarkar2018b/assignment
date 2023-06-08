import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./model.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

app.get("/", async (req, res) => {
  const number = parseInt(req.query.number);

  if (isNaN(number) || number < 2) {
    res
      .status(400)
      .send(
        "Invalid number. Please provide a positive integer greater than 1."
      );
  } else {
    // Find prime numbers up to the specified number
    const primes = [];
    for (let i = 2; i <= number; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }

    res.json(primes);
  }
});

app.post("/", (req, res) => {
  const formData = req.body;

  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create a new user document
      const newUser = new User(formData);

      // Save the user document to the database
      newUser
        .save()
        .then((savedUser) => {
          res.status(200).json(savedUser);
        })
        .catch((error) => {
          res.status(400).json({ error: "Error saving form data" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(3333))
  .catch((error) => console.log(error));
