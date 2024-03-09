import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        // login endpoint
        "",
        {
          email: email,
          password: password,
        }
      );
      // handle response
      navigate("/");
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

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email?.trim() || !password?.trim()) {
              return;
            }
            await login();
          }}
        >
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>

            <div className="text-center text-sm mt-4">
              <Link className="text-sm underline " to="#">
                Forgot your password?
              </Link>
            </div>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
