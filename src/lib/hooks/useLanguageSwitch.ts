"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function useLanguageSwitch() {
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLanguage = async (newLocale: string) => {
    try {
      // 设置 cookie
      await fetch("/api/locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: newLocale }),
      });

      // 刷新页面以应用新的语言设置
      router.refresh();
    } catch (error) {
      console.error("Failed to switch language:", error);
    }
  };

  return {
    currentLocale,
    switchLanguage,
    availableLocales: [
      { code: "zh-CN", name: "中文" },
      { code: "en-US", name: "English" },
    ],
  };
}
