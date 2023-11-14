import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameLobby from './GameLobby';
import SpectatorView from './SpectatorView';

describe('Arena Component Tests', () => {
  test('GameLobby renders with necessary elements', () => {
    render(<GameLobby />);
    expect(screen.getByTestId('game-lobby')).toBeInTheDocument();
    expect(screen.getByText('Join Game')).toBeInTheDocument();
    expect(screen.getByText('Create Game')).toBeInTheDocument();
  });

  test('SpectatorView shows the correct message when there are no games', () => {
    render(<SpectatorView />);
    expect(screen.getByText('No active games to spectate')).toBeInTheDocument();
  });

  test('Clicking join game button opens game lobby', async () => {
    render(<GameLobby />);
    fireEvent.click(screen.getByText('Join Game'));
    await waitFor(() => expect(screen.getByTestId('game-lobby')).toBeInTheDocument());
  });

  test('Clicking spectate button opens spectator view', async () => {
    render(<SpectatorView />);
    fireEvent.click(screen.getByText('Spectate'));
    await waitFor(() => expect(screen.getByTestId('spectator-view')).toBeInTheDocument());
  });
});