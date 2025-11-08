import { apiClient } from './client';

export type RegisterPayload = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message?: string;
  user?: {
    _id: string;
    email: string;
    createdAt: string;
  };
};

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<RegisterResponse>('/user/register', payload);
  return data;
};
