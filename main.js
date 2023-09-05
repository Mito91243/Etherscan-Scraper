document.addEventListener("DOMContentLoaded", Get_Transactions);


function Get_Transactions() {
  fetch("./data/Latest_Transactions.json") // Replace with the correct path to your JSON file
    .then((response) => response.json())
    .then((data) => {
      const tablebody = document.getElementById("table-sectors");
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.classList.add(
          "transition",
          "duration-300",
          "ease-in-out",
          "hover:bg-neutral-100",
          "dark:border-neutral-500",
          "dark:hover:bg-neutral-300"
        );

        const tdHash = document.createElement("td");
        tdHash.classList.add(
          "whitespace-nowrap",
          "px-6",
          "py-4",
          "font-medium"
        );
        tdHash.textContent = item.Hash;

        const tdSender = document.createElement("td");
        tdSender.classList.add("whitespace-nowrap", "px-6", "py-4");
        tdSender.textContent = item.Sender;

        const tdReciever = document.createElement("td");
        tdReciever.classList.add(
          "whitespace-nowrap",
          "px-6",
          "py-4",
          "font-medium",
        );
        tdReciever.textContent = item.Reciever;

        const tdValue = document.createElement("td");
        tdValue.classList.add(
          "whitespace-nowrap",
          "px-6",
          "py-4",
          "font-medium",
        );
        tdValue.textContent = item.Value;

        const tdTime = document.createElement("td");
        tdTime.classList.add(
          "whitespace-nowrap",
          "px-6",
          "py-4",
          "font-medium",
        );
        tdTime.textContent = item.Age;

        tablebody.appendChild(tr);
        tr.appendChild(tdHash);
        tr.appendChild(tdSender);
        tr.appendChild(tdReciever);
        tr.appendChild(tdValue)
        tr.appendChild(tdTime)
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
}

function run() {
  Get_Transactions()
}

setInterval(run, 2500);
