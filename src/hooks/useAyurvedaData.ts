import { useQuery } from '@tanstack/react-query';

export function useAyurvedaData(endpoint: string) {
  return useQuery({
    queryKey: ['ayurveda', endpoint],
    queryFn: async () => {
      const response = await fetch(`https://ishan-backend-g096.onrender.com/api/ayurveda/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}
