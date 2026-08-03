import { useQuery } from '@tanstack/react-query';

export function useAyurvedaData(endpoint: string) {
  return useQuery({
    queryKey: ['ayurveda', endpoint],
    queryFn: async () => {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/ayurveda/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
      return response.json();
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
