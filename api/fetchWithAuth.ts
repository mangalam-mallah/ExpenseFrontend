import { logout, refreshAccessToken } from "./auth.service";
import { getToken } from "./security";

let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) : Promise<Response> {
  const accessToken = await getToken("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 401) {
    return res;
  }

  console.warn("401 detected → refreshing token");

  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const newToken = await refreshAccessToken();
      queue.forEach(cb => cb(newToken));
      queue = [];
    } catch (e) {
      queue = [];
      logout();
      throw e;
    } finally {
      isRefreshing = false;
    }
  }

  return new Promise((resolve) => {
    queue.push((newToken) => {
      resolve(
        fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        })
      );
    });
  });
}
