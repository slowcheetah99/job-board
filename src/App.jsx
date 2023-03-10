import { Home, Profile, SignIn, SignUp } from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components";
import { ProtectedRoute } from "./auth/Handler";
import { JobProvider } from "./context/JobContext";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <JobProvider>
              <ProtectedRoute />
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
