import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  login: (email: string, password: string) => void;
}
function LoginForn({ login }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email?.trim() || !password?.trim()) {
          return;
        }
        await login(email, password);
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
      <div className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <Link className="underline" to="/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default LoginForn;
