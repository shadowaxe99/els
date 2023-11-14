import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { gameData } from '../../services/GameService';
import { authToken } from '../../services/AuthService';

const SpectatorView = () => {
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setError('You must be logged in to view this page.');
      return;
    }

    const fetchGameState = async () => {
      try {
        const response = await gameData(authToken);
        setGameState(response.data);
      } catch (err) {
        setError('Failed to fetch game state.');
      }
    };

    fetchGameState();
  }, [isAuthenticated]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!gameState) {
    return <div>Loading game state...</div>;
  }

  return (
    <div id="game-lobby" className="p-4">
      <h2 className="text-lg font-bold">Spectator View</h2>
      <div className="mt-4">
        {/* Render game state here */}
        <pre>{JSON.stringify(gameState, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SpectatorView;