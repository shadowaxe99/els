import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinGame, spectateGame, leaveGame } from '../../services/GameService';
import { gameData } from '../../redux/selectors';
import GameCard from './GameCard';

const GameLobby = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const currentGameData = useSelector(gameData);

  useEffect(() => {
    // Fetch games from the backend or a service
    const fetchGames = async () => {
      try {
        // This function should make an API call to retrieve games
        const response = await getAvailableGames();
        setGames(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGames();
  }, []);

  const handleJoin = async (gameId) => {
    try {
      const response = await joinGame(gameId);
      dispatch({ type: 'JOIN_GAME', payload: response.data });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSpectate = async (gameId) => {
    try {
      const response = await spectateGame(gameId);
      dispatch({ type: 'SPECTATE_GAME', payload: response.data });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeave = async (gameId) => {
    try {
      const response = await leaveGame(gameId);
      dispatch({ type: 'LEAVE_GAME', payload: response.data });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="game-lobby" className="p-4">
      <h1 className="text-3xl font-bold mb-4">Game Lobby</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onJoin={handleJoin}
            onSpectate={handleSpectate}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default GameLobby;