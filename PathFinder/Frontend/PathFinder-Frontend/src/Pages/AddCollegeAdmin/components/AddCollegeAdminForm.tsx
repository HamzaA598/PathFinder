import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

interface College {
  _id: string;
  name: string;
}
interface addCollegeAdminProbs {
  user;
  addCollegeAdmin: (college_id: string, college_admin_email: string) => void;
}

function AddCollegeAdminForm({ user, addCollegeAdmin }: addCollegeAdminProbs) {
  const uniOfAdminEffectRan = useRef(false);
  const collegesOfUniversityEffectRan = useRef(false);
  const [uniId, setUniId] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [collegeId, setCollegeId] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeAdminEmail, setCollegeAdminEmail] = useState("");

  useEffect(() => {
    if (uniOfAdminEffectRan.current) return;
    console.log(user.id);

    (async () => {
      const response = await fetch(
        `http://localhost:8000/webapp/get_university_of_admin/${user.id}`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();
      setUniId(content.uniId);
    })();

    uniOfAdminEffectRan.current = true;
  }, [user.id]);

  useEffect(() => {
    if (collegesOfUniversityEffectRan.current) return;
    if (!uniId) return;

    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/webapp/University/College/${uniId}`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();
      setColleges(content);
    })();

    collegesOfUniversityEffectRan.current = true;
  }, [uniId]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!collegeId?.trim() || !collegeAdminEmail?.trim()) {
      return;
    }
    await addCollegeAdmin(collegeId, collegeAdminEmail);
  };

  const handleOnChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedCollegeName = selectedOption.text;
    const selectedCollegeId = selectedOption.value;

    setCollegeName(selectedCollegeName);
    setCollegeId(selectedCollegeId);
  };

  return (
    <form onSubmit={submit}>
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="college_name">College Name</Label>
          <select
            id="college_name"
            required
            value={collegeId}
            onChange={handleOnChange}
            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-black dark:bg-black dark:text-gray-200 dark:border-gray-700"
          >
            <option value="">Select a College</option>
            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">College Admin Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            onChange={(e) => {
              setCollegeAdminEmail(e.target.value);
            }}
          />
        </div>

        <Button className="w-full" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

export default AddCollegeAdminForm;
