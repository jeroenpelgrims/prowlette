import { useQuery } from "@tanstack/vue-query";
import api from ".";

type Indexer = {
  id: number;
  name: string;
};

export function useIndexers() {
  return useQuery<Indexer[]>({
    queryKey: ["indexers"],
    queryFn: async () => {
      const response = await api.get("/indexer");
      return response.data;
    },
  });
}
