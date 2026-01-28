import React, { useEffect } from "react";

const Timeline = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      item.classList.add("animate-fade-in-up");
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
        Programming Journey
      </h2>
      <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        A roadmap from the very first “Hello World” to building real-world
        projects. Follow this path if you're starting your coding adventure.
      </p>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-24">
          {/* Item 1 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-1/2 pr-12"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white border-4 border-white shadow-lg">
                💡
              </div>
            </div>
            <div className="ml-0 md:ml-12 md:w-1/2">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-blue-600">Step 1: Foundation</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Learning the Basics — HTML, CSS, JavaScript
                </h3>
                <p className="text-gray-600 mt-4">
                  Start with the fundamentals. Understand how websites work and
                  build your first static pages. Learn how HTML structures
                  content, CSS styles it, and JavaScript adds interactivity.
                </p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <p className="text-sm font-semibold text-green-600">Step 2: Problem Solving</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Learning a Programming Language — Java or Python
                </h3>
                <p className="text-gray-600 mt-4">
                  Choose one core language (Java, Python, or C++) and master
                  problem-solving with loops, arrays, and conditionals. Practice
                  small exercises daily — logic is everything!
                </p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white border-4 border-white shadow-lg">
                🧠
              </div>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* Item 3 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-1/2 pr-12"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white border-4 border-white shadow-lg">
                ⚙️
              </div>
            </div>
            <div className="ml-0 md:ml-12 md:w-1/2">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                <p className="text-sm font-semibold text-purple-600">Step 3: Building Logic</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Data Structures & Algorithms
                </h3>
                <p className="text-gray-600 mt-4">
                  Learn how to store, manage, and process data efficiently using
                  arrays, lists, stacks, queues, and trees. Platforms like LeetCode
                  and HackerRank are great for daily practice.
                </p>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                <p className="text-sm font-semibold text-yellow-600">Step 4: Backend Development</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Learning Spring Boot / Node.js
                </h3>
                <p className="text-gray-600 mt-4">
                  Once comfortable with a language, move to backend development.
                  Learn how to create REST APIs, connect to databases, and handle
                  authentication using frameworks like Spring Boot or Express.js.
                </p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white border-4 border-white shadow-lg">
                🔧
              </div>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* Item 5 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-1/2 pr-12"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white border-4 border-white shadow-lg">
                🖥️
              </div>
            </div>
            <div className="ml-0 md:ml-12 md:w-1/2">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
                <p className="text-sm font-semibold text-pink-600">Step 5: Frontend Frameworks</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Learning React.js or Vue.js
                </h3>
                <p className="text-gray-600 mt-4">
                  Build dynamic user interfaces with modern frameworks.
                  Understand component architecture, props, and state management.
                  Combine this with your backend to create full-stack apps.
                </p>
              </div>
            </div>
          </div>

          {/* Item 6 */}
          <div className="timeline-item flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="timeline-card bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
                <p className="text-sm font-semibold text-indigo-600">Step 6: Real Projects</p>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  Building and Deploying Your Apps
                </h3>
                <p className="text-gray-600 mt-4">
                  Combine everything you’ve learned to build real-world projects —
                  portfolios, e-commerce apps, or blogs. Learn Git, GitHub, and deploy
                  your project using services like Vercel, Netlify, or AWS.
                </p>
                <button className="mt-4 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-200 transition">
                  Start Building →
                </button>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white border-4 border-white shadow-lg">
                🚀
              </div>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style>
        {`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </section>
  );
};

export default Timeline;
