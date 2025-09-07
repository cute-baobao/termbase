"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? t("AuthPage.sign-up") : t("AuthPage.sign-in")}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
