import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import LoginForm from "./components/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        // login endpoint
        "http://localhost:8000/webapp/login",
        {
          email: email,
          password: password,
        }
      );
      // handle response
      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your Login.",
      });
    }
  };

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
}
