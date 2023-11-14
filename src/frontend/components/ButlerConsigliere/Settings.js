import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../services/UserService';
import { userProfile } from '../../services/UserService';
import { authToken } from '../../services/AuthService';

const Settings = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const updatedUser = await updateProfile(formData, authToken);
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: updatedUser });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;