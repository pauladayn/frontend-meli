import axios from 'axios';
import API_URLS from '../config/apiConfig';


// Variables internas para almacenar los tokens
let accessToken = "";
let refreshTokenValue = "";

export function setTokens(newAccess: string, newRefresh: string) {
  accessToken = newAccess;
  refreshTokenValue = newRefresh;
}

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return refreshTokenValue;
}

export async function refreshTokens() {
  try {
    if (!refreshTokenValue) {
      console.log("No hay refresh token, no se puede refrescar");
      return;
    }
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.CLIENT_ID!);
    params.append("client_secret", process.env.CLIENT_SECRET!);
    params.append("refresh_token", refreshTokenValue);

    const response = await axios.post(
      `${API_URLS.TOKEN}`,
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const data = response.data;
    console.log("Refresh token response:", data);

    if (!data.error) {
      setTokens(data.access_token, data.refresh_token);
    }
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
}
