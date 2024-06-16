import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CSS/Profile.css';
//import PetProfile from './PetProfile'; // Import PetProfile component
import UserProfile from './UserProfile'; // Import UserProfile component

const Profile = () => {
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
            <div className="pet-profile-container">
        <h2 className="pet-profile-header">Let's Create Your Pet Profile</h2>
        <form onSubmit={handleSubmit}>
                {picture && (
                    <div className="image-preview-container">
                        <div className="image-preview">
                            <img src={preview} alt="Image Preview" />
                        </div>
                    </div>
                )}
            
                <input id='upload-img' type="file" onChange={handleImageChange} />
                <div className="input-container">
                <input type="text" name="name" value={pet.name} placeholder="Pet Name" onChange={handleInputChange} />
                <input type="text" name="age" value={pet.age} placeholder="Age" onChange={handleInputChange} />
                <input type="text" name="color" value={pet.color} onChange={handleInputChange} placeholder="Color" />
                <input type="text" name="size" value={pet.size} onChange={handleInputChange} placeholder="Weight" />
                <select name="species_id" value={pet.species_id} onChange={handleInputChange} className='dropdown-content'>
                    <option value="">Select Species</option>
                    <option value="1">Dog</option>
                    <option value="2">Cat</option>
                    <option value="3">Rabbit</option>
                    <option value="4">Snake</option>
                    <option value="5">Bird</option>
                </select>
                <input type="text" name="breed_id" value={pet.breed_id} placeholder="Breed" onChange={handleInputChange} />
                <input type="text" name="location" value={pet.location} placeholder="Location" onChange={handleInputChange} />
                <select name="gender" value={pet.gender} onChange={handleInputChange} className='dropdown-content'>
                    <option value="">Gender</option>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                </select>
                <label>
                    Neutered:
                    <input
                        type="checkbox"
                        name="neutering"
                        checked={pet.neutering}
                        onChange={(e) => setPet({ ...pet, neutering: e.target.checked })}
                    />
                </label>
                <input
                    name="medical_records"
                    value={pet.medical_records}
                    onChange={handleInputChange}
                    placeholder="Medical Records"
                />
                <input
                    name="description"
                    value={pet.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
            </div>
            <button className='btn-profile' type="submit">Create/Update Profile</button>
            <button className='edit-btn' type='button'>Edit</button>
            <button className='delete-btn' type='button'>Delete</button>
        </form>
        {pet.picture && (
            <div className="uploaded-image">
                <h3>Uploaded Image:</h3>
                <img src={pet.picture} alt="Uploaded" />
            </div>
        )}
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

export default Profile;
