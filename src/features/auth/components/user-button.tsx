"use client";
import { Button } from '@/components/ui/button';
import { useUserStore } from '../store/use-user-store';

const UserButton = () => {
  const { clearUser } = useUserStore();
  return <Button onClick={clearUser}>logOut</Button>;
};

export { UserButton };