import { useState, useCallback } from 'react';
import { Camera } from '@capacitor/camera';

export type PhotoPermission = 'granted' | 'denied' | 'prompt';

export const usePhotoPermission = () => {
  const [status, setStatus] = useState<PhotoPermission>('prompt');

  const ask = useCallback(async () => {
    const res = await Camera.requestPermissions({
      permissions: ['photos']
    });
    setStatus(res.photos as PhotoPermission);
    return res.photos as PhotoPermission;
  }, []);

  return { status, ask };
}; 