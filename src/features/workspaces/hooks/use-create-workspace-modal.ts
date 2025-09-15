"use client";

import { parseAsBoolean, useQueryState } from 'nuqs';

export const useCreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'create-workspace',
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  );

  // 包一层，避免把 Promise 往外漏
  const open = () => { void setIsOpen(true); };
  const close = () => { void setIsOpen(false); };

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};