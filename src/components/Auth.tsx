import { auth, provider } from "../firebase-config";
import { signInWithPopup, UserCredential } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (isAuth: boolean) => void;
}

export const Auth: React.FC<AuthProps> = ({ setIsAuth }) => {
  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("authToken", result.user.refreshToken, {
        path: "/",
        sameSite: "none",
        secure: true,
      });
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
