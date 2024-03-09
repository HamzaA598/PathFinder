import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export default function Signup() {
  // may need to add more fields or change fields
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const response = await axios.post(
        //signup endpoint
        "",
        {
          fName: fName,
          sName: sName,
          email: email,
          password: password,
        }
      );
      // handle response
      navigate("/login");
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your Sign up.",
      });
    }
  };
  return (
    <div key="1" className="flex items-center h-full px-4 mt-20 mb-44">
      <div className="w-full max-w-lg mx-auto bg-muted/100 dark:bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign up for an account
            </p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                !email?.trim() ||
                !password?.trim() ||
                !fName?.trim() ||
                !sName?.trim()
              ) {
                return;
              }
              await signup();
            }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    required
                    onChange={(e) => {
                      setFName(e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    required
                    onChange={(e) => {
                      setSName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
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
                Sign Up
              </Button>
              <Separator className="my-8" />
              <div className="mt-4 text-center text-sm">
                Already have an account?
                <Link className="underline" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
