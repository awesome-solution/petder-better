import React, { useState, useEffect } from 'react';
// import axios from "axios";
import './CSS/Profile.css';
import PetProfile from './PetProfile'; // Import PetProfile component
import UserProfile from './UserProfile'; // Import UserProfile component

const DatingMode = () => {
    const [pet, setPet] = useState({
        name: '',
        age: '',
        color: '',
        size: '',
        species_id: '',
        breed_id: '',
        gender: '',
        neutering: false,
        medical_records: '',
        picture: '',
        description: '',
    });

    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null);

    const [user, setUser] = useState({
        username: '',
        email: '',
    });

    const [editing, setEditing] = useState(false);
    const [newUserData, setNewUserData] = useState({});

    useEffect(() => {
        const fetchedUser = {
            username: 'example_user', // Replace with actual fetched data after login
            email: 'example@example.com', // Replace with actual fetched data after login
        };
        setUser(fetchedUser);
    }, []);

    const handleEdit = () => {
        setEditing(true);
        setNewUserData({ ...user });
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setNewUserData({});
    };

    const handleSave = () => {
        setUser({ ...newUserData });
        setEditing(false);
    };

    const handleDelete = () => {
        setUser({
            username: '',
            email: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPicture(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (!picture) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(picture);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [picture]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture);
        Object.keys(pet).forEach(key => formData.append(key, pet[key]));

        axios.post('/api/pets/create', formData)
            .then(response => {
                console.log(response.data);
                if (response.data.picture) {
                    setPet({ ...pet, picture: response.data.picture });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="profile-container">
            <div className="pet-profile">
                <PetProfile
                    pet={pet}
                    picture={picture}
                    preview={preview}
                    handleInputChange={handleInputChange}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className="user-profile">
                <UserProfile
                    user={user}
                    editing={editing}
                    newUserData={newUserData}
                    handleInputChange={handleInputChange}
                    handleEdit={handleEdit}
                    handleCancelEdit={handleCancelEdit}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default DatingMode;
