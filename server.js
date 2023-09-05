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

  if (address !== 'dummy_address' ) {
    await page.goto(
      `https://etherscan.io/address/${address}`
    );  
  } else {
    await page.goto(
      `https://etherscan.io/txs`
    );  
  }

  const extractedData = await page.evaluate(() => {
    const data = [];

    const tableRows = document.querySelectorAll("tbody > tr");

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const celldata = {
        Reciever: cells[9].textContent,
        Sender: cells[7].textContent,
        Value: cells[10].textContent.slice(0, -3),
        Hash: cells[1].textContent,
        Age: cells[5].textContent
      };

      data.push(celldata);
    });
    return data;
  });


  if(address === 'dummy_address') {
    extractedData.forEach((data) => {
      data.Reciever = data.Reciever.slice(0,-3).slice(3)
      data.Sender = data.Sender.slice(0,-3).slice(2)
      data.Hash = data.Hash.slice(0,-2).slice(2)
    })

    try {
      const jsonData = JSON.stringify(extractedData, null, 2);
  
      fs.writeFileSync("./data/Latest_Transactions.json", jsonData, "utf8");
      console.log("Data written to Latest_Transactions.json");
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    try {
      const jsonData = JSON.stringify(extractedData, null, 2);
  
      fs.writeFileSync(`./data/${address}.json`, jsonData, "utf8");
      console.log(`Data written to ${address}.json`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  console.log(extractedData);
  await browser.close();
  
}

function Get_Transactions(wallets) {
  wallets.forEach((wallet) => {
    Monitor(wallet);
  });
}

function Lastest_Transactions() {
  Monitor('dummy_address')
}


function run() {
    Lastest_Transactions()
}

setInterval(run, 2500);



// TODO: Take input from user as a wallet then push the boxes of each transaction detail




// TODO: Figure out a way to give an alert when a new transaction is sent
// TODO: Give Each Wallet a name you sent to be displayed above the transaction
