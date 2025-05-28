import { createContext, useContext, ReactNode } from 'react';
import { useBulkUpload } from '@/hooks/useBulkUpload';

interface UploadContextType {
  progress: number | null;
  start: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | null>(null);

export function UploadProvider({ children }: { children: ReactNode }) {
  const { pickAndUpload, progress } = useBulkUpload();

  return (
    <UploadContext.Provider value={{ progress, start: pickAndUpload }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
} 