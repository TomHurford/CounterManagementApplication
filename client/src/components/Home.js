import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import axios from "axios";

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [counters, setCounters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [counterName, setCounterName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            setIsLoading(true);

            axios
                .get("http://localhost:5000/counter/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setCounters(response.data.counters);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setCounters([]);
        // Optionally redirect to another page after successful logout
        window.location.replace("/login");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .post(
                    "http://localhost:5000/counter/create",
                    { counterName: counterName },
                    {
                        headers:
                        {
                            Authorization: `Bearer ${token}`,
                        },
                    }
            )
                .then((response) => {
                    setCounters(response.data.counters);
                    setShowForm(false);
                })
                .catch((error) => {
                    console.error(error);
                }
            );
        }
        // Refresh the page
        window.location.reload();
    };

    if (!isLoggedIn) {
        return <p>Please log in to view this page.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
             <button onClick={() => setShowForm(true)}>Add Counter</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={counterName}
                    onChange={(event) => setCounterName(event.target.value)}
                />
                <button type="submit">Submit</button>
                </form>
            )}
            {counters && counters.length > 0 ? (
                counters.map((counter) => (
                <Counter
                    key={counter.id}
                    id={counter.id}
                    value={counter.counterValue}
                    name={counter.counterName}
                />
                ))
            ) : (
                <p>You have no cards yet.</p>
            )}

            <button onClick={handleLogout}>Logout</button>

        </div>
    );
}

export default Home;
