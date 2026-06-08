import React from 'react';
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import GameIcon from '@mui/icons-material/EmojiEvents';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(15, 12, 30, 0.85), rgba(41, 128, 185, 0.9)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        p: { xs: 1.5, sm: 3 }, // மொபைலில் அவுட்டர் பேடிங் குறைக்கப்பட்டுள்ளது
        overflowY: 'auto'
      }}
    >
      <Container maxWidth="sm" sx={{ p: { xs: 0, sm: 2 } }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              p: { xs: 3, sm: 6 }, // மொபைலில் இன்னர் பேடிங் குறைக்கப்பட்டுள்ளது
              borderRadius: { xs: 6, sm: 8 }, // மொபைலில் ரேடியஸ் லேசாகக் குறைக்கப்பட்டுள்ளது
              textAlign: 'center', 
              backgroundColor: '#ffffff', 
              border: { xs: '3px solid rgba(255, 255, 255, 0.8)', sm: '5px solid rgba(255, 255, 255, 0.8)' },
              boxShadow: '0px 25px 70px rgba(0,0,0,0.4)',
              width: '100%'
            }}
          >
            {/* மெயின் லோகோ / ஐகான் */}
            <GameIcon sx={{ fontSize: { xs: '4rem', sm: '5rem' }, color: '#ffb300', mb: 2 }} />
            
            {/* கேம் தலைப்பு */}
            <Typography variant="h3" fontWeight="900" color="#1a237e" sx={{ fontSize: { xs: '1.6rem', sm: '2.5rem' }, mb: 1, letterSpacing: 1 }}>
              ROCK PAPER SCISSORS
            </Typography>
            
            <Typography variant="body1" color="textSecondary" fontWeight="bold" sx={{ mb: { xs: 4, sm: 5 }, fontSize: { xs: '0.85rem', sm: '1rem' } }}>
              Select Game Mode to Start the Battle! ⚡
            </Typography>

            {/* 🎮 இரண்டு ப்ளே பட்டன்கள் (Responsive Layout) */}
            <Stack spacing={{ xs: 2, sm: 3 }} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" sx={{ width: '100%' }}>
              
              {/* பட்டன் 1: VS COMPUTER */}
              <Link to={'/cpu'} style={{ textDecoration: 'none', flex: 1, width: '100%' }}>
                <Button
                  component={motion.button} 
                  whileHover={{ scale: 1.03, y: -3 }} 
                  whileTap={{ scale: 0.97 }}
                  variant="contained" 
                  fullWidth // மொபைலில் முழு அகலத்தை எடுக்க உதவும்
                  startIcon={<ComputerIcon sx={{ fontSize: { xs: '1.5rem !important', sm: '2rem !important' } }} />}
                  sx={{ 
                    py: { xs: 2, sm: 3.5 }, // மொபைல் ஸ்கிரீனுக்கு தகுந்தவாறு உயரம் மாற்றப்பட்டுள்ளது
                    borderRadius: 4, 
                    fontSize: { xs: '1rem', sm: '1.2rem' }, 
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #1a237e, #3f51b5)', 
                    boxShadow: '0 8px 20px rgba(26,35,126,0.3)',
                    textTransform: 'uppercase'
                  }}
                >
                  YOU VS CPU
                </Button>
              </Link>

              {/* பட்டன் 2: TWO PLAYERS */}
              <Link to={'/twoplay'} style={{ textDecoration: 'none', flex: 1, width: '100%' }}>
                <Button
                  component={motion.button} 
                  whileHover={{ scale: 1.03, y: -3 }} 
                  whileTap={{ scale: 0.97 }}
                  variant="contained" 
                  fullWidth // மொபைலில் முழு அகலத்தை எடுக்க உதவும்
                  startIcon={<GroupIcon sx={{ fontSize: { xs: '1.5rem !important', sm: '2rem !important' } }} />}
                  sx={{ 
                    py: { xs: 2, sm: 3.5 }, 
                    borderRadius: 4, 
                    fontSize: { xs: '1rem', sm: '1.2rem' }, 
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #4a148c, #8e24aa)', 
                    boxShadow: '0 8px 20px rgba(74,20,140,0.3)',
                    textTransform: 'uppercase'
                  }}
                >
                  2 PLAYERS
                </Button>
              </Link>

            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;