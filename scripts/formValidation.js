const cardnumberInput = document.querySelector("input.cardnumber");

cardnumberInput.addEventListener("input", () => {
  cardnumberInput.setCustomValidity("");
  cardnumberInput.checkValidity();
});

cardnumberInput.addEventListener("invalid", () => {
  if (cardnumberInput.value === "") {
    cardnumberInput.setCustomValidity("Enter your credit card number!");
  } else {
    cardnumberInput.setCustomValidity(
      "Credit cards have 16 digits. Try again!"
    );
  }
});

const csvInput = document.querySelector("input.csv");

csvInput.addEventListener("input", () => {
  csvInput.setCustomValidity("");
  csvInput.checkValidity();
});

csvInput.addEventListener("invalid", () => {
  if (csvInput.value === "") {
    csvInput.setCustomValidity("Enter your csv!");
    // check if csv contains non numbers

  } else if (csvInput.value.match(/[^0-9]/g)) {
    csvInput.setCustomValidity(
      "Your csv can only contain three numbers. Try again!"
    );
  }
});

const expiryDateInput = document.querySelector("input.expirydata");
// get the current month
const currentMonth = new Date().getMonth() + 1;
// get the current year
const currentYear = new Date().getFullYear();
// set the minimum date to today
expiryDateInput.setAttribute("min", `${currentYear}-${currentMonth}`);

expiryDateInput.addEventListener("input", () => {
  expiryDateInput.setCustomValidity("");
  expiryDateInput.checkValidity();
});

expiryDateInput.addEventListener("invalid", () => {
  if (expiryDateInput.value === "") {
    expiryDateInput.setCustomValidity("Enter your expiry date!");
  } else {
    expiryDateInput.setCustomValidity(
      "Expiry dates must be after the current date. Try again!"
    );
  }
});
