import { toast } from "@/components/ui/use-toast";
import AddCollegeAdminForm from "./components/AddCollegeAdminForm";

const AddCollegeAdmin = (props: { user; setUser }) => {
  const addCollegeAdmin = async (
    college_id: string,
    college_admin_email: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost:8000/webapp/add_college_admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            college_id,
            college_admin_email,
          }),
        }
      );

      // handle response
      const content = await response.json();

      if (response.status === 200) {
        toast({
          title: "Success",
          description: content.message,
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: content.error,
        });
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.error || "There was a problem with your login.",
      });
    }
  };

  return props.user && props.user.role === "university_admin" ? (
    <div key="1" className="flex items-center h-full px-4 mt-20 mb-44">
      <div className="w-full max-w-lg mx-auto bg-muted/100 dark:bg-muted/50 border rounded-lg py-12 p-4 dark:border-slate-700">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Add College Admin</h1>
        </div>
        <AddCollegeAdminForm
          user={props.user}
          addCollegeAdmin={addCollegeAdmin}
        ></AddCollegeAdminForm>
      </div>
    </div>
  ) : (
    <div className="m-20">
      <div className="font-bold text-4xl text-center mb-5">UNAUTHORIZED</div>
      <p className="text-center">
        You don't have the right to access this page
      </p>
    </div>
  );
};

export default AddCollegeAdmin;
