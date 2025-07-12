import { useDocumentHead } from "../hooks/useDocumentHead";

const About = () => {
  useDocumentHead("About Me • Nova Dashboard", [
    { name: "description", content: "About me page" },
  ]);

  return <div className="">About</div>;
};

export default About;
