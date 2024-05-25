import { useQuery } from "@tanstack/react-query";

export function useAlbumData(title: string) {
  return useQuery({
    queryKey: ["album-data", title],
    queryFn: async () => {
      const response = await fetch(
        `/api/proxy/fetch-album-data/?title=${encodeURIComponent(title)}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching album data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
  });
}
