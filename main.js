import fs from "fs";
import puppeteer from "puppeteer";
let wallets = ["0x94f1b9b64e2932f6a2db338f616844400cd58e8a"];


async function Monitor(address) {
  const browser = await puppeteer.launch({
    headless: "true",
  });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
    "upgrade-insecure-requests": "1",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,en;q=0.8",
  });

  await page.goto(
    `https://etherscan.io/address/${address}`
  );

  const extractedData = await page.evaluate(() => {
    const data = [];

    const tableRows = document.querySelectorAll("tbody > tr");

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const celldata = {
        Reciever: cells[9].textContent,
        From: cells[7].textContent,
        Value: cells[10].textContent.slice(0, -3),
        Hash: cells[1].textContent,
      };
      data.push(celldata);
    });
    return data;
  });

  console.log(extractedData);
  await browser.close();
}

function Get_Transactions(wallets) {
  wallets.forEach((wallet) => {
    Monitor(wallet);
  });
}

Get_Transactions(wallets)

// TODO: Figure out a way to give an alert when a new transaction is sent

