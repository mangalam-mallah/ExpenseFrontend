import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../config/env";
import { getToken, saveToken } from "./security";

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Login failed");
  }

  const data = await res.json();

  await saveToken("accessToken", data.accessToken);
  await saveToken("refreshToken", data.token);

  return data;
}

export async function signup(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  userName: string
) {
  const res = await fetch(`${BASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      password,
      username: userName,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Signup failed");
  }

  return await res.json();
}


export async function ping() {
  const accessToken = await getToken("accessToken");
  if (!accessToken) return;

  const res = await fetch(`${BASE_URL}/auth/v1/ping`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Ping failed");
  }

  const data = await res.json();
  await saveToken("userId", data.userId);
}


export async function refreshAccessToken() {
  const refreshToken = await getToken("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(`${BASE_URL}/auth/v1/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Refresh token failed");
  }

  const data = await res.json();

  await saveToken("accessToken", data.accessToken);
  await saveToken("refreshToken", data.token); 

  return true;
}

export async function logout() {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("userId");
}

export async function getExpense() {
  const userId = await getToken("userId")
  if(!userId){
    throw new Error("User not logged in")
  }
  const accessToken = await getToken("accessToken");
  if(!accessToken) {
    throw new Error("User is not logged in")
  }

  const res = await fetch(`${BASE_URL}/expense/v1/getExpense`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-user-id": userId
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to fetch expenses");
  }

  return await res.json();
}
