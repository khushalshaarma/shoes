import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSneakers = async () => {
    if (!query.trim()) return setResults([]);

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch");
      }

      const data: string[] = await res.json();
      setResults(data.length ? data : []);
      if (!data.length) setError("No shoes found");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Search Shoes</h1>

      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your shoe..."
          className="flex-grow p-3 rounded-l bg-gray-800 text-white outline-none"
          onKeyDown={(e) => e.key === "Enter" && fetchSneakers()}
        />
        <button
          onClick={fetchSneakers}
          className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2 w-full max-w-md">
        {results.map((name, idx) => (
          <li key={idx} className="bg-gray-800 p-3 rounded text-center">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
