import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface WorkSpacesAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const WorkSpacesAvatar = ({ image, name, className }: WorkSpacesAvatarProps) => {
  if (image) {
    return (
      <div className={cn('relative size-8 overflow-hidden rounded-md', className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn('size-8 rounded-md', className)}>
      <AvatarFallback className="bg-blue-600 text-lg font-medium text-white uppercase rounded-md">{name[0]}</AvatarFallback>
    </Avatar>
  );
};
