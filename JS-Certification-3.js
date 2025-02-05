const inputField = document.getElementById("user-input");
const resultField = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");


const nrRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
                           

const addEl = (el, str) => {
    const pElement = document.createElement("p");
    pElement.classList.add("result");
    pElement.textContent = `${str} US number: ${el}`;
    resultField.appendChild(pElement);
}

const checkFunction = () => {
    const userInput = inputField.value;
    if(userInput === ""){
        alert("Please provide a phone number");
    }else if(nrRegex.test(userInput)) {
        addEl(userInput, "Valid");  
        inputField.value = "";      
    } else {
        addEl(userInput, "Invalid");
        inputField.value = "";
    }   
}

const clearFunction = () => {
    inputField.value = "";
    resultField.textContent = "";
};


checkBtn.addEventListener("click", checkFunction);
clearBtn.addEventListener("click", clearFunction);
