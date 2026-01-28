import React from "react";

const Home = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to KaiZen
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Learn programming languages step by step. Build real-world projects and
          level up your coding skills for free.
        </p>
        <a
          href="/lessons"
          className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Start Learning
        </a>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Why Choose KaiZen?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Interactive Tutorials</h3>
            <p>
              Practice coding with hands-on lessons and real-world projects.
            </p>
          </div>
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Learn Any Language</h3>
            <p>
              HTML, CSS, JavaScript, Python, Java and more — all in one platform.
            </p>
          </div>
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
            <p>
              Monitor your learning journey with progress tracking and challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-24 px-4 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">What You'll Gain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Hands-On Experience</h3>
            <p>
              Build real projects while learning core programming concepts.
            </p>
          </div>
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Career-Ready Skills</h3>
            <p>
              Acquire skills that prepare you for jobs in web and software
              development.
            </p>
          </div>
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Community Support</h3>
            <p>
              Join a community of learners to share knowledge and grow together.
            </p>
          </div>
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Free Access</h3>
            <p>
              Learn without any cost — all tutorials and resources are completely
              free.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Coding?
        </h2>
        <p className="mb-8">
          Explore our tutorials and take your first step into programming today.
        </p>
        <a
          href="/lessons"
          className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Browse Lessons
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-900 py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} KaiZen. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
