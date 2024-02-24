import React, { useEffect, useState } from 'react';
import './displayData.css';
import axios from 'axios';

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const UserDisplay = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { results } = response.data;
      const { name, email } = results[0];
      const formattedData: UserData = { name, email };
      setUserData(formattedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='container'>
      <h1>User Information</h1>
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchUserData}>Refresh</button>
    </div>
  );
};

export default UserDisplay;
