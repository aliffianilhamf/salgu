import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: any,
  ) {
    super(message);
  }
}

// https://github.com/vercel/next.js/discussions/49950#discussioncomment-6030100
api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    let newMessage: string = `HTTP Error ${error?.response?.status}`;
    if (Array.isArray(error.response?.data?.message))
      newMessage = error.response.data.message.join("\n");
    else if (typeof error.response?.data?.message === "string")
      newMessage = error.response.data.message;

    const newError = new ApiError(newMessage, error?.response?.status, error);

    return Promise.reject(newError);
  },
);

export default api;
