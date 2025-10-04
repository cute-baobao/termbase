'use client';

import { parseAsBoolean, useQueryState } from 'nuqs';

export const useCreateProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'create-project',
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  );

  // 包一层，避免把 Promise 往外漏
  const open = () => {
    void setIsOpen(true);
  };
  const close = () => {
    void setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
