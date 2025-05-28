import { usePhotoPermission } from '@/hooks/usePhotoPermission';

interface Props { onGranted?: () => void }

export default function AllowAccessButton({ onGranted }: Props) {
  const { status, ask } = usePhotoPermission();

  const click = async () => {
    const r = await ask();
    if (r === 'granted') {
      onGranted?.();                 // let ChatView drive the rest
    }
  };

  return (
    <button
      onClick={click}
      disabled={status === 'checking'}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
    >
      {status === 'checking' ? 'Checking...' : 'Allow Access'}
    </button>
  );
} 