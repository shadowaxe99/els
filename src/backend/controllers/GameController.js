```javascript
const GameModel = require('../models/GameModel');
const { logError } = require('../utils/Logger');
const { ErrorHandler } = require('../utils/ErrorHandler');

class GameController {
  // List all games
  async listAllGames(req, res) {
    try {
      const games = await GameModel.find({});
      res.status(200).json(games);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Error retrieving games' });
    }
  }

  // Get a single game by ID
  async getGameById(req, res) {
    try {
      const game = await GameModel.findById(req.params.id);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json(game);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Error retrieving game' });
    }
  }

  // Create a new game
  async createGame(req, res) {
    try {
      const newGame = new GameModel(req.body);
      const savedGame = await newGame.save();
      res.status(201).json(savedGame);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Error creating game' });
    }
  }

  // Update an existing game
  async updateGame(req, res) {
    try {
      const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json(updatedGame);
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Error updating game' });
    }
  }

  // Delete a game
  async deleteGame(req, res) {
    try {
      const deletedGame = await GameModel.findByIdAndDelete(req.params.id);
      if (!deletedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
      logError(error);
      res.status(500).json({ message: 'Error deleting game' });
    }
  }
}

module.exports = new GameController();
```