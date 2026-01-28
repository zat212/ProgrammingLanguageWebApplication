import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Kai Zen Learning Platform?",
    answer:
      "Kai Zen is an interactive learning platform designed for students to study programming languages such as Java, Python, JavaScript, C#, React, Spring Boot, and more through tutorials, exercises, and coding challenges.",
  },
  {
    question: "Do I need prior programming experience?",
    answer:
      "No! Our platform starts with beginner-friendly tutorials and gradually progresses to intermediate and advanced concepts. Complete beginners can easily follow.",
  },
  {
    question: "Is the platform free to use?",
    answer:
      "Yes. All beginner modules are free. Advanced courses, certifications, and premium tracks may require an upgrade.",
  },
  {
    question: "Which programming languages do you support?",
    answer:
      "Currently we offer tutorials for Java, JavaScript, Python, React, Node.js, Spring Boot, and SQL. More languages like C#, Kotlin, and TypeScript will be added soon.",
  },
  {
    question: "Can I practice coding directly on the platform?",
    answer:
      "Yes! You can solve interactive challenges, run sample programs, and practice with real-time coding editors.",
  },
  {
    question: "How can I track my learning progress?",
    answer:
      "Your dashboard includes completed lessons, quiz history, progress charts, and learning timeline.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes. You will receive a digital certificate after finishing a full learning path or specialization.",
  },
  {
    question: "Can I use the platform on mobile?",
    answer:
      "Yes! The platform is fully optimized for mobiles, tablets, and desktops.",
  },
  {
    question: "Who can use Kai Zen?",
    answer:
      "Students, self-learners, beginners, and anyone who wants to start or improve programming skills.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen px-6 py-20 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Find answers to the most common questions about Kai Zen.
        </p>

        {/* FAQ Cards */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl p-5 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h2>

                {activeIndex === index ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
