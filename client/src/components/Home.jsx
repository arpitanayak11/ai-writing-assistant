import React, { useState } from "react";
import { FaPencilAlt, FaSpellCheck, FaSyncAlt } from "react-icons/fa";
import ai from "../images/ai.png";

const Home = () => {
  const [text, setText] = useState("");
  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");
  const [rephrasedText, setRephrasedText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Spell Check
  const handleSpellCheck = async () => {
    if (!text.trim()) return alert("Please enter some text first!");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/spellcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSpellCheckedText(data.result?.replace(/^"|"$/g, "") || "Spell check failed.");
    } catch {
      setSpellCheckedText("Spell check failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Grammar Check
  const handleGrammarCheck = async () => {
    if (!text.trim()) return alert("Please enter some text first!");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/grammarcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setGrammarCheckedText(data.result?.replace(/^"|"$/g, "") || "Grammar check failed.");
    } catch {
      setGrammarCheckedText("Grammar check failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Rephrase Text
  const handleRephrase = async () => {
    if (!text.trim()) return alert("Please enter some text first!");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: text }),
      });
      const data = await res.json();
      setRephrasedText(
        data.result?.replace(/^"|"$/g, "") ||
          (Array.isArray(data.result) ? data.result.join(" ") : "Rephrase failed.")
      );
    } catch {
      setRephrasedText("Rephrase failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Elevate Your Writing with AI
              </h2>
              <p className="text-xl mb-8">
                Unleash the power of artificial intelligence to perfect your
                grammar, eliminate spelling errors, and transform your writing
                style.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                style={{ width: "70%", height: "auto" }}
                src={ai}
                alt="AI Writing"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* ✍️ AI Writing Section */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
              Try It Yourself
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Type or paste your text here..."
            />

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                onClick={handleSpellCheck}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Checking..." : "Check Spelling"}
              </button>
              <button
                onClick={handleGrammarCheck}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Checking..." : "Check Grammar"}
              </button>
              <button
                onClick={handleRephrase}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                disabled={loading}
              >
                {loading ? "Rephrasing..." : "Rephrase"}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard title="Spelling Result" content={spellCheckedText} color="green" />
              <ResultCard title="Grammar Result" content={grammarCheckedText} color="blue" />
              <ResultCard title="Rephrased Sentence" content={rephrasedText} color="purple" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Powerful Features at Your Fingertips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<FaPencilAlt className="text-6xl text-blue-500" />}
                title="Smart Grammar Correction"
                description="AI analyzes your context to fix grammar errors perfectly."
              />
              <FeatureCard
                icon={<FaSpellCheck className="text-6xl text-green-500" />}
                title="Advanced Spell Checker"
                description="Catch every spelling error easily with AI-powered correction."
              />
              <FeatureCard
                icon={<FaSyncAlt className="text-6xl text-purple-500" />}
                title="Intelligent Rephrasing"
                description="Get rephrased sentences for clarity and tone adjustment."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>AI Writing Assistant ©{new Date().getFullYear()} | Arpita Nayak</p>
      </footer>
    </div>
  );
};

// Reusable card components
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ResultCard = ({ title, content, color }) => (
  <div className={`p-4 rounded-lg border-t-4 border-${color}-500 bg-gray-50 shadow`}>
    <h3 className={`text-${color}-600 font-semibold mb-2`}>{title}</h3>
    <p className="text-gray-800">{content || "No result yet."}</p>
  </div>
);

export default Home;
