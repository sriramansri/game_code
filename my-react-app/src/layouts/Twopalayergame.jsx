import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Paper, Divider, Card, IconButton 
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // பேக் பட்டனுக்கான ஐகான்
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const choices = [
  { 
    name: 'Rock', 
    img: 'https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
  },
  { 
    name: 'Paper', 
    img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80', 
  },
  { 
    name: 'Scissors', 
    img: 'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=400&auto=format&fit=crop&q=80', 
  }
];

const TwoPlayerGame = ({ onBack }) => { // ஆன்-கிளிக் ஹேண்ட்லருக்காக prop சேர்க்கப்பட்டுள்ளது
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1); 
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [result, setResult] = useState("Player 1, Make your move! 🕹️");
  const [animateKey, setAnimateKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);
  const [roundResolved, setRoundResolved] = useState(false); 

  const handleSelection = (selection) => {
    if (gameOver || roundResolved) return;

    if (currentTurn === 1) {
      setP1Choice(selection);
      setCurrentTurn(2);
      setResult("Player 2, Your turn! Don't look at Player 1's side! 👀");
    } else if (currentTurn === 2) {
      setP2Choice(selection);
      setAnimateKey(prev => prev + 1);
      setRoundResolved(true);
      resolveRound(p1Choice, selection);
    }
  };

  const resolveRound = (p1, p2) => {
    let updatedP1Score = score.p1;
    let updatedP2Score = score.p2;

    if (p1.name === p2.name) {
      setResult("IT'S A TIE ROUND! 🤝");
    } else if (
      (p1.name === 'Rock' && p2.name === 'Scissors') ||
      (p1.name === 'Paper' && p2.name === 'Rock') ||
      (p1.name === 'Scissors' && p2.name === 'Paper')
    ) {
      updatedP1Score += 1;
      setResult("PLAYER 1 WINS THIS ROUND! 🎉");
      setScore(prev => ({ ...prev, p1: prev.p1 + 1 }));
    } else {
      updatedP2Score += 1;
      setResult("PLAYER 2 WINS THIS ROUND! 🎉");
      setScore(prev => ({ ...prev, p2: prev.p2 + 1 }));
    }

    if (updatedP1Score === 5) {
      setGameOver(true);
      setFinalWinner('Player 1');
      setResult("🏆 PLAYER 1 IS THE ULTIMATE CHAMPION! 🏆");
    } else if (updatedP2Score === 5) {
      setGameOver(true);
      setFinalWinner('Player 2');
      setResult("🏆 PLAYER 2 IS THE ULTIMATE CHAMPION! 🏆");
    }
  };

  const nextRound = () => {
    if (gameOver) return;
    setP1Choice(null);
    setP2Choice(null);
    setCurrentTurn(1);
    setRoundResolved(false);
    setResult("Player 1, Make your move! 🕹️");
  };

  const resetGame = () => {
    setP1Choice(null);
    setP2Choice(null);
    setCurrentTurn(1);
    setScore({ p1: 0, p2: 0 });
    setResult("Player 1, Make your move! 🕹️");
    setGameOver(false);
    setFinalWinner(null);
    setRoundResolved(false);
    setAnimateKey(prev => prev + 1);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(74, 20, 140, 0.85), rgba(26, 35, 126, 0.95)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflowY: 'auto', 
        p: { xs: 1.5, sm: 3 },
        position: 'relative'
      }}
    >
      {/* ⬅️ BACK BUTTON (இடது மேல் மூலையில் நிலையாக இருக்கும்) */}
     <Link to={'/'}> <IconButton
        component={motion.button}
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
          zIndex: 20
        }}
      >
        <ArrowBackIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />
      </IconButton></Link>

      <Container maxWidth="sm" sx={{ p: { xs: 0, sm: 2 }, mt: { xs: 6, sm: 0 } }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
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
              <GroupIcon sx={{ fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#ffb300' }} />
              <Typography variant="h4" fontWeight="900" letterSpacing={{ xs: 1, sm: 2 }} color="#1a237e" sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem' } }}>
                P1 VS P2: SHOWDOWN
              </Typography>
            </Stack>

            {/* Score Board */}
            <Card elevation={6} sx={{ mb: { xs: 2, sm: 4 }, py: { xs: 1.5, sm: 3 }, bgcolor: '#4a148c', color: 'white', borderRadius: 5 }}>
              <Stack 
                direction="row" 
                justifyContent="center" 
                alignItems="center" 
                divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: { xs: 1.5, sm: 4 } }} />}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: '900', fontSize: { xs: '0.8rem', sm: '1.2rem' } }}>PLAYER 1</Typography>
                  <Typography variant="h2" fontWeight="bold" color={score.p1 >= 4 ? '#00e5ff' : 'white'} sx={{ fontSize: { xs: '2.2rem', sm: '3.75rem' } }}>{score.p1}/5</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: '900', fontSize: { xs: '0.8rem', sm: '1.2rem' } }}>PLAYER 2</Typography>
                  <Typography variant="h2" fontWeight="bold" color={score.p2 >= 4 ? '#ff1744' : 'white'} sx={{ fontSize: { xs: '2.2rem', sm: '3.75rem' } }}>{score.p2}/5</Typography>
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
                    position: 'absolute', top: '15%', left: '5%', right: '5%',
                    backgroundColor: 'rgba(255, 215, 0, 0.98)', padding: '40px 15px', borderRadius: '24px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.4)', zIndex: 10, border: '4px solid #fff'
                  }}
                >
                  <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <span style={{ fontSize: '5rem' }}>🏆</span>
                  </motion.div>
                  <Typography variant="h4" fontWeight="900" color="#1a237e" sx={{ mt: 2, fontSize: { xs: '1.4rem', sm: '2.1rem' } }}>
                    {finalWinner ? finalWinner.toUpperCase() : ''} IS THE CHAMPION!
                  </Typography>
                  <Button variant="contained" onClick={resetGame} sx={{ mt: 3, bgcolor: '#1a237e', color: '#fff', fontWeight: 'bold', p: '10px 20px', borderRadius: 3 }}>Play Again</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Versus Play Arena */}
            <Box 
              sx={{ 
                display: 'flex', justifyContent: 'space-around', alignItems: 'center', 
                my: { xs: 2.5, sm: 4 }, p: { xs: 1.5, sm: 3 }, 
                bgcolor: 'rgba(74, 20, 140, 0.04)', borderRadius: 6,
                border: '2.5px dashed #4a148c', opacity: gameOver ? 0.2 : 1
              }}
            >
              {/* Player 1 Choice Box */}
              <Box sx={{ width: { xs: 100, sm: 150 }, textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={animateKey + (p1Choice?.name || 'p1')}>
                    {p1Choice ? (
                      roundResolved ? (
                        <Box component="img" src={p1Choice.img} alt="P1" sx={{ width: '100%', height: { xs: 70, sm: 100 }, borderRadius: 3, objectFit: 'cover', border: '3px solid #4a148c', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                      ) : (
                        <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#b39ddb', borderRadius: 3, color: '#fff' }}><Typography variant="subtitle2" fontWeight="bold">Ready 🔒</Typography></Box>
                      )
                    ) : (
                      <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e0e0e0', borderRadius: 3 }}><Typography variant="h4">👤</Typography></Box>
                    )}
                  </motion.div>
                </AnimatePresence>
                <Typography variant="subtitle1" fontWeight="900" color="#4a148c" sx={{ mt: 0.5, fontSize: { xs: '0.85rem', sm: '1rem' } }}>Player 1</Typography>
              </Box>
              
              <Typography variant="h3" color="error" fontWeight="900" sx={{ fontStyle: 'italic', fontSize: { xs: '1.8rem', sm: '3rem' } }}>VS</Typography>
              
              {/* Player 2 Choice Box */}
              <Box sx={{ width: { xs: 100, sm: 150 }, textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={animateKey + (p2Choice?.name || 'p2')}>
                    {p2Choice ? (
                      roundResolved ? (
                        <Box component="img" src={p2Choice.img} alt="P2" sx={{ width: '100%', height: { xs: 70, sm: 100 }, borderRadius: 3, objectFit: 'cover', border: '3px solid #4a148c', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                      ) : (
                        <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#b39ddb', borderRadius: 3, color: '#fff' }}><Typography variant="subtitle2" fontWeight="bold">Ready 🔒</Typography></Box>
                      )
                    ) : (
                      <Box sx={{ height: { xs: 70, sm: 100 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e0e0e0', borderRadius: 3 }}><Typography variant="h4">👤</Typography></Box>
                    )}
                  </motion.div>
                </AnimatePresence>
                <Typography variant="subtitle1" fontWeight="900" color="#4a148c" sx={{ mt: 0.5, fontSize: { xs: '0.85rem', sm: '1rem' } }}>Player 2</Typography>
              </Box>
            </Box>

            {/* Turn & Result Alert Message */}
            <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, color: '#4a148c', fontWeight: '900', minHeight: '55px', fontSize: { xs: '1.05rem', sm: '1.3rem' } }}>
              {result}
            </Typography>

            {/* NEXT ROUND BUTTON */}
            {roundResolved && !gameOver && (
              <Button 
                variant="contained" onClick={nextRound} component={motion.button} whileTap={{ scale: 0.9 }}
                sx={{ mb: { xs: 2.5, sm: 3 }, bgcolor: '#ffb300', color: '#1a237e', fontWeight: '900', borderRadius: 3, px: 4, py: 1, '&:hover': { bgcolor: '#ffa000' } }}
              >
                NEXT ROUND ➡️
              </Button>
            )}

            <Divider sx={{ mb: { xs: 2, sm: 3 } }} />

            {/* 🎮 ACTION INPUT BUTTONS */}
            <Typography variant="caption" display="block" sx={{ mb: 1, fontWeight: 'bold', color: 'textSecondary', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              {roundResolved ? "ROUND FINISHED" : `CURRENT TURN: PLAYER ${currentTurn}`}
            </Typography>
            
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} justifyContent="center">
              {choices.map((item) => (
                <Button
                  key={item.name} component={motion.button}
                  whileHover={(!gameOver && !roundResolved) ? { scale: 1.05, y: -5 } : {}} 
                  whileTap={(!gameOver && !roundResolved) ? { scale: 0.95 } : {}}
                  variant="contained" onClick={() => handleSelection(item)}
                  disabled={gameOver || roundResolved}
                  sx={{ 
                    flex: 1, borderRadius: { xs: 2.5, sm: 4 }, flexDirection: 'column', p: 0, overflow: 'hidden',
                    bgcolor: '#ffffff', color: '#4a148c', boxShadow: '0px 6px 15px rgba(0,0,0,0.15)', border: '2px solid #e8eaf6',
                    '&:hover': { bgcolor: '#4a148c', color: '#ffffff' },
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
                      filter: (gameOver || roundResolved) ? 'grayscale(100%)' : 'none', 
                      mb: 0.5 
                    }} 
                  />
                  <Typography variant="body1" fontWeight="900" sx={{ pb: { xs: 1, sm: 1.5 }, fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                    {item.name}
                  </Typography>
                </Button>
              ))}
            </Stack>

            {/* Reset Everything */}
            <IconButton 
              component={motion.button} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}
              onClick={resetGame} color="error" 
              sx={{ 
                mt: { xs: 2.5, sm: 4 }, bgcolor: '#ffebee', 
                '&:hover': { bgcolor: '#ffcdd2' }, p: { xs: 1.5, sm: 2 } 
              }}
            >
              <ReplayIcon sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }} />
            </IconButton>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TwoPlayerGame;