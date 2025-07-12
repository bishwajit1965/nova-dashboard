// src/components/home/FaqSection.jsx

import { ChevronDown, ChevronUp } from "lucide-react";

import { useState } from "react";

const faqs = [
  {
    question: "What is Nova Dashboard?",
    answer:
      "Nova Dashboard is a full‑stack admin starter: user auth (email, Google, Facebook), role‑permission management, plan / subscription tiers, audit logging, and a polished UI—all in one code‑base.",
  },
  {
    question: "Is Nova free to use?",
    answer:
      "The core code is MIT‑licensed and free for personal and commercial projects. Paid support & premium boilerplates are optional‑extras—no lock‑in.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Absolutely. From the dashboard’s Plan card, click “Change Plan,” pick a new tier, and your features update instantly. No hidden fees or waiting period.",
  },
  {
    question: "How does role & permission control work?",
    answer:
      "Admins create Roles (e.g. “Editor”) and assign fine‑grained Permissions (create_post, manage_inbox). Users inherit those permissions via roles—simple and scalable.",
  },
  {
    question: "Is dark‑mode supported out of the box?",
    answer:
      "Yes. Nova ships with a theme switcher that remembers the user’s preference, plus Tailwind‑based color tokens for easy brand customization.",
  },
  {
    question: "Can I host Nova on my own server?",
    answer:
      "Definitely. It’s just a Node.js + MongoDB stack. Deploy to Render, Vercel, DigitalOcean, or any VM/Docker host. A one‑click Heroku deploy script is included.",
  },
  {
    question: "Do you store my Google / Facebook credentials?",
    answer:
      "No—OAuth tokens are exchanged server‑to‑server, and only a hashed user ID is saved. Nova never stores social log‑in passwords.",
  },
  {
    question: "How do I enable e‑mail templates or transactional e‑mails?",
    answer:
      "Plug in any SMTP provider (SendGrid, Mailgun, SES) by adding your API keys to `.env` and the MailService class. Pre‑built HTML templates live under `/emails`.",
  },
  {
    question: "Where can I get help or report a bug?",
    answer:
      "Open a GitHub issue or drop us a line at support@nova‑dashboard.dev. Paid support plans guarantee 24‑hour response.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="lg:max-w-7xl bg-base-200 mx-auto lg:py-16 py-4 lg:px-4 px-2 relative bg-fixed bg-center bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: "url('/assets/pexels-googledeepmind-17485657.jpg')",
      }}
    >
      <div className="bg-base-300 lg:p-8 space-y-4 lg:max-w-full lg:mx-12 mx-auto mb-4 rounded-lg">
        <h2 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-2 lg:max-w-full lg:px-12 mx-auto">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-lg p-4 transition-all duration-300 bg-white dark:bg-gray-900"
          >
            <button
              onClick={() => toggle(i)}
              className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 dark:text-gray-100"
            >
              <span>{faq.question}</span>
              {openIndex === i ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === i && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    // <section className="lg:p-10 p-2 bg-base-200 text-base-content rounded-md">
    //   <div className="max-w-4xl mx-auto px- text-center">
    //     <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
    //     <div className="space-y-4 text-left">
    //       {faqs.map((faq, idx) => (
    //         <div
    //           key={idx}
    //           className="border border-base-300 rounded-xl p-4 bg-base-200 shadow-sm"
    //         >
    //           <button
    //             onClick={() => toggle(idx)}
    //             className="w-full flex justify-between items-center text-lg font-medium"
    //           >
    //             {faq.question}
    //             <ChevronsDown
    //               className={`transition-transform ${
    //                 openIndex === idx ? "rotate-180" : ""
    //               }`}
    //             />
    //           </button>
    //           <AnimatePresence>
    //             {openIndex === idx && (
    //               <motion.div
    //                 initial={{ opacity: 0, height: 0 }}
    //                 animate={{ opacity: 1, height: "auto" }}
    //                 exit={{ opacity: 0, height: 0 }}
    //                 transition={{ duration: 0.25 }}
    //                 className="mt-2 text-sm text-muted-foreground"
    //               >
    //                 {faq.answer}
    //               </motion.div>
    //             )}
    //           </AnimatePresence>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default FaqSection;
