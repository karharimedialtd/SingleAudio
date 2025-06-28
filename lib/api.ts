const API_BASE_URL = "https://backend-vkbo.onrender.com/api"; // auto-prefix /api

export const fetchWithToken = async (
  path: string,
  options: RequestInit = {},
  token?: string
) => {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getData = async (path: string, token?: string) => {
  return fetchWithToken(path, { method: "GET" }, token);
};

export const postData = async (
  path: string,
  data: Record<string, any>,
  token?: string
) => {
  return fetchWithToken(
    path,
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
  path: string,
  data: Record<string, any>,
  token?: string
) => {
  return fetchWithToken(
    path,
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

export const deleteData = async (path: string, token?: string) => {
  return fetchWithToken(path, { method: "DELETE" }, token);
};
