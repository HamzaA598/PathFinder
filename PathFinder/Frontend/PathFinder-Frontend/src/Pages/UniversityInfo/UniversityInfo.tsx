import { useLocation } from "react-router-dom";
import SideNav from "./components/SideNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const UniversityInfo = () => {
  const { state } = useLocation();
  const university = state;

  const [universityInfo, setUniversityInfo] = useState([]);

  const url = "http://localhost:9000/" + university;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUniversityInfo(data))
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  console.log(universityInfo);

  return (
    <div className="grid grid-cols-4">
      <div className="ml-20">
        <SideNav></SideNav>
      </div>
      <div className="col-span-3 m-8">
        <h1 className="m-8 text-4xl font-bold tracking-tight  md:text-5xl">
          <span className="block">{university}</span>
        </h1>
        <div className="grid gap-8">
          {Object.entries(universityInfo).map(([key, value]) => (
            <Card>
              <CardHeader>
                <CardTitle>{key}</CardTitle>
              </CardHeader>

              <CardContent>{value}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
