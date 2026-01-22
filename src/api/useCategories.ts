import { useQuery } from "@tanstack/vue-query";
import { hoursToMilliseconds } from "date-fns";
import api from ".";

export type IndexerCategory = {
  id: number;
  name: string;
  subCategories: IndexerCategory[];
}


export function useCategories() {
  return useQuery({
    queryKey: ["useCategories"],
    queryFn: async () => {
      const response = await api.get<IndexerCategory[]>("/indexer/categories");
      return response.data;
    },
    staleTime: hoursToMilliseconds(24 * 30)
  });
}
