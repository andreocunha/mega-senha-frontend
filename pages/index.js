import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";

export default function Home() {
  const { isLoggedIn } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    if (isLoggedIn) {
      router.push('/match');
    }
  }, []);

  return (
      <></>
  );

}
