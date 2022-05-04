import express from "express";
import { GetMarketStatus } from "./all";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App in running on port ${port}.`);
});

async function marketStatus() {
  let res = await GetMarketStatus();
  if (res) {
    return res;
  } else {
    return null;
  }
}

console.log(marketStatus());
app.get("/api/market-status", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(marketStatus());
});
