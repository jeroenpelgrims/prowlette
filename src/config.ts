interface EnvConfig {
  VITE_PROWLARR_URL: string;
  VITE_PROWLARR_API_KEY: string;
}

declare global {
  interface Window {
    __ENV__?: EnvConfig;
  }
}

export const config: EnvConfig = {
  VITE_PROWLARR_URL: window.__ENV__?.VITE_PROWLARR_URL ?? import.meta.env.VITE_PROWLARR_URL,
  VITE_PROWLARR_API_KEY: window.__ENV__?.VITE_PROWLARR_API_KEY ?? import.meta.env.VITE_PROWLARR_API_KEY,
};