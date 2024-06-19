import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  login: (email: string, password: string, role: string) => void;
}
function LoginForm({ login }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email?.trim() || !password?.trim() || !role?.trim()) {
      return;
    }
    await login(email, password, role);
  };

  return (
    <form onSubmit={submit}>
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

        <div className="space-y-2">
          <Label htmlFor="role">Log in as</Label>
          <select
            id="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700"
          >
            <option value="">Select a role</option>
            <option value="Student">Student</option>
            <option value="University Admin">University Admin</option>
            <option value="College Admin">College Admin</option>
          </select>
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

export default LoginForm;
