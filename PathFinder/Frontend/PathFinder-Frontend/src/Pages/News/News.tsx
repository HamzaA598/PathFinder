import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const customScrollbarStyles = `
  /* WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 12px; /* Adjust the width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background color of the scrollbar track */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4caf50; /* Scrollbar color to match your theme */
    border-radius: 10px;
    border: 3px solid #f1f1f1; /* Adjust border size and color */
  }

  /* Firefox */
  * {
    scrollbar-width: thin; /* Scrollbar width */
    scrollbar-color: #4caf50 #f1f1f1; /* Scrollbar color and background color */
  }
`;

interface NewsItem {
  university: string;
  college: string;
  title: string;
  description: string;
}

const News = ({ user }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState<string>("");

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

    fetchNews();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "university_admin") {
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  //handleEdit function awaiting api endpoint to edit

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="News_page w-[1300px]">
      <style>{customScrollbarStyles}</style>
      <Card className="ml-64 h-screen items-center justify-center">
        <CardHeader>
          <CardTitle>News Page</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto max-h-[75vh] grid gap-4">
          <Input
            onChange={handleSearchChange}
            value={search}
            placeholder="Search"
          />
          {newsItems
            .filter((NewsItem) => {
              return search.toLowerCase() === ""
                ? NewsItem
                : NewsItem.university
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
            .map((news_item, index) => (
              <div
                key={index}
                className="mb-6 grid grid-cols-[25px_1fr] items-start pb-6 last:mb-0 last:pb-0 border-b border-gray-200"
              >
                <span className="flex h-3 w-3 translate-y-1 rounded-full bg-emerald-700" />
                <div className="space-y-2 pl-4">
                  <p className="text-lg font-semibold">
                    {news_item.university}
                  </p>
                  <p className="text-base font-medium">{news_item.college}</p>
                  <p className="text-base font-medium">{news_item.title}</p>
                  <p className="text-sm">{news_item.description}</p>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(index)}
                        className="edit-button"
                      >
                        Edit
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
