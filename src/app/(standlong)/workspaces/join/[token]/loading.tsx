import { Loader } from 'lucide-react';

export default function JoinWorkspaceLoading() {
  return (
    <div className="flex h-96 w-full items-center justify-center lg:max-w-xl">
      <Loader className="size-12" />
    </div>
  );
}
