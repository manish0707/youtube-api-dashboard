export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_BASE_URL) {
  throw new Error("Error! Please add NEXT_APP_API_BASE_URL to env file.");
}

if (!API_KEY) {
  throw new Error("Error! Please add NEXT_APP_API_KEY to env file.");
}
