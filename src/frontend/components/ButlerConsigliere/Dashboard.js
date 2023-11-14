import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../services/UserService';
import { authToken } from '../../services/AuthService';
import { logError } from '../../utils/Logger';
import { userProfile } from '../../sharedDependencies';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (userToken) {
      fetchUserData(userToken)
        .then((data) => {
          setUserData(data);
          dispatch(userProfile(data));
          setLoading(false);
        })
        .catch((error) => {
          logError('Dashboard fetchUserData', error);
          setLoading(false);
        });
    }
  }, [userToken, dispatch]);

  if (loading) {
    return <div>Loading your personal dashboard...</div>;
  }

  if (!userData) {
    return <div>Could not load user data. Please try again later.</div>;
  }

  return (
    <div id="dashboard-container" className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {userData.name}!</h1>
      <div className="mt-4">
        <h2 className="text-xl">Your Upcoming Schedule</h2>
        {/* Schedule component would be included here */}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Tasks at a Glance</h2>
        {/* Tasks component would be included here */}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Quick Access</h2>
        {/* Quick access links or widgets would be included here */}
      </div>
    </div>
  );
};

export default Dashboard;