import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import SocialLinks from "../../components/socialLinks/SocialLinks";

const PublicFooter = () => {
  return (
    <>
      <footer className="text-base-content bg-gray-800">
        <div className="lg:max-w-7xl mx-auto grid lg:grid-cols-12 sm:grid-cols-2 lg:gap-4 text-sm px-4 py-10 text-base-300 lg:space-y-0 space-y-4">
          <div className="lg:col-span-3 col-span-4">
            <h4 className="font-bold mb-">Product</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 col-span-4">
            <h4 className="font-bold mb-">Company</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 col-span-4">
            <h4 className="font-bold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
          <div className="lg:space-y-2 space-y-3 lg:col-span-3 col-span-12">
            <div className="lg:flex items-center justify-between lg:space-y-2 space-y-4">
              <span className="">
                <h4 className="font-bold text-xl lg:mb-0 mb-4">Newsletter</h4>
              </span>
              <span className="">
                <SocialLinks />
              </span>
            </div>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email" />
              <Button variant="primary" className="w-full text-sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="text-center text-md text-base-300 bg-gray-900 p-4">
          &copy; {new Date().getFullYear()} Nova Dashboard. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default PublicFooter;
