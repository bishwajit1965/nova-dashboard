import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      icon: <FaFacebook />,
      name: "facebook",
      connect: "https://www.facebook.com",
    },
    {
      id: 2,
      icon: <FaTwitter />,
      name: "twitter",
      connect: "https://www.twitter.com",
    },
    {
      id: 3,
      icon: <FaGoogle />,
      name: "google",
      connect: "https://www.google.com",
    },
    {
      id: 4,
      icon: <FaGithub />,
      name: "gitHub",
      connect: "https://www.github.com",
    },
    {
      id: 5,
      icon: <FaLinkedin />,
      name: "linkedIn",
      connect: "https://www.linkedin.com",
    },
  ];
  return (
    <div className="lg:flex grid lg:grid-cols-1 grid-cols-6 lg:gap-2 gap-3 items-center lg:space-x-2 space-x-2">
      {links?.map((l) => (
        <Link to={l.connect} key={l.id} className="flex items-center space-x-1">
          <span className="text-xl">{l.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
