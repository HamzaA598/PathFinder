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
    dob: string,
    highSchoolSystem: string,
    highSchoolGrade: number,
    preferences: string
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
  const [highSchoolSystem, setHighSchoolSystem] = useState("");
  const [highSchoolGrade, setHighSchoolGrade] = useState(0);
  const [preferences, setPreferences] = useState("");

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
          !dob?.trim() ||
          !highSchoolSystem.trim() ||
          highSchoolGrade <= 0 ||
          !preferences.trim()
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
          dob,
          highSchoolSystem,
          highSchoolGrade,
          preferences
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
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            placeholder="DD-MM-YYYY"
            required
            type="date"
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="highSchoolSystem">High School System</Label>
          <select
            id="highSchoolSystem"
            required
            value={highSchoolSystem}
            onChange={(e) => setHighSchoolSystem(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700"
          >
            <option value="">Select your high school system</option>
            <option value="Thanawya Amma">Thanawya Amma</option>
            <option value="STEM">STEM</option>
            <option value="American">American</option>
            <option value="IG">IG</option>
          </select>
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
          <Label htmlFor="highSchoolGrade">High School Grade</Label>
          <div className="flex items-center">
            {" "}
            <Input
              id="highSchoolGrade"
              type="number"
              placeholder="Your high school grade in percentage"
              required
              min={0}
              max={100}
              onChange={(e) => setHighSchoolGrade(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="ml-2">%</span>{" "}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferences">College Preferences</Label>
          <select
            id="preferences"
            required
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700" // Black background in dark mode
          >
            {/* todo: need to add all majors */}
            <option value="">Select a college preference</option>
            <option value="Engineering">Engineering</option>
            <option value="Medicine">Medicine</option>
            <option value="Law">Law</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>
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
