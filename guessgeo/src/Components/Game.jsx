/* === Game Component (Main Logic), controls game state, Street View Image loading, scoring, and question generation === */
import { useState, useEffect } from "react";
import { getStreetViewURL } from "../Services/streetView";
import Score from "./Score.jsx";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

function Game({ user }) {

    /* === Data, list of all possible locations used in the game, each object contains:
1.City & country (for answers)
2.Lat & lon (for Google Street View)
3.Heading (camera direction) === */
    const PLACES = [
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
        {
            city: "Barcelona",
            country: "Spain",
            lat: 41.403177113795195,
            lon: 2.1749564452995607,
            heading: 274 },
        {
            city: "St Petersburg",
            country: "Russia",
            lat: 59.94004642222007,
            lon: 30.32952354188559,
            heading: 247 },
        {
            city: "Ho Chi Minh",
            country: "Vietnam",
            lat: 10.750242,
            lon: 106.6424075,
            heading: 309},
        {
            city: "Muscat",
            country: "Oman",
            lat: 23.5851382,
            lon: 58.3610217,
            heading: 350},
        {
            city: "Dubrovnik",
            country: "Croatia",
            lat: 42.6445265,
            lon: 18.0910903,
            heading: 128},
        {
            city: "Santiago de Chile",
            country: "Chile",
            lat: -33.5098696,
            lon: -70.5860609,
            heading: 130},
        {
            city: "Zanzibar City",
            country: "Tanzania",
            lat: -6.8220669,
            lon: 39.2731545,
            heading: 12},
        {
            city: "Toronto",
            country: "Canada",
            lat: 43.6771217,
            lon: -79.4090617,
            heading: 332},
        {
            city: "Bergen",
            country: "Norway",
            lat: 60.387254,
            lon: 5.3273385,
            heading: 61},
        {
            city: "Seoul",
            country: "South Korea",
            lat: 37.5398109,
            lon: 126.9957801,
            heading: 80},
        {
            city: "Naples",
            country: "Italy",
            lat: 40.8406575,
            lon: 14.2486514,
            heading: 211},
        {
            city: "Dhaka",
            country: "Bangladesh",
            lat: 23.7448171,
            lon: 90.4067687,
            heading: 136},
        {
            city: "Auckland",
            country: "New Zealand",
            lat: -36.8518358,
            lon: 174.7661982,
            heading: 343},
        {
            city: "Managua",
            country: "Nicaragua",
            lat: 12.1127768,
            lon: -86.2989018,
            heading: 87},
        {
            city: "Gdansk",
            country: "Poland",
            lat: 54.3524805,
            lon: 18.6512492,
            heading: 142},
        {
            city: "Lagos",
            country: "Nigeria",
            lat: 6.4487497,
            lon: 3.2526325,
            heading: 319},
        {
            city: "Manila",
            country: "Philippines",
            lat: 14.614839,
            lon: 121.0133544,
            heading: 223},
        {
            city: "Edinburgh",
            country: "Scotland",
            lat: 55.9477137,
            lon: -3.1884075,
            heading: 266},
        {
            city: "Istanbul",
            country: "Turkey",
            lat: 41.0048031,
            lon: 28.9834311,
            heading: 92},
        {
            city: "Bogota",
            country: "Colombia",
            lat: 4.7514099,
            lon: -74.0974181,
            heading: 185},
        {
            city: "London",
            country: "England",
            lat: 51.520891,
            lon: -0.1267399,
            heading: 151},
        {
            city: "Cape Town",
            country: "South Africa",
            lat: -33.9341128,
            lon: 18.4077264,
            heading: 143},
        {
            city: "Mumbai",
            country: "India",
            lat: 19.0120078,
            lon: 72.8449895,
            heading: 131},
        {
            city: "Brussels",
            country: "Belgium",
            lat: 50.8616069,
            lon: 4.3561032,
            heading: 182},
        {
            city: "Nairobi",
            country: "Kenya",
            lat: -1.2837826,
            lon: 36.8212591,
            heading: 31},
        {
            city: "Jakarta",
            country: "Indonesia",
            lat: -6.1383656,
            lon: 106.8137334,
            heading: 163},
        {
            city: "Juneau",
            country: "USA",
            lat: 58.3001615,
            lon: -134.4251922,
            heading: 72},
        {
            city: "Belgrade",
            country: "Serbia",
            lat: 44.8050633,
            lon: 20.4705408,
            heading: 11},
        {
            city: "Hong Kong",
            country: "Hong Kong",
            lat: 22.3161457,
            lon: 114.1675301,
            heading: 76},
        {
            city: "Helsinki",
            country: "Finland",
            lat: 60.1678205,
            lon: 24.9494882,
            heading: 350},
    ];

    /* === State Variables === */
    const [score, setScore] = useState(0);
    const [place, setPlace] = useState(null);
    const [options, setOptions] = useState([]);
    const [image, setImage] = useState(null);
    const [round, setRound] = useState(1);
    const [gameOver, setGameOver] = useState(false);

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

    // Access API key from .env.local
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Build Google Street View image URL
    const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lon}&fov=90&heading=${heading ?? 120}&pitch=0&key=${API_KEY}`;

    // Set image to display
    setImage(streetViewURL);
    console.log(streetViewURL);

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
        setScore((prev) => prev + 1);
    }
    // Check if game should end after 5 rounds
    if (round >= 10) {
        setGameOver(true);
    } else {
        // Move to next round
        setRound((prev) => prev + 1);
        // Load new location/question
        loadPlace();
    }
};

    /* === Initial Load, runs once when component mounts === */
    useEffect(() => {
    loadPlace();
    }, []);

    /* === Game Over Screen === */
    /* Show final score after 5 rounds and lets user restart the game */
    if (gameOver) {
        return (
            <div>
                <h1>Game Over</h1>
                <p>Final Score: {score}/10</p>

                <button onClick={() => window.location.reload()}>
                    Play Again
                </button>
            </div>
        );
    }

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

        <Score score={score} />
        <p className="question">Where is this place?</p>

        <div className="answers">
            <Answers options={options} onAnswer={handleAnswer} />
    </div>
    </div>
    );
}

export default Game;