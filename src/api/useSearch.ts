import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/vue-query";
import { hoursToMilliseconds } from "date-fns";
import { computed, toRef, type MaybeRef } from "vue";
import api, { sessionStoragePersister } from ".";

export type SearchResult = {
  id: number;
  guid: string;
  size: number;
  title: string;
  sortTitle: string;
  downloadUrl?: string;
  magnetUrl?: string;
  posterUrl: string;
  indexer: string;
  infoUrl: string;
  seeders: number;
  leechers: number;
};

const rootKey = "useSearch";

export function useSearch(query: MaybeRef<string | undefined>) {
  const queryRef = toRef(query);
  const enabled = computed(() => queryRef.value !== undefined);
  const queryClient = useQueryClient();
  persistQueryClient({
    queryClient,
    persister: sessionStoragePersister,
  });

  return useQuery(
    queryOptions({
      queryKey: [rootKey, queryRef] as const,
      queryFn: async ({ queryKey, signal }) => {
        const [, query] = queryKey;
        const params = new URLSearchParams({ query: query ?? "" }).toString();
        const response = await api.get<SearchResult[]>(`/search?${params}`, { signal });
        return response.data;
      },
      enabled,
      staleTime: hoursToMilliseconds(24),
    }),
  );
}
