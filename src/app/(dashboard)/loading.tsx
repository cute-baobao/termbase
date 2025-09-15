import { Loader } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="text-foreground-muted size-5 text-neutral-500" />
    </div>
  );
}
