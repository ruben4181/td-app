const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + "...";
  } else {
    return text;
  }
};

const unformatCurrency = (currencyString) => {
  // Remove any non-numeric characters from the string, such as commas or currency symbols
  if (typeof currencyString === "number") {
    return currencyString;
  }
  const numericString = currencyString.replace(/[^0-9,-]+/g, "");

  // Convert the numeric string to a number
  const number = Number(numericString);

  return number;
};

const formatCurrency = (number) => {
  number = unformatCurrency(number);
  const ftd = Number(number).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return ftd == "NaN" ? "" : ftd;
};

const AppUtils = {
  truncateText,
  formatCurrency,
  unformatCurrency,
};

export default AppUtils;
