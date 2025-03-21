const currencyIDSToSymbols: Record<string, string> = {
  ARS: "$",
  USD: "US$",
};

const formatDecimals = (amount: number): string => {
  const [, decimalPart = "00"] = amount.toString().split(".");
  return decimalPart.length === 1 ? `${decimalPart}0` : decimalPart.slice(0, 2);
};

export const formatPrice = (price: { amount: number; currency: string; decimals: number }): string => {
  const { amount, currency } = price;
  const symbol = currencyIDSToSymbols[currency] || "";
  const [integerPart] = amount.toString().split(".");
  const decimalPart = formatDecimals(amount);

  return `${symbol} ${integerPart},${decimalPart}`;
};

