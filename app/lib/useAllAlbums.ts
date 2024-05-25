import { useQuery } from "@tanstack/react-query";

export function useAllAlbums() {
  return useQuery({
    queryKey: ["all-albums"],
    queryFn: async () => {
      const response = await fetch("/api/proxy/fetch-all-albums");
      if (!response.ok) {
        throw new Error(`Error fetching album data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
  });
}
