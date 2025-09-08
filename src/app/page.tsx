import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from "next-intl/server";
export default async function Home() {
  const t = await getTranslations("IndexPage");
  return (
    <div>
      {t("title")} <LanguageSwitcher />
    </div>
  );
}
