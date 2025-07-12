import useSiteSettings from "../hooks/useSiteSettings";

const Footer = () => {
  const { settings } = useSiteSettings();
  return (
    <footer className="bg-gray-800 text-gray-300 text-sm text-center py-3">
      © {new Date().getFullYear()} {settings?.footerText}
    </footer>
  );
};

export default Footer;
