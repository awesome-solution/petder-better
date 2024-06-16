<<<<<<< HEAD
import React, { useState, useEffect } from 'react'; 
import axios from "axios";
=======
import React , { useState } from "react";
// import axios from "axios";
>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1

// first need the pet 
// pet profile
    //B - petProfile -> createPetProfile, updatePetProfile, readPetProfile, deletePetProfile, showPotentialPets,
        // uploadPic button
        // create/confirm create profile button
        // edit button 
        // delete button
        // update button 
// then user profile
    //B - userProfile -> createUserProfile / editUserProfile / deleteUserProfile / uploadPicture / readUserProfile
    // edit button --> go to editUserProfile endpoint 
    // delete button --> go to  deleteProfile endpoint
    // uploadPicture button --> go to uploadPicture endpoint

//     -- Users table 
// CREATE TABLE Users ( id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, contact VARCHAR(255), email VARCHAR(255) UNIQUE NOT NULL, location VARCHAR(255), profile_picture VARCHAR(255), description TEXT, password VARCHAR(255) NOT NULL ); 
// -- Pets table 
// CREATE TABLE Pets ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, color VARCHAR(255), size VARCHAR(50), species_id INT REFERENCES Species(id), breed_id INT REFERENCES Breeds(id), gender VARCHAR(10), neutering BOOLEAN, medical_records TEXT, picture VARCHAR(255), description TEXT ); 
// -- UserPets table 
// CREATE TABLE UserPets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id) ); 
// -- FavoritePets table 
// CREATE TABLE FavoritePets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 
// -- DislikedPets table 
// CREATE TABLE DislikedPets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 
// -- Messages table 
// CREATE TABLE Messages ( id SERIAL PRIMARY KEY, content TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, from_user_id INT REFERENCES Users(id), to_user_id INT REFERENCES Users(id) ); 
// -- PetPictures table 
// CREATE TABLE PetPictures ( id SERIAL PRIMARY KEY, pet_id INT REFERENCES Pets(id), picture VARCHAR(255) NOT NULL ); 
// -- Species table 
// CREATE TABLE Species ( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL ); 
// -- Breeds table 
// CREATE TABLE Breeds ( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL );
    
const Profile = () => {
    // setPet value from the input elements
    const [pet, setPet] = useState({
        name: '',
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
    // setPicture from upload pictures elemenet
    // start with null 
    const [picture, setPicture] = useState(null);

        // form onSubmit
        // edit category later // add more options to choose in the box better
        // gender and category will be dropdowmn menu
        
<<<<<<< HEAD
    // function for the setPicture 
        // call to the endpoint 


        
  useEffect(() => {
    // Fetch breeds based on species selection
    if (pet.species_id === '1' || pet.species_id === '2') { // Assuming species_id 1 is Dog and 2 is Cat
      axios.get(`/api/breeds/${pet.species_id}`)
        .then(response => setBreeds(response.data))
        .catch(error => console.error(error));
    }
  }, [pet.species_id]); // Triggered when species_id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // endpoint JSON
  // 
  // <form onSubmit={handleSubmit}>
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('image', image);
//     Object.keys(pet).forEach(key => formData.append(key, pet[key]));

//     axios.post('/api/pets/create', formData)
//       .then(response => console.log(response))
//       .catch(error => console.error(error));
//   };

=======
        
>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
    // function to handle the submitting all the put element
    // passing in event
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('image', image);
    //     Object.keys(pet).forEach(key => formData.append(key, pet[key]));

    //     // change the endpoint
    //     fetch('/', {
    //     method: 'POST',
    //     body: formData,
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Error:', error));
    // };


// catagory --> with options 
{/* <div className="dropdown">
<select className="dropdown-content" onChange={options}>
  <option value="category">Category</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="snake">Snake</option>
  <option value="bird">Bird</option>
  <option value="">...</option>
</select>
</div> */}

    return (
        // image area need to be edited!
        <div className="pet-profile-container">
            <h2 className="pet-profile-header">Pet Profile</h2>
<<<<<<< HEAD
            <form>
=======
            <form onSubmit={handleSubmit}>
>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
                <input type="text" name="name" value={pet.name} placeholder="Pet Name" onChange={handleInputChange}/>
                <input type="text" name="color" value={pet.color} onChange={handleInputChange} placeholder="Color" />
                <input type="text" name="size" value={pet.size} onChange={handleInputChange} placeholder="Weight" />
                <select name="species_id" value={pet.species_id} onChange={handleInputChange}>
                    <option value="">Select Species</option>
                    <option value="1">Dog</option>
                    <option value="2">Cat</option>
                    <option value="3">Rabbit</option>
                    <option value="4">Snake</option>
                    <option value="5">Bird</option>
                </select>
                <input type="text" name="breed_id" value={pet.breed_id} />
                <select name="gender" value={pet.gender}onChange={handleInputChange}>
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
                    <textarea
                        name="medical_records"
                        value={pet.medical_records}
                        onChange={handleInputChange}
                        placeholder="Medical Records" />
                    <textarea
                        name="description"
                        value={pet.description}
                        onChange={handleInputChange}
                        placeholder="Description" />
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Create/Update Profile</button>
            </form>
        </div>
    );

<<<<<<< HEAD
=======

>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
}


export default Profile;