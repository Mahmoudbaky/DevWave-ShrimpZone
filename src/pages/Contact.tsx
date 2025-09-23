import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { Locate } from "lucide-react";

const Contact = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20 p-10">
        {/* The Right Side : All text */}
        <div className="space-y-6 md:space-y-10 mt-10 md:mt-0 w-full">
          <p className="text-[#FF6868] text-[15px] font-bold uppercase">
            Contact Us{" "}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Get in Touch
          </h2>
          <div className="flex flex-col gap-6  text-[#4A4A4A] font-medium leading-relaxed">
            <div className="flex items-center gap-4">
              <Phone className="text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-primary ">Phone:</span>
                <span className="">+64 958 248 966</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-primary ">Email:</span>
                <span className="">info@shrimpzone.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Locate className="text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-primary ">Address:</span>
                <span className="">123 Shrimp St, Seafood City</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Left Side : The image */}
        <Card className="w-full p-6 space-y-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-sm">
                Name
              </label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-sm">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-medium text-sm"
              >
                Feedback
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your feedback..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Send Feedback
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
