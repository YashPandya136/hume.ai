import 'server-only';
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
    const accessToken = await fetchAccessToken({
    apiKey: "siPAQNLJGzaGKnL5vnlKf34GMnGtM7mHNyaAqRJE7gcr9NGa",
    secretKey:"vGinaAmmW9sA5i5fhcSQqA47aNuZsn3gfYaH9RvPIGA3RzPWgKNmfqNuqk8FBIQU",
  });
console.log(accessToken)
  if (accessToken === 'undefined') {
    return null;
  }

  return accessToken ?? null;
}