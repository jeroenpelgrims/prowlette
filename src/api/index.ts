import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://prowlarr.jeroenpelgrims.com/api/v1",
  headers: {
    "X-Api-Key": import.meta.env.VITE_PROWLARR_API_KEY,
  },
});

export default apiClient;

export const sessionStoragePersister = createSyncStoragePersister({
  storage: window.sessionStorage,
  // retry: removeOldestQuery,
});
