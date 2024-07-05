import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { toast } from "./ui/use-toast";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/chat",
    label: "Chatbot",
  },
  {
    href: "/University",
    label: "Universities",
  },
  {
    href: "/Compare",
    label: "Compare",
  },
  {
    href: "/News",
    label: "News page",
  },
];

export const Navbar = (props: { user; setUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logout = async () => {
    const response = await fetch("http://localhost:8000/webapp/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await response.json();

    props.setUser(null);

    toast({
      title: content.message,
      description: "sad to see you leave",
    });
  };

  const mobile_dynamic_buttons = (
    <>
      {props.user ? (
        <Link
          to="/login"
          className={`border ${buttonVariants({ variant: "secondary" })}`}
          onClick={logout}
        >
          Log out
        </Link>
      ) : (
        <>
          <Link
            to="/login"
            className={`border ${buttonVariants({ variant: "secondary" })}`}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className={`border ${buttonVariants({ variant: "secondary" })}`}
          >
            Sign up
          </Link>
        </>
      )}
      <ModeToggle />
    </>
  );

  const desktop_dynamic_buttons = props.user ? (
    <div className="hidden md:flex gap-2">
      <Link
        to="/login"
        className={`border ${buttonVariants({ variant: "secondary" })}`}
        onClick={logout}
      >
        Log out
      </Link>

      <ModeToggle />
    </div>
  ) : (
    <div className="hidden md:flex gap-2">
      <Link
        to="/login"
        className={`border ${buttonVariants({ variant: "secondary" })}`}
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className={`border ${buttonVariants({ variant: "secondary" })}`}
      >
        Sign up
      </Link>

      <ModeToggle />
    </div>
  );

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link to="/" className="ml-2 font-bold text-xl flex">
              <LogoIcon />
              PathFinder
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    PathFinder
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}

                  {mobile_dynamic_buttons}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                to={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {desktop_dynamic_buttons}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
