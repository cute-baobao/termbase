"use client";

import { useLanguageSwitch } from "@/lib/hooks/useLanguageSwitch";

export function LanguageSwitcher() {
  const { currentLocale, switchLanguage, availableLocales } = useLanguageSwitch();

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {availableLocales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
      
    </div>
  );
}

// 或者使用按钮版本
export function LanguageButtons() {
  const { currentLocale, switchLanguage, availableLocales } = useLanguageSwitch();

  return (
    <div className="flex gap-2">
      {availableLocales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => switchLanguage(locale.code)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            currentLocale === locale.code
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {locale.name}
        </button>
      ))}
    </div>
  );
}
