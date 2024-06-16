import React, { useState } from 'react';

const UserProfile = ({ user, editing, newUserData, handleInputChange, handleEdit, handleCancelEdit, handleSave, handleDelete }) => {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {editing ? (
                <div className="edit-mode">
                    <input type="text" name="username" value={newUserData.username} onChange={handleInputChange} />
                    <input type="email" name="email" value={newUserData.email} onChange={handleInputChange} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div className="view-mode">
                    <div>
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
