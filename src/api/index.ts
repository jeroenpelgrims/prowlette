import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";
import axios from "axios";
import { config } from "../config";

const apiClient = axios.create({
  baseURL: config.VITE_PROWLARR_URL,
  headers: {
    "X-Api-Key": config.VITE_PROWLARR_API_KEY,
  },
});

export default apiClient;

export const sessionStoragePersister = createSyncStoragePersister({
  storage: window.sessionStorage,
  retry: removeOldestQuery,
});
export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
});
