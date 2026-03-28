import { Link } from "react-router-dom";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import SocialLinks from "../../components/socialLinks/SocialLinks";

const PublicFooter = ({ siteSettings }) => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="lg:max-w-7xl mx-auto grid lg:grid-cols-12 sm:grid-cols-2 gap-6 px-4 py-10 text-sm">
        {/* Product */}
        <div className="lg:col-span-3">
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400">Features</span>
            </li>
            <li>
              <span className="text-gray-400">Pricing</span>
            </li>
            <li>
              <span className="text-gray-400">Documentation</span>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-3">
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <span className="text-gray-400">Blog</span>
            </li>
            <li>
              <span className="text-gray-400">Careers</span>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-3">
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400">Privacy</span>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <span className="text-gray-400">Security</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-semibold">Follow Us & Stay Updated</h4>
          <SocialLinks />
          <p className="text-gray-400 text-xs">
            Get updates about new features and improvements.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm bg-base-200 text-base-content lg:p-4 p-2 border-t border-base-300">
        © {new Date().getFullYear()}{" "}
        {siteSettings?.footerText || "Nova Dashboard. All rights reserved."}
      </div>
    </footer>
  );
};

export default PublicFooter;
