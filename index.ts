import express from "express";
import {
  GetBrokerList,
  GetFloorsheet,
  GetMarketStatus,
  GetNotice,
  GetSecurities,
  GetSubIndex,
  GetTodayPrice,
  GetTopGainers,
} from "./all";

const app = express();
const port = 3000;

// app.use(express.json());
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

app.get("/api/market-status", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = marketStatus();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/notice", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetNotice();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/securities", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetSecurities();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/top-gainers", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetTopGainers();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/floorsheet", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetFloorsheet();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/today-price", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetTodayPrice();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/brokers", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetBrokerList();
  a.then(function (status) {
    res.json(status);
  });
});

app.get("/api/subindex", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const a = GetSubIndex();
  a.then(function (status) {
    res.json(status);
  });
});
