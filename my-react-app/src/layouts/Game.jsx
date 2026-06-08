import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Paper, Divider, Card, IconButton 
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import GameIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // <-- Back Icon இறக்குமதி செய்யப்பட்டது
import { motion, AnimatePresence } from 'framer-motion';

const choices = [
  { 
    name: 'Rock', 
    img: 'https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    fallbackEmoji: '🪨' 
  },
  { 
    name: 'Paper', 
    img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80', 
    fallbackEmoji: '📄' 
  },
  { 
    name: 'Scissors', 
    img: 'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=400&auto=format&fit=crop&q=80', 
    fallbackEmoji: '✂️' 
  }
];

// parent component-ல் இருந்து onBack function-ஐயும் வாங்கிக் கொள்ளலாம்
const Game = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [computer, setComputer] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [result, setResult] = useState("First to 5 Points Wins! 🔥");
  const [animateKey, setAnimateKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);

  const playGame = (playerSelection) => {
    if (gameOver) return;

    const compSelection = choices[Math.floor(Math.random() * choices.length)];
    setUser(playerSelection);
    setComputer(compSelection);
    setAnimateKey(prev => prev + 1);

    let updatedPlayerScore = score.player;
    let updatedComputerScore = score.computer;

    if (playerSelection.name === compSelection.name) {
      setResult("IT'S A TIE! 🤝");
    } else if (
      (playerSelection.name === 'Rock' && compSelection.name === 'Scissors') ||
      (playerSelection.name === 'Paper' && compSelection.name === 'Rock') ||
      (playerSelection.name === 'Scissors' && compSelection.name === 'Paper')
    ) {
      updatedPlayerScore += 1;
      setResult("YOU WIN THIS ROUND! 🎉");
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      updatedComputerScore += 1;
      setResult("CPU WINS THIS ROUND! 💀");
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }

    if (updatedPlayerScore === 5) {
      setGameOver(true);
      setFinalWinner('player');
      setResult("🏆 CHAMPION! YOU WON THE TROPHY! 🏆");
    } else if (updatedComputerScore === 5) {
      setGameOver(true);
      setFinalWinner('computer');
      setResult("🤖 GAME OVER! CPU TOOK THE TROPHY! 🤖");
    }
  };

  const resetGame = () => {
    setUser(null);
    setComputer(null);
    setScore({ player: 0, computer: 0 });
    setResult("First to 5 Points Wins! 🔥");
    setGameOver(false);
    setFinalWinner(null);
    setAnimateKey(prev => prev + 1);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(10, 14, 63, 0.85), rgba(10, 14, 63, 0.95)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflowY: 'auto', 
        p: { xs: 1.5, sm: 3 },
        position: 'relative' // <-- Back button தங்கு தடையின்றி அமர இது முக்கியம்
      }}
    >
      {/* ⬅️ FLOATING BACK ICON BUTTON */}
      <IconButton
        component={motion.button}
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={onBack || (() => window.history.back())} // <-- prop இருந்தால் அதை இயக்கும், இல்லையென்றால் பிரவுசர் பேக் செல்லும்
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)', // Glassmorphic effect
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          },
          p: { xs: 1, sm: 1.5 },
          zIndex: 20
        }}
      >
        <ArrowBackIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' } }} />
      </IconButton>

      <Container maxWidth="sm" sx={{ p: { xs: 0, sm: 2 } }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              p: { xs: 2.5, sm: 5 }, 
              borderRadius: { xs: 6, sm: 8 }, 
              textAlign: 'center', 
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-paper-board.png")', 
              backgroundColor: '#ffffff',
              boxShadow: '0px 25px 70px rgba(0,0,0,0.6)',
              border: { xs: '3px solid rgba(255, 255, 255, 0.8)', sm: '5px solid rgba(255, 255, 255, 0.8)' },
              position: 'relative',
              width: '100%'
            }}
          >
            {/* Title Header */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} mb={{ xs: 2, sm: 4 }}>
              <GameIcon sx={{ fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#ffb300' }} />
              <Typography variant="h4" fontWeight="900" letterSpacing={{ xs: 1, sm: 2 }} color="#1a237e" sx={{ fontSize: { xs: '1.2rem', sm: '2rem' } }}>
                ROCK PAPER SCISSORS
              </Typography>
            </Stack>

            {/* Score Board */}
            <Card elevation={6} sx={{ mb: { xs: 2, sm: 4 }, py: { xs: 1.5, sm: 3 }, bgcolor: '#1a237e', color: 'white', borderRadius: 5 }}>
              <Stack 
                direction="row" 
                justifyContent="center" 
                alignItems="center" 
                divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: { xs: 1.5, sm: 4 } }} />}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: '900', fontSize: { xs: '0.8rem', sm: '1.2rem' } }}>YOU</Typography>
                  <Typography variant="h2" fontWeight="bold" color={score.player >= 4 ? '#00e5ff' : 'white'} sx={{ fontSize: { xs: '2.2rem', sm: '3.75rem' } }}>{score.player}/5</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: '900', fontSize: { xs: '0.8rem', sm: '1.2rem' } }}>CPU</Typography>
                  <Typography variant="h2" fontWeight="bold" color={score.computer >= 4 ? '#ff1744' : 'white'} sx={{ fontSize: { xs: '2.2rem', sm: '3.75rem' } }}>{score.computer}/5</Typography>
                </Box>
              </Stack>
            </Card>

            {/* Trophy Winner Screen */}
            <AnimatePresence>
              {gameOver && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    top: '15%', left: '5%', right: '5%',
                    backgroundColor: 'rgba(255, 215, 0, 0.98)',
                    padding: '40px 15px', borderRadius: '24px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.4)', zIndex: 10,
                    border: '4px solid #fff'
                  }}
                >
                  <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <span style={{ fontSize: '5rem' }}>🏆</span>
                  </motion.div>
                  <Typography variant="h4" fontWeight="900" color="#1a237e" sx={{ mt: 2, fontSize: { xs: '1.4rem', sm: '2.1rem' } }}>
                    {finalWinner === 'player' ? 'YOU ARE THE CHAMPION!' : 'CPU TOOK THE TROPHY!'}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="#333" sx={{ mt: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Click Reset to Play Again
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Versus Play Arena */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                my: { xs: 2.5, sm: 4 }, p: { xs: 1.5, sm: 3 },
                bgcolor: 'rgba(26, 35, 126, 0.04)', borderRadius: 6,
                border: '2.5px dashed #1a237e',
                opacity: gameOver ? 0.2 : 1
              }}
            >
              {/* Player Choice Box */}
              <Box sx={{ width: { xs: 100, sm: 150 }, textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={animateKey + (user?.name || 'user')}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {user ? (
                      <Box component="img" src={user.img} alt={user.name} sx={{ width: '100%', height: { xs: 70, sm: 100 }, borderRadius: 3, objectFit: 'cover', border: '3px solid #1a237e', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                    ) : (
                      <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e0e0e0', borderRadius: 3 }}><Typography variant="h4">👤</Typography></Box>
                    )}
                  </motion.div>
                </AnimatePresence>
                <Typography variant="subtitle1" fontWeight="900" color="#1a237e" sx={{ mt: 0.5, fontSize: { xs: '0.85rem', sm: '1rem' } }}>Player</Typography>
              </Box>
              
              <Typography variant="h3" color="error" fontWeight="900" sx={{ fontStyle: 'italic', fontSize: { xs: '1.8rem', sm: '3rem' } }}>VS</Typography>
              
              {/* Computer Choice Box */}
              <Box sx={{ width: { xs: 100, sm: 150 }, textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={animateKey + (computer?.name || 'comp')}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {computer ? (
                      <Box component="img" src={computer.img} alt={computer.name} sx={{ width: '100%', height: { xs: 70, sm: 100 }, borderRadius: 3, objectFit: 'cover', border: '3px solid #1a237e', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                    ) : (
                      <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e0e0e0', borderRadius: 3 }}><Typography variant="h4">🤖</Typography></Box>
                    )}
                  </motion.div>
                </AnimatePresence>
                <Typography variant="subtitle1" fontWeight="900" color="#1a237e" sx={{ mt: 0.5, fontSize: { xs: '0.85rem', sm: '1rem' } }}>Computer</Typography>
              </Box>
            </Box>

            {/* Result Display */}
            <Typography variant="h4" sx={{ mb: { xs: 2.5, sm: 4 }, color: result.includes('WIN') || result.includes('CHAMPION') ? '#2e7d32' : result.includes('CPU') || result.includes('GAME OVER') ? '#c62828' : '#1565c0', fontWeight: '900', fontSize: { xs: '1.1rem', sm: '1.8rem' } }}>
              {result}
            </Typography>

            <Divider sx={{ mb: { xs: 2, sm: 3 } }} />

            {/* 🎮 ACTION BUTTONS */}
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} justifyContent="center">
              {choices.map((item) => (
                <Button
                  key={item.name}
                  component={motion.button}
                  whileHover={!gameOver ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!gameOver ? { scale: 0.95 } : {}}
                  variant="contained"
                  onClick={() => playGame(item)}
                  disabled={gameOver}
                  sx={{ 
                    flex: 1, 
                    borderRadius: { xs: 2.5, sm: 4 }, 
                    flexDirection: 'column', 
                    p: 0, 
                    overflow: 'hidden', 
                    bgcolor: '#ffffff',
                    color: '#1a237e',
                    boxShadow: '0px 6px 15px rgba(0,0,0,0.15)',
                    border: '2px solid #e8eaf6',
                    '&:hover': { bgcolor: '#1a237e', color: '#ffffff' },
                    '&:disabled': { bgcolor: '#f5f5f5', color: '#bdbdbd' }
                  }}
                >
                  <Box 
                    component="img" 
                    src={item.img} 
                    alt={item.name} 
                    sx={{ 
                      width: '100%', 
                      height: { xs: 65, sm: 110 }, 
                      objectFit: 'cover', 
                      filter: gameOver ? 'grayscale(100%)' : 'none',
                      mb: 0.5
                    }} 
                  />
                  <Typography variant="body1" fontWeight="900" sx={{ pb: { xs: 1, sm: 1.5 }, fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                    {item.name}
                  </Typography>
                </Button>
              ))}
            </Stack>

            {/* Reset IconButton */}
            <IconButton 
              component={motion.button} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}
              onClick={resetGame} color="error" 
              sx={{ 
                mt: { xs: 2.5, sm: 4 }, bgcolor: gameOver ? '#ffb300' : '#ffebee',
                '&:hover': { bgcolor: gameOver ? '#ffa000' : '#ffcdd2' }, p: { xs: 1.5, sm: 2 }
              }}
            >
              <ReplayIcon sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' }, color: gameOver ? '#1a237e' : 'inherit' }} />
            </IconButton>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Game;