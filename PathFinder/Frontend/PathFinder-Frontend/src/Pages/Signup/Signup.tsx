import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import SignupForm from "./components/SignupForm";

export default function Signup() {
  // may need to add more fields or change fields

  const navigate = useNavigate();
  const signup = async (
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
  ) => {
    try {
      if (password !== repeatPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
        });
        return;
      }
      const response = await axios.post(
        //signup endpoint
        "",
        {
          fName: fName,
          sName: sName,
          email: email,
          password: password,
          institution: institution,
          dob: dob,
          highSchoolSystem: highSchoolSystem,
          highSchoolGrade: highSchoolGrade,
          preferences: preferences,
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
          <SignupForm signup={signup}></SignupForm>
        </div>
      </div>
    </div>
  );
}
