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

type UseSearchParams = {
  query: MaybeRef<string | undefined>;
  categories?: MaybeRef<number[]>;
};

export function useSearch(params: UseSearchParams) {
  const queryClient = useQueryClient();
  persistQueryClient({
    queryClient,
    persister: sessionStoragePersister,
  });
  const query = toRef(params.query);
  const enabled = computed(() => query.value !== undefined)

  return useQuery(
    queryOptions({
      queryKey: [rootKey, params] as const,
      queryFn: async ({ queryKey, signal }) => {
        const [, { query, categories }] = queryKey;

        const queryParams = new URLSearchParams();
        queryParams.set('query', query ?? "");
        categories?.forEach(c => queryParams.append('categories', `${c}`))

        const response = await api.get<SearchResult[]>(`/search?${queryParams.toString()}`, {
          signal,
        });
        return response.data;
      },
      staleTime: hoursToMilliseconds(24),
      enabled
    }),
  );
}
