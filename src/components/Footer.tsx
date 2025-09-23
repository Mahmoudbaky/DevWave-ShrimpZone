import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { BsTiktok } from "react-icons/bs";
import { Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="container mx-auto bg-white pt-10  border-gray-200 mt-10">
      <div className="flex flex-wrap justify-between items-start max-w-[1200px] mx-auto px-6 gap-8">
        {/* Logo & Description */}
        <div className="flex-1 min-w-[200px]">
          <div className="mb-7 w-[177px] h-[48px]">
            <img src="/images/logo.png" alt="logo" width={100} />
          </div>
          <div className="text-gray-700 text-[15px] leading-relaxed">
            Savor the artistry where
            <br />
            every dish is a culinary
            <br />
            masterpiece
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex-1 min-w-[140px]">
          <div className="font-bold mb-3">Useful links</div>
          <ul className="list-none p-0 m-0 text-gray-700 text-[15px] leading-8">
            <li>About us</li>
            <li>Events</li>
            <li>Blogs</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Main Menu */}
        <div className="flex-1 min-w-[140px]">
          <div className="font-bold mb-3">Main Menu</div>
          <ul className="list-none p-0 m-0 text-gray-700 text-[15px] leading-8">
            <li>Home</li>
            <li>Offers</li>
            <li>Menus</li>
            <li>Reservation</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-3">Contact Us</div>
          <ul className="list-none p-0 m-0 text-gray-700 text-[15px] leading-8">
            <li>example@email.com</li>
            <li>+64 958 248 966</li>
            <li>Social media</li>
          </ul>
        </div>
      </div>

      {/* Social Icons & Copyright */}
      <div className="flex flex-wrap justify-between items-center max-w-[1200px] mx-auto mt-6 mb-6 px-6 gap-8">
        <div className="flex gap-5 mb-3">
          {/* Facebook */}
          <a
            href="#"
            className="bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center"
          >
            <Facebook className="text-primary" />
          </a>
          {/* Instagram */}
          <a
            href="#"
            className="bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center"
          >
            <Instagram className="text-primary" />
          </a>
          {/* Twitter */}
          <a
            href="#"
            className="bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center"
          >
            <BsTiktok className="text-primary" />
          </a>
          {/* YouTube */}
          <a
            href="#"
            className="bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center"
          >
            <Youtube className="text-primary" />
          </a>
        </div>
        <div className="text-gray-700 text-sm text-center">
          Copyright &copy; 2023 Dscode | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
