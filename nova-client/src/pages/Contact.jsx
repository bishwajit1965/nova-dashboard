import { useDocumentHead } from "../hooks/useDocumentHead";

const Contact = () => {
  useDocumentHead("Contact Me • Nova Dashboard", [
    { name: "description", content: "Contact me page" },
  ]);
  return <div className="">Contact</div>;
};

export default Contact;
