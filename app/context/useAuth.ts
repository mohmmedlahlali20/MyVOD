import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


export function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);


  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken && !token) {
          router.push("/login");
          return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [token]);

  return { loading, user };
}
