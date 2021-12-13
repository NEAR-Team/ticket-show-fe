import { utils } from "near-api-js";

export const formatNearAmount = (amount) => {
  if (typeof amount === "number") {
    amount = amount.toLocaleString("fullwide", { useGrouping: false });
  }
  const amountFormatted = utils.format.formatNearAmount(amount);
  return Math.round(Number(amountFormatted) + Number.EPSILON);
};

export const formatDepositAmount = (amount) => {
  if (typeof amount === "number") {
    amount = amount.toLocaleString("fullwide", { useGrouping: false });
  }
  amount = utils.format.formatNearAmount(amount);
  amount = Math.round((Number(amount) + Number.EPSILON) * 1000) / 1000;
  return utils.format.parseNearAmount(amount.toString());
};
