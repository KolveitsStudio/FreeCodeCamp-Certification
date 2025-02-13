const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const screen = document.getElementById("due");
const registerList = document.getElementById("register-list");

let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const moneyValues = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100
};

screen.textContent = `due: $${price}`;
cid.forEach(item => {
  registerList.innerHTML += `<li>${item[0]}: $${item[1].toFixed(2)}</li>`;
});

const updateRegisterDisplay = () => {
  registerList.innerHTML = "";
  cid.forEach(item => {
    registerList.innerHTML += `<li>${item[0]}: $${item[1].toFixed(2)}</li>`;
  });
};

// Helper to format currency (0.5 remains "0.5" as expected)
const formatCurrency = value => parseFloat(value.toFixed(2)).toString();

const checkAmount = () => {
  let cashGiven = Number(cashInput.value);
  let change = cashGiven - price;

  if (cashGiven < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashGiven === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  // Save a copy of the original cash drawer (used for CLOSED status)
  const originalCid = JSON.parse(JSON.stringify(cid));
  let originalTotal = originalCid.reduce((sum, curr) => sum + curr[1], 0);
  originalTotal = Math.round(originalTotal * 100) / 100;

  // Check if total in drawer is less than required change
  let totalInDrawer = cid.reduce((sum, curr) => sum + curr[1], 0);
  totalInDrawer = Math.round(totalInDrawer * 100) / 100;
  if (totalInDrawer < change) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeGiven = [];
  // Process denominations from highest to lowest
  for (let i = cid.length - 1; i >= 0; i--) {
    let currency = cid[i][0];
    let totalAmount = cid[i][1];
    let unitValue = moneyValues[currency];

    if (change >= unitValue) {
      let maxBills = Math.floor(change / unitValue);
      let availableBills = Math.floor(totalAmount / unitValue);
      let billsToUse = Math.min(maxBills, availableBills);

      if (billsToUse > 0) {
        let amountUsed = billsToUse * unitValue;
        changeGiven.push([currency, amountUsed]);
        change -= amountUsed;
        change = Math.round(change * 100) / 100;
        cid[i][1] -= amountUsed;
        cid[i][1] = Math.round(cid[i][1] * 100) / 100;
      }
    }
  }

  // If unable to return exact change, show insufficient funds.
  if (change > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
    // Determine if the drawer is now empty (CLOSED) or not (OPEN)
    let remainingTotal = cid.reduce((sum, curr) => sum + curr[1], 0);
    remainingTotal = Math.round(remainingTotal * 100) / 100;

    if (remainingTotal === 0) {
      // For CLOSED status, output only denominations that originally had money.
      let closedOutput = originalCid
        .filter(item => item[1] > 0)
        .map(item => `${item[0]}: $${formatCurrency(item[1])}`)
        .join(" ");
      changeDue.textContent = `Status: CLOSED ${closedOutput}`;
    } else {
      let changeText = changeGiven
        .map(item => `${item[0]}: $${formatCurrency(item[1])}`)
        .join(" ");
      changeDue.textContent = `Status: OPEN ${changeText}`;
    }
  }

  updateRegisterDisplay();
};

purchaseBtn.addEventListener("click", checkAmount);
