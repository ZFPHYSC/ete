import { useBulkUpload } from '@/hooks/useBulkUpload';

export const useUploader = () => {
  const { pickAndUpload, progress } = useBulkUpload();
  return {
    progress,                        // 0 → 1   (null when idle)
    start: pickAndUpload,            // kick it off
  };
}; 