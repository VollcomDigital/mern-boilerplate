import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { ApiResponse, UserDto, CreateUserDto, LoginDto } from '@mern/shared';

import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../stores/authStore';

export function useLogin() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await apiClient.post<ApiResponse<UserDto>>('/api/auth/login', data);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (data) {
        setUser(data);
        navigate('/dashboard');
      }
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await apiClient.post<ApiResponse<UserDto>>('/api/auth/register', data);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (data) {
        setUser(data);
        navigate('/dashboard');
      }
    },
  });
}
