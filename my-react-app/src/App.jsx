import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Paper, Grid, Divider, Card, IconButton 
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import GameIcon from '@mui/icons-material/EmojiEvents';

const choices = [
  { name: 'Rock', emoji: '🪨' },
  { name: 'Paper', emoji: '📄' },
  { name: 'Scissors', emoji: '✂️' }
];

const App = () => {
  const [user, setUser] = useState(null);
  const [computer, setComputer] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [result, setResult] = useState("Ready to Win?");

  const playGame = (playerSelection) => {
    const compSelection = choices[Math.floor(Math.random() * choices.length)];
    setUser(playerSelection);
    setComputer(compSelection);

    if (playerSelection.name === compSelection.name) {
      setResult("IT'S A TIE! 🤝");
    } else if (
      (playerSelection.name === 'Rock' && compSelection.name === 'Scissors') ||
      (playerSelection.name === 'Paper' && compSelection.name === 'Rock') ||
      (playerSelection.name === 'Scissors' && compSelection.name === 'Paper')
    ) {
      setResult("YOU WIN! 🎉");
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult("CPU WINS! 💀");
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setUser(null);
    setComputer(null);
    setScore({ player: 0, computer: 0 });
    setResult("Let's Start Again!");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Paper elevation={10} sx={{ p: 3, borderRadius: 5, textAlign: 'center', bgcolor: '#fafafa' }}>
        
        {/* Header */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={2}>
          <GameIcon color="primary" />
          <Typography variant="h5" fontWeight="900" letterSpacing={1}>RPS KUDU</Typography>
        </Stack>

        {/* Score Card */}
        <Card variant="outlined" sx={{ mb: 3, py: 2, bgcolor: '#1a237e', color: 'white' }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="caption">YOU</Typography>
              <Typography variant="h4" fontWeight="bold">{score.player}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">CPU</Typography>
              <Typography variant="h4" fontWeight="bold">{score.computer}</Typography>
            </Grid>
          </Grid>
        </Card>

        {/* Play Area */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 4 }}>
          <Box>
            <Typography variant="h2">{user ? user.emoji : '👤'}</Typography>
            <Typography variant="body2" color="textSecondary">Player</Typography>
          </Box>
          <Typography variant="h6" color="secondary" fontWeight="bold">VS</Typography>
          <Box>
            <Typography variant="h2">{computer ? computer.emoji : '🤖'}</Typography>
            <Typography variant="body2" color="textSecondary">Computer</Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mb: 3, color: '#2e7d32', fontWeight: 'bold' }}>
          {result}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} justifyContent="center">
          {choices.map((item) => (
            <Button
              key={item.name}
              variant="contained"
              onClick={() => playGame(item)}
              sx={{ 
                flex: 1, 
                borderRadius: 3, 
                flexDirection: 'column', 
                py: 2,
                bgcolor: '#ffffff',
                color: '#1a237e',
                '&:hover': { bgcolor: '#e8eaf6' }
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
              <Typography variant="caption" fontWeight="bold">{item.name}</Typography>
            </Button>
          ))}
        </Stack>

        <IconButton onClick={resetGame} color="error" sx={{ mt: 3 }}>
          <ReplayIcon />
        </IconButton>
      </Paper>
    </Container>
  );
};

export default App;