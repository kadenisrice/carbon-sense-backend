import express from "express";
import { getClient } from "../db";

import Account from "../models/Account";

const accountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// Get all accounts (GET)
accountRouter.get("/accounts", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Account>("accounts").find();
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Create new account (POST)
accountRouter.post("/accounts", async (req, res) => {
  try {
    const account: Account = req.body;
    const client = await getClient();
    await client.db().collection<Account>("accounts").insertOne(account);
    res.status(201).json(account);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default accountRouter;
