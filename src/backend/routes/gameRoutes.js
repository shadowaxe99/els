const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');
const { validateAuthToken } = require('../utils/ErrorHandler');

// Middleware to validate the token before accessing any game route
router.use(validateAuthToken);

// GET request to fetch all available games
router.get('/', async (req, res) => {
  try {
    const games = await GameController.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request to create a new game
router.post('/', async (req, res) => {
  try {
    const newGame = await GameController.createGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to fetch a single game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await GameController.getGameById(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update a game by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGame = await GameController.updateGame(req.params.id, req.body);
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE request to delete a game by ID
router.delete('/:id', async (req, res) => {
  try {
    await GameController.deleteGame(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;