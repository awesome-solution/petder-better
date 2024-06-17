import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CSS/DatingMode.css';
// import PetProfile from './PetProfile'; // Import PetProfile component
// import UserProfile from './UserProfile'; // Import UserProfile component

const DatingMode = () => {
    const [petProfiles, setPetProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch pet profiles from the API
        const fetchPets = async () => {
            setLoading(true);
            try {
                // const response = await axios.get('http://localhost:3000/api/potential-pets'); // Make sure the endpoint is correct
                // setPetProfiles(response.data);
                setPetProfiles([{
                    "name": "Banana",
                    "color": "Black",
                    "size": "Big",
                    "species_id": 7,
                    "breed_id": 1,
                    "gender": "Male",
                    "neutering": true,
                    "medical_records": "None",
                    "picture": "",
                    "description": "lovely"
                },
                {
                    "name": "Aple",
                    "color": "Black",
                    "size": "Big",
                    "species_id": 7,
                    "breed_id": 1,
                    "gender": "Male",
                    "neutering": true,
                    "medical_records": "None",
                    "picture": "",
                    "description": "lovely"
                }
            ])
                setError(null);
            } catch (error) {
                console.error('Error fetching pet profiles:', error);
                //setError('Failed to fetch pet profiles.');
            }
            setLoading(false);
        };

        fetchPets();
    }, []);

    const handleNextProfile = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % petProfiles.length);
    };

    const handlePreviousProfile = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + petProfiles.length) % petProfiles.length);
    };

    // const handleLike = async () => {
    //     try {
    //         const response = await axios.post('/api/like', { petId: petProfiles[currentIndex].id });
    //         console.log('Liked:', response.data);
    //         handleNextProfile();
    //     } catch (error) {
    //         console.error('Error liking profile:', error);
    //     }
    // };

    // like
    const handleLike = async () => {
        try {
            // Assuming `userId` is available in the component's state or from a global state/store
            const userId = 'currentUser_Id'; // This should come from user authentication context or state
            const petId = petProfiles[currentIndex].id;
            const response = await axios.post('/api/favorite', { userID: userId, petID: petId });
    
            console.log('Favorite added:', response.data);
            handleNextProfile();
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    //unlike
    const handleUnlike = async () => {
        try {
            const response = await axios.post('/api/unlike', { petId: petProfiles[currentIndex].id });
            console.log('Unliked:', response.data);
            handleNextProfile();
        } catch (error) {
            console.error('Error unliking profile:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dating-container">
            <h2>Click Like To Chat With Me?</h2>
            {petProfiles.length > 0 ? (
                <>
                    <div className="pet-card">
                        <div className="pet-profile">
                            <img src={petProfiles[currentIndex].picture} alt={petProfiles[currentIndex].name} />
                            <h3>{petProfiles[currentIndex].name}</h3>
                            <p>Age: {petProfiles[currentIndex].age}</p>
                            <p>Color: {petProfiles[currentIndex].color}</p>
                            <p>Weight: {petProfiles[currentIndex].size}</p>
                            <p>Species: {petProfiles[currentIndex].species_id}</p>
                            <p>Breeds: {petProfiles[currentIndex].breed_id}</p>
                            <p>Gender: {petProfiles[currentIndex].gender}</p>
                            <p>Location: {petProfiles[currentIndex].location}</p>
                            <p>Neutered: {petProfiles[currentIndex].neutering}</p>
                            <p>Medical Records: {petProfiles[currentIndex].medical_records}</p>
                            <p>Description: {petProfiles[currentIndex].description}</p>
                        </div>
                        <div className="profile-buttons">
                            <button onClick={handleLike} className="like-btn">Like</button>
                            <button onClick={handleUnlike} className="unlike-btn">Unlike</button>
                        </div>
                    </div>
                    <div className="navigation-buttons">
                        <button className="prev" onClick={handlePreviousProfile} disabled={currentIndex === 0}>Previous</button>
                        <button className="next" onClick={handleNextProfile} disabled={currentIndex === petProfiles.length - 1}>Next</button>
                    </div>
                </>
            ) : (
                <p>No pet profiles available</p>
            )}
        </div>
    );
};

export default DatingMode;
