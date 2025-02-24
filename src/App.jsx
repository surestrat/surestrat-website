// App.js
import React from "react";
import QuoteForm from "./components/quoteForm";
import "./index.css";

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Get a Quote
      </h1>
      <QuoteForm />
    </div>
  </div>
);

export default App;
