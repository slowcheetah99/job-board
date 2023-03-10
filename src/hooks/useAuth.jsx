import { useState, useEffect } from "react";
import { initFirebase } from "../firebase";

export function useAuth() {
  const { auth, createUserProfile } = initFirebase();
  const [user, setUser] = useState(localStorage.getItem("AUTH_USER"));
  const [data, setData] = useState({
    username: "",
    type: "",
    email: "",
    image: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  const initialState = {
    user,
    setUser,
    data,
    setData,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      createUserProfile(user, data);
    }
  }, [user, data]);

  return initialState;
}
