import { api } from '@/lib/api';
import type { ConfigurationResponseDto, CreateConfigurationDto, UpdateConfigurationDto } from '@saas-template/core';

export const configurationsService = {
  async getAll(): Promise<ConfigurationResponseDto[]> {
    const response = await api.get('/configurations');
    return response.data;
  },

  async getById(id: string): Promise<ConfigurationResponseDto> {
    const response = await api.get(`/configurations/${id}`);
    return response.data;
  },

  async create(data: CreateConfigurationDto): Promise<ConfigurationResponseDto> {
    const response = await api.post('/configurations', data);
    return response.data;
  },

  async update(id: string, data: UpdateConfigurationDto): Promise<ConfigurationResponseDto> {
    const response = await api.put(`/configurations/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/configurations/${id}`);
  },
};
