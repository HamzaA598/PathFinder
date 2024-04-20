import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignupProps {
  signup: (
    fName: string,
    sName: string,
    email: string,
    password: string,
    repeatPassword: string,
    institution: string,
    dob: string
  ) => void;
}

function SignupForm({ signup }: SignupProps) {
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [dob, setDob] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (
          !email?.trim() ||
          !password?.trim() ||
          !fName?.trim() ||
          !sName?.trim() ||
          !repeatPassword?.trim() ||
          !institution?.trim() ||
          !dob?.trim()
        ) {
          return;
        }
        await signup(
          fName,
          sName,
          email,
          password,
          repeatPassword,
          institution,
          dob
        );
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
        <div className="space-y-2">
          <Label htmlFor="repeat-password">Repeat Password</Label>
          <Input
            id="repeat-password"
            required
            type="password"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            placeholder="Your School, University or Company"
            onChange={(e) => {
              setInstitution(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            placeholder="YYYY-MM-DD"
            required
            type="date"
            onChange={(e) => {
              setDob(e.target.value);
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
  );
}

export default SignupForm;
