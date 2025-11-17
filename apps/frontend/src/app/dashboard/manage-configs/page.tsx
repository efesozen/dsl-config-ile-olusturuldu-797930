'use client';

import { useConfigurations } from '@/features/configurations/hooks/use-configurations';

export default function ManageDslConfigurationsPage() {
  const { data: configurations, isLoading } = useConfigurations();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage DSL Configurations</h1>
      <p className="text-muted-foreground mb-6">Page for users to view, edit, or delete existing DSL configurations.</p>
      
      <div className="grid gap-4">
        {configurations?.map((configuration: any) => (
          <div key={configuration.id} className="border rounded p-4">
            <pre>{JSON.stringify(configuration, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
