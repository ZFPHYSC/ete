import { useState } from 'react';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

const HOST =
  Capacitor.getPlatform() === 'ios' && Capacitor.isNativePlatform()
    ? 'http://192.168.0.17:4000'      // 👈 your Mac's LAN IP
    : 'http://localhost:4000';        // simulator / web

export const useBulkUpload = () => {
  const [progress, setProgress] = useState<number | null>(null);

  const pickAndUpload = async () => {
    const { photos } = await Camera.pickImages({ limit: 10, quality: 90 });
    if (!photos?.length) return;

    let done = 0;
    for (const [idx, p] of photos.entries()) {
      const blob = await (await fetch(p.webPath!)).blob();

      const data = new FormData();
      data.append('file', blob, `photo_${idx}.jpg`);

      await fetch(`${HOST}/api/upload`, { method: 'POST', body: data });
      done += 1;
      setProgress(done / photos.length);
    }
    setProgress(null);
  };

  return { progress, pickAndUpload };
}; 