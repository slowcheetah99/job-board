import { SignIn, SignUp, Home, Profile } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components";
import { IsUserRedirect, ProtectedRoute } from "./auth/Handler";
import { useState, useEffect } from "react";
import { initFirebase } from "./firebase";
import { JobProvider } from "./context/JobContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    username: "",
    type: "",
    email: "",
    image: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const { auth, createUserProfile } = initFirebase();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        createUserProfile(authUser, data);
        setUser(authUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/signin"
          element={<IsUserRedirect user={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={
            <IsUserRedirect
              user={user}
              setUser={setUser}
              data={data}
              setData={setData}
            />
          }
        />
        <Route
          element={
            <JobProvider>
              <ProtectedRoute user={user} />
            </JobProvider>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}
