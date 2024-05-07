const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if (isNaN(amtVal) || amtVal < 1) {
        amount.value = "1";
        amtVal = 1; // Set amtVal to 1 if it's empty or less than 1
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];

    let finalAmount = amtVal * rate; // Corrected calculation for final amount

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        updateExchangeRate(); // Call updateExchangeRate whenever a dropdown value changes
    });
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
