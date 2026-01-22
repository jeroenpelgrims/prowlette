import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PROWLARR_URL,
  headers: {
    "X-Api-Key": import.meta.env.VITE_PROWLARR_API_KEY,
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
