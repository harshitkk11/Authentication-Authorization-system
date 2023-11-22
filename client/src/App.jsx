import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("./components/Home"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const Reset = lazy(() => import("./components/Reset"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Welcome = lazy(() => import("./components/Welcome"));
const SentMail = lazy(() => import("./components/SentMail"));
const VerifyMail = lazy(() => import("./components/VerifyMail"));
const ResetPass = lazy(() => import("./components/ResetPass"));

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  const user = localStorage.getItem("user");
  const verify = localStorage.getItem("verify");
  const reset = localStorage.getItem("reset");

  useEffect(() => {
    let interval = setInterval(() => {
      localStorage.removeItem("verify");
      localStorage.removeItem("reset");
    }, 1000 * 300);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense>
                <Signup />
              </Suspense>
            }
          />
          {verify === "true" && (
            <>
              <Route
                path="/sentmail"
                element={
                  <Suspense>
                    <SentMail />
                  </Suspense>
                }
              />
              <Route
                path="/verifymail"
                element={
                  <Suspense>
                    <VerifyMail />
                  </Suspense>
                }
              />
            </>
          )}
          {reset && (
            <Route
              path="/resetpass"
              element={
                <Suspense>
                  <ResetPass />
                </Suspense>
              }
            />
          )}
          <Route
            path="/reset"
            element={
              <Suspense>
                <Reset />
              </Suspense>
            }
          />
          {user === "true" && (
            <Route
              path="/user"
              element={
                <Suspense>
                  <Welcome />
                </Suspense>
              }
            />
          )}
          <Route
            path="*"
            element={
              <Suspense>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
