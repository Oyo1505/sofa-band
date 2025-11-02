import { signIn, signOut, useSession } from "@/lib/auth-client";
import { URL_HOME } from "@/lib/routes";
import { useTranslations } from "next-intl";

const ButtonLogin = () => {
  const t = useTranslations("Header");
  const { data: session } = useSession();

  const signInGoole = async () => {
    const data = await signIn.social({
      provider: "google",
      callbackURL: URL_HOME,
    });
    return data;
  };

  return (
    <div>
      {!session ? (
        <button onClick={signInGoole} className="hover:cursor-pointer">
          {t("Signin")}
        </button>
      ) : (
        <button
          onClick={async () => await signOut()}
          className="hover:cursor-pointer"
        >
          {t("Signout")}
        </button>
      )}
    </div>
  );
};

export default ButtonLogin;
