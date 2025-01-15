const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const resultContainer = document.getElementById("output");

const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" }, // 900 = 1000 - 100
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" }, // 400 = 500 - 100
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },  // 90 = 100 - 10
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },  // 40 = 50 - 10
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },   // 9 = 10 - 1
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },   // 4 = 5 - 1
    { value: 1, numeral: "I" }
  ];

convertBtn.addEventListener('click', ()=>{
    if(input.value === ""){
        resultContainer.textContent = "Please enter a valid number";
        nr = "";
        return;
    }
    if(parseInt(input.value) < 1){
        resultContainer.textContent = "Please enter a number greater than or equal to 1";
        nr = "";
        return;
    }
    if(parseInt(input.value) >= 4000){
        resultContainer.textContent = "Please enter a number less than or equal to 3999"
        nr = "";
        return;
    }
    let nr = input.value;
let result = "";

for (let i=0 ; i < romanNumerals.length ; i++){
    while(nr >= romanNumerals[i].value){
        result += romanNumerals[i].numeral;
        nr -= romanNumerals[i].value;
    }
};
resultContainer.textContent = result;
})



