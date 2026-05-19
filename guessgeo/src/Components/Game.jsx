/* === Game Component (Main Logic), controls game state, scoring, and question generation === */
import { useState, useEffect } from "react";
import Score from "./Score.jsx";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

function Game({ user }) {

    /* === Data, list of all possible locations used in the game, each object contains:
1.City & country (for answers)
2.lat & lon (for Google Street View)
3.Heading (camera direction) === */
    const PLACES = [
        { 
            city: "Zanzibar",
            country: "Tanzania",
            lat: -6.1650,
            lon: 39.1990,
            heading: 90
        },

        { 
            city: "Porto",
            country: "Portugal",
            lat: 41.1413,
            lon: -8.6139,
            heading: 90
        },

        { 
            city: "Bridgetown",
            country: "Barbados",
            lat: 13.0975,
            lon: -59.6167,
            heading: 90
        },

        { 
            city: "Reykjavik",
            country: "Iceland",
            lat: 64.1466,
            lon: -21.9426,
            heading: 200
        },

        { 
            city: "Cusco",
            country: "Peru",
            lat: -13.5167,
            lon: -71.9780,
            heading: 180
        },

        { 
            city: "Tbilisi",
            country: "Georgia",
            lat: 41.6952,
            lon: 44.8010,
            heading: 200
            },

        { 
            city: "Valparaíso",
            country: "Chile",
            lat: -33.0458, 
            lon: -71.6197, 
            heading: 149 
            },

        { 
            city: "Marrakesh",
            country: "Morocco",
            lat: 31.6295,
            lon: -7.9892,
            heading: 160
            },

        { 
            city: "Baku",
            country: "Azerbaijan",
            lat: 40.3660,
            lon: 49.8350,
            heading: 100
            },

        { 
            city: "Ulaanbaatar",
            country: "Mongolia",
            lat: 47.9185,
            lon: 106.9170,
            heading: 160 },
    ];

    /* === State Variables === */
    const [score, setScore] = useState(0);
    const [place, setPlace] = useState(null);
    const [options, setOptions] = useState([]);
    const [image, setImage] = useState(null);

    /* === Help Functions, get random location, returns one random place object from Places array === */
    const getRandomPlace = () => {
    return PLACES[Math.floor(Math.random() * PLACES.length)]
    }

    const shuffleArray = (array) => {
    return [...array] .sort(() => Math.random() - 0.5)
    }

    /* === Game Logic === */

    /* === Load New Location, gets random place + builds question === */
    const loadPlace = () => {

    // Get random location data 
    const { lat, lon, city, country, heading } = getRandomPlace();

    // Access API key from .env
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Build Google Street View image URL
    const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lon}&fov=90&heading=${heading ?? 120}&pitch=0&key=${API_KEY}`; // Replace 'our_api_key' with our API key //

    // Set image to display
    setImage(streetViewURL);

    // Store correct answer
    const correctAnswer = `${city}, ${country}`;
    setPlace(correctAnswer);

    /* Create answer pool  */
    const PLACE_POOL = PLACES.map(
        (p) => `${p.city}, ${p.country}`
    );

    // Get 3 random wrong answers === */
    const wrongOptions = PLACE_POOL
        .filter((p) => p !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // Combine correct + wrong answers and shuffle them
    setOptions(shuffleArray([correctAnswer, ...wrongOptions]));
    };

    /* === Handle Answer Click, checks correctness + updates score === */
    const handleAnswer = (selected) => {
    console.log("Selected:", selected);
    console.log("Correct:", place);

    // If correct -> increase score
    if (selected === place) {
        setScore(prev => prev + 1);
    }

    // Load next question
    loadPlace();
};

    /* === Initial Load, runs once when component mounts === */
    useEffect(() => {
    loadPlace();
    }, []);

    /* === JSX === */
    return (
    <div className="app-container">
        <h1 className="title">Guess Geo</h1>

        {image ? (
        <img src={image} alt="Street View" />
        ) : (
        <p>Loading location...</p>
        )}
        <h2 className="subtitle">Where in the world are you?</h2>
        <p className="welcome">Welcome, {user ? user.username : "Guest"}!</p>

        <p className="score">Score score={score} </p>
        <p className="question">Where is this place?</p>

        <div className="answers">
            <Answers options={options} onAnswer={handleAnswer} />
    </div>
    </div>
    );
}

export default Game;