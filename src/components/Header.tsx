import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const nav = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header className="container mx-auto px-4 md:px-0 my-5 text-white flex justify-between items-center">
      <div className="w-[177px] h-[48px]">
        <img src="/images/logo.png" alt="logo" width={100} />
      </div>
      <div className="hidden md:flex gap-10 text-black/60 text-lg font-semibold">
        {nav.map((item) => (
          <a
            href={item.href}
            className="hover:text-primary transform hover:scale-105 transition"
            key={item.name}
          >
            {item.name}
          </a>
        ))}
      </div>
      <Button
        onClick={() => navigate("/login")}
        className="rounded-full cursor-pointer bg-primary px-6 py-5 text-white font-bold hover:scale-105 transform transition"
      >
        Sign In
      </Button>
    </header>
  );
};

export default Header;
