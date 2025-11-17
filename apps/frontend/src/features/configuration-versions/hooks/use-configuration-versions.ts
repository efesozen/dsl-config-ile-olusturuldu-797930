import type { CreateConfigurationversionDto, UpdateConfigurationversionDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { configurationversionsService } from '../services';

const CONFIGURATIONVERSION_KEY = ['configurationversions'];

export function useConfigurationversions() {
  return useQuery({
    queryKey: CONFIGURATIONVERSION_KEY,
    queryFn: () => configurationversionsService.getAll(),
  });
}

export function useConfigurationversion(id: string) {
  return useQuery({
    queryKey: [...CONFIGURATIONVERSION_KEY, id],
    queryFn: () => configurationversionsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateConfigurationversion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConfigurationversionDto) => configurationversionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATIONVERSION_KEY });
    },
  });
}

export function useUpdateConfigurationversion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateConfigurationversionDto }) =>
      configurationversionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATIONVERSION_KEY });
    },
  });
}

export function useDeleteConfigurationversion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => configurationversionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONFIGURATIONVERSION_KEY });
    },
  });
}
