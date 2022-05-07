import axios from "axios";
import { Prove } from "./types/prove";
import { SecurityBrief } from "./types/securityBrief";
// import { SecurityDetail, SecurityDetailResponse } from "./types/securityDetail";
// import { MarketStatus } from "./types/marketStatus";
import https from "https";

let securityBriefList: SecurityBrief[] = [];

const BASE_URL = "https://newweb.nepalstock.com/api";

function decode1(saltNum: number, data: number[]): number {
  return (
    data[
      (Math.floor(saltNum / 10) % 10) +
        (saltNum - Math.floor(saltNum / 10) * 10) +
        (Math.floor(saltNum / 100) % 10)
    ] + 22
  );
}

function decode2(saltNum: number, data: number[]): number {
  const index: number =
    (Math.floor(saltNum / 10) % 10) +
    (Math.floor(saltNum / 100) % 10) +
    (saltNum - Math.floor(saltNum / 10) * 10);
  return (
    data[index] +
    (Math.floor(saltNum / 10) % 10) +
    (Math.floor(saltNum / 100) % 10) +
    22
  );
}

function GetValidToken(proveObj: Prove): string {
  const dataArr: number[] = [
    9, 8, 4, 1, 2, 3, 2, 5, 8, 7, 9, 8, 0, 3, 1, 2, 2, 4, 3, 0, 1, 9, 5, 4, 6,
    3, 7, 2, 1, 6, 9, 8, 4, 1, 2, 2, 3, 3, 4, 4,
  ];
  const num1: number = decode1(proveObj.salt2, dataArr);
  const num2: number = decode2(proveObj.salt2, dataArr);

  return (
    proveObj.accessToken.slice(0, num1) +
    proveObj.accessToken.slice(num1 + 1, num2) +
    proveObj.accessToken.slice(num2 + 1)
  );
}

async function GetAccessToken(): Promise<string | null> {
  const proveResponse = await axios.get(`${BASE_URL}/authenticate/prove`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (proveResponse !== null) {
      return GetValidToken(proveResponse.data as Prove);
    }
  } catch (error) {
    return null;
  }

  return null;
}

async function GetMarketStatus() {
  const token = await GetAccessToken();
  const marketData = await axios.get(
    `${BASE_URL}/nots/nepse-data/market-open`,
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // set to false
      }),
      headers: {
        authorization: `Salter ${token}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
      },
    }
  );

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

function GetValidBodyId(marketId: number) {
  const dummyData = [
    147, 117, 239, 143, 157, 312, 161, 612, 512, 804, 411, 527, 170, 511, 421,
    667, 764, 621, 301, 106, 133, 793, 411, 511, 312, 423, 344, 346, 653, 758,
    342, 222, 236, 811, 711, 611, 122, 447, 128, 199, 183, 135, 489, 703, 800,
    745, 152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153, 648, 611,
    151, 649, 318, 143, 117, 756, 119, 141, 717, 113, 112, 146, 162, 660, 693,
    261, 362, 354, 251, 641, 157, 178, 631, 192, 734, 445, 192, 883, 187, 122,
    591, 731, 852, 384, 565, 596, 451, 772, 624, 691,
  ];
  const currentDate = new Date();
  const datePart = currentDate.getDate();
  const id = dummyData[marketId] + marketId + 2 * datePart;
  return id;
}

async function GetNotice() {
  const token = await GetAccessToken();
  const marketData = await axios.get(`${BASE_URL}/web/notice`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      authorization: `Salter ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetSecurities() {
  const token = await GetAccessToken();
  const marketData = await axios.get(
    `${BASE_URL}/nots/security?nonDelisted=true`,
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // set to false
      }),
      headers: {
        authorization: `Salter ${token}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
      },
    }
  );

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetTopGainers() {
  const token = await GetAccessToken();
  const marketData = await axios.get(`${BASE_URL}/nots/top-ten/top-gainer`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      authorization: `Salter ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetFloorsheet() {
  const token = await GetAccessToken();
  const marketData = await axios.get(`${BASE_URL}/nots/nepse-data/floorsheet`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      authorization: `Salter ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetTodayPrice() {
  const token = await GetAccessToken();
  const marketData = await axios.get(
    `${BASE_URL}/nots/securityDailyTradeStat/58`,
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // set to false
      }),
      headers: {
        authorization: `Salter ${token}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
      },
    }
  );

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetBrokerList() {
  const token = await GetAccessToken();
  const marketData = await axios.get(`${BASE_URL}/nots/member?&size=100`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      authorization: `Salter ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

async function GetSubIndex() {
  const token = await GetAccessToken();
  const marketData = await axios.get(`${BASE_URL}/nots/sectorwise`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // set to false
    }),
    headers: {
      authorization: `Salter ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
    },
  });

  try {
    if (marketData) {
      return marketData.data;
    }
  } catch (error) {
    return null;
  }
}

// async function GetMarketSummary() {
//   const token = await GetAccessToken();
//   const marketData = await axios.get(`${BASE_URL}/nots/market-summary`, {
//     httpsAgent: new https.Agent({
//       rejectUnauthorized: false, // set to false
//     }),
//     headers: {
//       authorization: `Salter ${token}`,
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
//     },
//   });

//   try {
//     if (marketData) {
//       return marketData.data;
//     }
//   } catch (error) {
//     return null;
//   }
// }

export {
  GetMarketStatus,
  GetNotice,
  GetSecurities,
  GetTopGainers,
  GetFloorsheet,
  GetTodayPrice,
  GetBrokerList,
  GetSubIndex,
};
