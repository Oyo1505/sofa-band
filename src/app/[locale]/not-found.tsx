import Container from "@/domains/ui/components/container/container";
import { URL_HOME } from "@/lib/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">{t("title")}</h2>
          <p className="text-gray-300 text-lg mb-8">{t("description")}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href={URL_HOME}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
