export const currencyType = process.env.NEXT_PUBLIC_APP_CURRENCY_TYPE || "USD";

export const formatPrice = (price: number | string): string => {
  return `${currencyType} ${Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
