import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const ProjectAvatar = ({ image, name, className }: ProjectAvatarProps) => {
  return (
    <Avatar className={cn('size-5 rounded-sm', className)}>
      <AvatarFallback className="rounded-sm bg-blue-600 text-sm font-medium text-white uppercase">{name[0]}</AvatarFallback>
    </Avatar>
  );
};
