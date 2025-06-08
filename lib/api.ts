// lib/api.ts

export const fetchWithToken = async (
  url: string,
  options: RequestInit = {},
  token?: string
) => {
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
};

export const getData = async (url: string, token?: string) => {
  return fetchWithToken(url, { method: "GET" }, token);
};

export const postData = async (
  url: string,
  data: Record<string, any>,
  token?: string
) => {
  return fetchWithToken(
    url,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
    token
  );
};

export const putData = async (
  url: string,
  data: Record<string, any>,
  token?: string
) => {
  return fetchWithToken(
    url,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
    token
  );
};

export const deleteData = async (url: string, token?: string) => {
  return fetchWithToken(url, { method: "DELETE" }, token);
};
