import * as SecureStore from "expo-secure-store";
import { USER_URL } from "../config/env";

export const getMonthlyBudget = async (month: any) => {
  const userId = await SecureStore.getItemAsync("userId");

  if (!userId) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${USER_URL}/users/v1/budget?month=${month}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to get budget");
  }

  return res.json();
};

export const setMonthlyBudget = async (month: string, amount: number) => {
  const userId = await SecureStore.getItemAsync("userId");
  if (!userId) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${USER_URL}/users/v1/budget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({
      userId,
      month,
      totalBudget: amount,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Setting Budget error: ", text);
    throw new Error("Failed to set budget");
  }

  return res.json();
};

export const fetchUserInfo = async () => {
  const userId = await SecureStore.getItemAsync("userId");

  if (!userId) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${USER_URL}/users/v1/getUser/${userId}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error while getting user HTTP ${res.status}: ${text}`);
  }

  return res.json();
};

export const getCurrentYearMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`; 
};

