
import React, { useState } from 'react';
import './UserProfileCard.css'
import profile  from '../Assets/profile.png'

function UserProfile() {
  const [Username, setUserName] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
 
  const handleEditProfile = () => {
    console.log('Edit Profile clicked');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
     if (newPassword === confirmNewPassword) {
      setPasswordChangeSuccess(true);
      setShowChangePassword(false); 
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  const handleSaveChanges = () => {
     console.log('Saving profile changes...');
    };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-picture">
          
          <img src={profile} alt="Profile" />
        </div>
        <div className="user-info">
          <label>
            Username:
            <input
              type="text"
              value={Username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          
          
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
        {showChangePassword && (
          <div className="password-section">
            <h3>Change Password</h3>
            <form onSubmit={handleChangePasswordSubmit}>
              <label>
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirm New Password:
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Change Password</button>
              {passwordChangeSuccess && <p>Password changed successfully!</p>}
            </form>
          </div>
        )}
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default UserProfile;
