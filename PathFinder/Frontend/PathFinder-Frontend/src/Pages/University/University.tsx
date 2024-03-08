import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const University = () => {
  const [uni] = useState([
    { name: "Cairo University", id: 1 },
    { name: "Ain Shams University", id: 2 },
    { name: "Helwan University", id: 3 },
    { name: "American University in Cairo", id: 4 },
  ]);

  return (
    <div className="container py-8 sm:py-8 space-y-8  university">
      <Input placeholder="search" />
      {uni.map((university) => (
        <Button
          className="m-5 p-7 pe-8 hover:bg-emerald-600 object-center content-center"
          variant="secondary"
        >
          {university.name}
        </Button>
      ))}
    </div>
  );
};

export default University;
