import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SignupProps {
  signup: (
    fName: string,
    sName: string,
    email: string,
    password: string,
    repeatPassword: string,
    dob: string,
    highSchoolSystem: string,
    governorate: string
  ) => void;
}

function SignupForm({ signup }: SignupProps) {
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [dob, setDob] = useState(null);
  const [highSchoolSystem, setHighSchoolSystem] = useState("");
  const [governorate, setGovernorate] = useState("");

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
          !dob ||
          !highSchoolSystem.trim() ||
          !governorate?.trim()
        ) {
          return;
        }
        await signup(
          fName,
          sName,
          email,
          password,
          repeatPassword,
          dob,
          highSchoolSystem,
          governorate
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
          <Label htmlFor="dob" className="block">
            Date of Birth
          </Label>
          <DatePicker
            id="dob"
            required
            selected={dob}
            onChange={setDob}
            dateFormat="dd/MM/yy"
            placeholderText="dd/MM/yy"
            isClearable
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700 "
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
          <Label htmlFor="governorate">Governorate</Label>
          <select
            id="governorate"
            required
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700"
          >
            <option value="">Select your governorate</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Aswan">Aswan</option>
            <option value="Asyut">Asyut</option>
            <option value="Beheira">Beheira</option>
            <option value="Beni Suef">Beni Suef</option>
            <option value="Cairo">Cairo</option>
            <option value="Dakahlia">Dakahlia</option>
            <option value="Damietta">Damietta</option>
            <option value="Faiyum">Faiyum</option>
            <option value="Gharbia">Gharbia</option>
            <option value="Giza">Giza</option>
            <option value="Helwan">Helwan</option>
            <option value="Ismailia">Ismailia</option>
            <option value="Kafr El Sheikh">Kafr El Sheikh</option>
            <option value="Luxor">Luxor</option>
            <option value="Matrouh">Matrouh</option>
            <option value="Minya">Minya</option>
            <option value="Menofia">Monufia</option>
            <option value="New Valley">New Valley</option>
            <option value="North Sinai">North Sinai</option>
            <option value="Port Said">Port Said</option>
            <option value="Qalyubia">Qalyubia</option>
            <option value="Qena">Qena</option>
            <option value="Red Sea">Red Sea</option>
            <option value="Sharqia">Sharqia</option>
            <option value="Sohag">Sohag</option>
            <option value="South Sinai">South Sinai</option>
            <option value="Suez">Suez</option>
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
