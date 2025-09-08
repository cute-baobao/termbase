import { client } from '@/lib/utils/rpc';
import { User } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserWithoutPassword = Omit<User, 'password'>;
type UserStoreState = {
  user: UserWithoutPassword | null;
  setUser: (user: UserWithoutPassword) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserWithoutPassword) => set({ user }),
      clearUser: () => {
        // 调用登出接口
        client.api.auth.logOut.$post();
        return set({ user: null });
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);

export { useUserStore };
