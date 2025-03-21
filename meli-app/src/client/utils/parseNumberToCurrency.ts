const currencyIDSToSymbols: Record<string, string> = {
  ARS: "$",
  USD: "US$",
};

export const formatPrice = (price: { amount: number; currency: string; decimals: number }): string => {
  const { amount, currency } = price;
  const symbol = currencyIDSToSymbols[currency] || "";

  const formattedAmount = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol} ${formattedAmount}`;
};