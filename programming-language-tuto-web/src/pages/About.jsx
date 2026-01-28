import React from "react";

export default function About() {
  return (
    <div className="text-center">
      <div className="bg-white">
        {/* Header */}
        <header className="bg-black text-white text-center py-12">
          <h1 className="text-4xl font-bold mt-16">About Kai Zen</h1>
        </header>

        {/* Mission */}
        <section className="text-center py-12 px-4">
          <h2 className="text-2xl font-bold">Our Mission and Values</h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            At Kai Zen, our mission is to make programming education accessible,
            practical, and engaging for everyone — from beginners to advanced developers.
          </p>

          <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
            {["100% Free Access", "Hands-On Projects"].map((item, index) => (
              <div key={index} className="transition transform hover:scale-110">
                <h3 className="text-xl font-bold">{item.split(" ")[0]}</h3>
                <p className="text-gray-700">
                  {item.split(" ").slice(1).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="bg-black text-white py-12 px-4 text-center">
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Empower learners worldwide by providing a platform where anyone can
            learn programming languages, build real-world projects, and advance their careers.
          </p>
        </section>

        {/* What You'll Learn */}
        <section className="text-center py-12 px-4">
          <h2 className="text-2xl font-bold">What You'll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {["HTML & CSS", "JavaScript", "Python", "Java"].map((topic, index) => (
              <div
                key={index}
                className="p-4 shadow-lg rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <h3 className="text-xl font-bold">{topic}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="bg-gray-100 py-12 px-4">
          <h2 className="text-2xl font-bold text-center">
            Learning Tools We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
            {[
              "Interactive Coding Challenges",
              "Video Tutorials",
              "Code Playground",
              "Progress Tracker",
            ].map((tool, index) => (
              <div
                key={index}
                className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold">{tool}</h3>
                <p className="text-gray-700 mt-2">
                  Designed to help you learn programming efficiently and effectively.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="bg-black text-white text-center py-12 px-4">
          <h2 className="text-2xl font-bold">Learner Feedback</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
            {[
              "Kai Zen helped me understand coding from scratch!",
              "I built my first web app thanks to the hands-on tutorials!",
              "The platform is engaging and easy to follow.",
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-4 shadow-lg rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                <p>{testimonial}</p>
                <h3 className="mt-4 font-bold">
                  - Learner {String.fromCharCode(65 + index)}
                </h3>
              </div>
            ))}
          </div>
        </section> */}

        {/* FAQ */}
        <section className="text-center py-12 px-4 w-full">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          <div className="mt-8">
            {[
              "Is this platform free?",
              "Do I need prior programming experience?",
              "Can I build real projects using Kai Zen?",
            ].map((question, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4"
              >
                <h3 className="text-xl font-bold">{question}</h3>
                <p className="mt-2 text-gray-700">
                  Yes! Our courses are designed for beginners and advanced learners,
                  with practical projects for real-world experience.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-8">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved. Made with ❤️ by Kai Zen
          </p>
        </footer>
      </div>
    </div>
  );
}
