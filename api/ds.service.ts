import { BASE_URL, DS_URL } from "@/config/env";
import { DeviceEventEmitter } from "react-native";
import { getToken } from "./security";

export async function addExpenseFromText(message: string) {
  const userId = await getToken("userId");
  const accessToken = await getToken("accessToken")
  if(!accessToken){
    throw new Error("User not logged in")
  }
  if (!userId) {
    throw new Error("User not logged in");
  }

  const dsRes = await fetch(`${DS_URL}/v1/ds/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({ message }),
  });

  if (!dsRes.ok) {
    const text = await dsRes.text();
    throw new Error(text || "DS service failed");
  }

  const dsData = await dsRes.json();

  console.log("DS parsed expense:", dsData);

  const expenseRes = await fetch(`${BASE_URL}/expense/v1/addExpense`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-User-Id": dsData.user_id.userId, 
    },
    body: JSON.stringify({
      amount: Number(dsData.amount),
      merchant: dsData.merchant,
      currency: dsData.currency,
    }),
  });

  if (!expenseRes.ok) {
    const text = await expenseRes.text();
    throw new Error(text || "Expense service failed");
  }

  DeviceEventEmitter.emit("expense:updated");
  return true;
}
