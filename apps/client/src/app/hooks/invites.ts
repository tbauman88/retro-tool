import { Board } from '.prisma/client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';

export const useInvite = (inviteCode?: string) => {
  return useQuery({
    queryKey: ['inviteCode', inviteCode],
    queryFn: async (): Promise<Board> => {
      const { data } = await apiClient.post(`/invites/${inviteCode}`);
      return data.board;
    },
    retry: 0,
    enabled: Boolean(inviteCode),
  });
};
