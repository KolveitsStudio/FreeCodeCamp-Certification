const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const screen = document.getElementById("due");
let registerList = document.getElementById("register-list");

let price = 3.26;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const moneyValues = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
  ];

  let unitCount = [];
  let change = 0;

/*TODO:
-1.How much money does the cash register have 
-2.how many coins/bills i have?
3.how much is the change
4.how much coins/bills do i give back as change?
-5.update total cash and coins/bills
6.unique scenario - i have cash but not precise change to give
7.unique scenario - i dont have enough cash 
8.unique scenario - 
*/

//how many coins/bills does the cash register have?
const getUnits = () =>{
    for(let i = 0; i < cid.length; i++){
    let newArr = (Math.round(cid[i][1]/moneyValues[i][1]))
    unitCount.push([cid[i][0], newArr])
  }
}

//initial display + calculation of money + units
cid.forEach(el => {
  registerList.innerHTML += `<p>${el[0]} : $${el[1]}</p>`
  });

let registerCashAmount = cid.reduce((acc,subArr)=>acc+(subArr[1]),0).toFixed(2)
getUnits();

//Update cash register contents
const updateRegister = () => {
  registerList.innerHTML = "";
  unitCount = [];

  getUnits();
  cid.forEach(el=>{registerList.innerHTML += `<p>${el[0]} : $${el[1]}</p>`});
  registerCashAmount = cid.reduce((acc,subArr)=>acc+(subArr[1]),0).toFixed(2);

}
purchaseBtn.addEventListener("click", () => {
  changeCalculation(cashInput.value);
  updateRegister();
});

const changeCalculation = (input) => {
  change = Number(input) - price;
  changeDue.textContent = "Status: OPEN"; // Reset display each time

  if (change === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  if (change > 0) {
    let totalCashAvailable = cid.reduce((sum, bill) => sum + bill[1], 0).toFixed(2);

    if (change > totalCashAvailable) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    }

    unitCount = [];
    getUnits();

    for (let i = unitCount.length - 1; i >= 0; i--) {
      let activeBill = unitCount[i];
      let billName = activeBill[0];
      let maxBills = activeBill[1];
      let billValue = moneyValues[i][1];

      let billsToGive = Math.min(Math.floor(change / billValue), maxBills);

      if (billsToGive > 0) {
        let totalGiven = billsToGive * billValue;
        change -= totalGiven;
        change = Number(change.toFixed(2));

        changeDue.textContent += ` ${billName}: $${(totalGiven % 1 === 0 ? totalGiven.toFixed(0) : totalGiven.toFixed(2))}`;



        cid[i][1] -= totalGiven;
        cid[i][1] = Number(cid[i][1].toFixed(2)); 
      }
    }

    let remainingCash = cid.reduce((sum, bill) => sum + bill[1], 0).toFixed(2);
    
    if (change === 0 && remainingCash == 0) {  
      changeDue.textContent = "Status: CLOSED" + changeDue.textContent.replace("Status: OPEN", "");
      }
 else if (change > 0) {  
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";  
    }
  } else if (change < 0) {
    alert("Customer does not have enough money to purchase the item");
  } else {
    changeDue.textContent = "Status: CLOSED";
  }
};
