import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div key="1" className="flex items-center h-full px-4 mt-20 mb-44">
      <div className="w-full max-w-lg mx-auto  bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Log in to your account
          </p>
        </div>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>

          <Button className="w-full">Login</Button>

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
      </div>
    </div>
  );
}
