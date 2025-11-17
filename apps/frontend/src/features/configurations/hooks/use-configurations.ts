import type { CreateConfigurationDto, UpdateConfigurationDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { configurationsService } from '../services';

const CONFIGURATION_KEY = ['configurations'];

export function useConfigurations() {
  return useQuery({
    queryKey: CONFIGURATION_KEY,
    queryFn: () => configurationsService.getAll(),
  });
}

export function useConfiguration(id: string) {
  return useQuery({
    queryKey: [...CONFIGURATION_KEY, id],
    queryFn: () => configurationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConfigurationDto) => configurationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATION_KEY });
    },
  });
}

export function useUpdateConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateConfigurationDto }) =>
      configurationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATION_KEY });
    },
  });
}

export function useDeleteConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => configurationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATION_KEY });
    },
  });
}
