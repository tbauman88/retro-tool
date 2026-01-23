import { Board } from '.prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, BoardWithColumn } from '../api';
import { User } from '@prisma/client';
import { PausedState, StartState } from '@retro-tool/api-interfaces';

export const useBoard = (id?: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/boards/${id}`);
      return data.board as BoardWithColumn;
    },
    enabled: id != null,
    retry: false,
  });
};

type CreateBoardArgs = {
  title: string;
  columns: string[];
  settings?: {
    sortBy: 'createdAt' | 'votes'
  }
};

export const useCreateBoard = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: CreateBoardArgs) => apiClient.post('/boards', params),
  });
  return {
    createBoard: mutateAsync,
    createBoardLoading: isPending,
  };
};

export const useUpdateBoard = (id?: string) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Partial<CreateBoardArgs>) => apiClient.patch(`/boards/${id}`, data),
  });
  return {
    updateBoard: mutateAsync,
    updateBoardLoading: isPending,
  };
};

export type BoardWithAccesses = Omit<Board, 'createdAt'> & {
  createdAt: string;
  boardAccesses: {
    user: User;
  }[];
};

export const useBoards = () => {
  return useQuery<BoardWithAccesses[]>({
    queryKey: ['boards'],
    queryFn: async () => {
      const { data } = await apiClient.get('/boards');
      return data.boards;
    },
  });
};

type startTimerArgs = {
  timer: StartState | PausedState;
};

export const useStartTimer = (boardId: string) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: startTimerArgs) => apiClient.post(`/boards/${boardId}/timers`, params),
  });
  return {
    setTimerState: mutateAsync,
    createBoardLoading: isPending,
  };
};

type DeleteBoardArgs = {
  boardId: string;
};
export const useDeleteBoard = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: DeleteBoardArgs) => apiClient.delete(`/boards/${params.boardId}`),
  });
  return {
    deleteBoard: mutateAsync,
    deleteBoardLoading: isPending,
  };
};
