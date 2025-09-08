import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from "next-intl/server";
import { UserButton } from "@/features/auth/components/user-button";

export default async function Home() {
  const t = await getTranslations("IndexPage");
  return (
    <div>
      {t("title")} <LanguageSwitcher /><UserButton />
    </div>
  );
}
