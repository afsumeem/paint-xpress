import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { useRouter } from "next/router";

const usePrivateRoute = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return loading;
};

export default usePrivateRoute;
