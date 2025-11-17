import { api } from '@/lib/api';
import type { ConfigurationversionResponseDto, CreateConfigurationversionDto, UpdateConfigurationversionDto } from '@saas-template/core';

export const configurationversionsService = {
  async getAll(): Promise<ConfigurationversionResponseDto[]> {
    const response = await api.get('/configurationversions');
    return response.data;
  },

  async getById(id: string): Promise<ConfigurationversionResponseDto> {
    const response = await api.get(`/configurationversions/${id}`);
    return response.data;
  },

  async create(data: CreateConfigurationversionDto): Promise<ConfigurationversionResponseDto> {
    const response = await api.post('/configurationversions', data);
    return response.data;
  },

  async update(id: string, data: UpdateConfigurationversionDto): Promise<ConfigurationversionResponseDto> {
    const response = await api.put(`/configurationversions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/configurationversions/${id}`);
  },
};
