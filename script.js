const droplist = document.querySelectorAll(".dropdowns select");

    for (let i = 0; i < droplist.length; i++) {
        for (const currency_code in country_code) {
            let optionNew = document.createElement("option");
            optionNew.value = currency_code;
            optionNew.textContent = currency_code;
            if (i == 1 && currency_code === "INR") {
                optionNew.setAttribute("selected", "selected");
            }
            else if (i == 0 && currency_code === "USD") {
                optionNew.setAttribute("selected", "selected");
            }
            droplist[i].appendChild(optionNew);
        }
    }

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const resultElement = document.getElementById(`result`);
const image1 = document.getElementById(`flag1`);
const image2 = document.getElementById(`flag2`);
const arrowIcon1 = document.getElementById(`arrowIcon`);

fromCurrency.addEventListener('change', function () {
    changeFlag(image1, this.value)
}
)

toCurrency.addEventListener('change', function () {
    changeFlag(image2, this.value)
}
)

arrowIcon1.addEventListener('click', function () {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    changeFlag(image1, fromCurrency.value);
    changeFlag(image2, toCurrency.value);
    getExchangeRate();
})

function changeFlag(images, code) {
    images.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;

} 


function getExchangeRate() {
    let amount = document.getElementById(`amount`);
    if (amount.value == "" || amount.value <= 0) {
        amount.value = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/40382d8c13b6635f9c727c50/latest/${fromCurrency.value}`;
    try {
        fetch(url).then(response => response.json()).then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
            resultElement.innerText = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
            console.log(totalExchangeRate);
        })
    }
    catch(error){
        console.error(error);
    }
    
    
}



