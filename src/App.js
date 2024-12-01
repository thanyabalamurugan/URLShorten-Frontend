import React, { useState } from "react";

function App() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/urls/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(longUrl), 
            });
            if (!response.ok) {
                throw new Error("Failed to shorten the URL");
            }

            const data = await response.json();
            setShortUrl(data.shortUrl); 
        } catch (error) {
            console.error("Error shortening URL:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">URL Shortener</h1>
            <form onSubmit={handleSubmit} className="shorten-form">
                <input
                    type="text"
                    placeholder="Enter Long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="input-url"
                />
                <button type="submit" className="shorten-btn">Shorten</button>
            </form>
            {shortUrl && (
                <div className="result-container">
                    <p>Shortened URL:</p>
                    <a
                        href={`http://localhost:5000/api/urls/${shortUrl}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shortened-url"
                    >
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
