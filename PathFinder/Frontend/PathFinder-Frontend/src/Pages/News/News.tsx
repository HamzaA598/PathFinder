import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  university: string;
  date: string;
  description: string;
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          "http://localhost:8000/webapp/Announcement"
        );
        setNewsItems(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    // Replace with actual logic to determine admin status
    // const fetchAdminStatus = async () => {
    //   const adminResponse = await axios.get(
    //     "http://localhost:8000/webapp/checkAdminStatus"
    //   );
    //   setIsAdmin(adminResponse.data.isAdmin);
    // };

    // fetchAdminStatus();
    fetchNews();
  }, []);

  // const handleEdit = (index: number) => {
  //   console.log(`Editing news item at index: ${index}`);
  //   // Implement the edit logic here
  // };

  // const handleDelete = (index: number) => {
  //   console.log(`Deleting news item at index: ${index}`);
  //   // Implement the delete logic here
  // };

  return (
    <div className="News_page w-[1300px]">
      <Card className="ml-64 h-screen items-center justify-center">
        <CardHeader>
          <CardTitle>News Page</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isAdmin && <Button className="mb-4">Add News</Button>}{" "}
          {newsItems.map((news_item, index) => (
            <div
              key={index}
              className="mb-6 grid grid-cols-[25px_1fr] items-start pb-6 last:mb-0 last:pb-0 border-b border-gray-200"
            >
              <span className="flex h-3 w-3 translate-y-1 rounded-full bg-emerald-700" />
              <div className="space-y-2 pl-4">
                <p className="text-lg font-semibold">{news_item.university}</p>
                <p className="text-base font-medium">{news_item.date}</p>
                <p className="text-sm">{news_item.description}</p>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(index)}
                      className="edit-button"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      className="delete-button"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default News;
