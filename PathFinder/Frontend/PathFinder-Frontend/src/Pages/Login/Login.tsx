import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  role: string;
}

const Login = (props: { setUser }) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await fetch("http://localhost:8000/webapp/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      // handle response
      const content = await response.json();

      if (response.status === 200) {
        // decode token and set user
        const token = content.jwt;
        const decodedToken: DecodedToken = jwtDecode(token);
        const user = {
          id: decodedToken.id,
          name: decodedToken.name,
          role: decodedToken.role,
        };
        props.setUser(user);

        toast({
          title: content.message,
          description: response.ok
            ? `Welcome back ${user.name}!`
            : "Please Log in",
        });

        setRedirect(true);
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: content.error,
        });
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.error || "There was a problem with your login.",
      });
    }
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <div key="1" className="flex items-center h-full px-4 mt-20 mb-44">
      <div className="w-full max-w-lg mx-auto bg-muted/100 dark:bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Log in to your account
          </p>
        </div>
        <LoginForm login={login}></LoginForm>
      </div>
    </div>
  );
};

export default Login;
