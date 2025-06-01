import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, CircularProgress, Box, Fade, IconButton, Modal, Avatar, Chip } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function Profile({ onBack }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem('userID'); 
    if (!userID) {
      setError('User ID not found. Please log in again.');
      return;
    }

    fetch(`${process.env.PUBLIC_URL}/userData.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const user = data.find(user => user.ID.toString() === userID);
        if (user) {
          setUserData(user);
        } else {
          throw new Error('User data not found');
        }
      })
      .catch(error => {
        console.error('Error loading user data:', error);
        setError(error.message);
      });
  }, []);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={40} thickness={4} />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading your profile...</Typography>
      </Container>
    );
  }

  const badgeGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  ];

  return (
    <Box sx={{ flexGrow: 1, background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 100%)', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Button 
              startIcon={<ArrowBack />} 
              onClick={onBack} 
              sx={{ 
                mb: 3,
                color: 'text.secondary',
                '&:hover': { backgroundColor: 'rgba(71, 85, 105, 0.05)' }
              }}
            >
              Back to Home
            </Button>

            {/* Main Profile Card */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(71, 85, 105, 0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Header Section with Gradient */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
                  color: 'white',
                  p: 4,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="5"/%3E%3Ccircle cx="53" cy="53" r="5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        mr: 3,
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      {userData.Name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                        {userData.Name}
                      </Typography>
                      <Chip 
                        label={userData.Position} 
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)',
                        }} 
                      />
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    {userData.Affiliation}
                  </Typography>
                </Box>
              </Box>

              {/* Research Interests Section */}
              <Box sx={{ p: 4 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600, 
                    color: 'text.primary',
                    textAlign: 'center'
                  }}
                >
                  Research Interests
                </Typography>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                  gap: 2 
                }}>
                  {userData.researcher_badges.research_interests.map((badge, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.02)',
                        }
                      }}
                      onClick={() => handleBadgeClick(badge)}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          margin: '0 auto 12px',
                          background: badgeGradients[index % badgeGradients.length],
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 6px 20px -6px rgba(0, 0, 0, 0.2)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                          },
                          '&:hover': {
                            boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.3)',
                          }
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={badge.font_awesome_icon} 
                          style={{ 
                            fontSize: '1.8rem', 
                            color: 'white',
                            position: 'relative',
                            zIndex: 1,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }} 
                        />
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'text.primary',
                          lineHeight: 1.2,
                          fontSize: '0.75rem',
                          display: 'block'
                        }}
                      >
                        {badge.research_interest_title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>

        {/* Enhanced Modal */}
        {modalOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
              p: 2,
            }}
            onClick={handleCloseModal}
          >
            <Fade in={modalOpen} timeout={300}>
              <Paper
                sx={{
                  maxWidth: 400,
                  width: '100%',
                  p: 4,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid rgba(71, 85, 105, 0.1)',
                  outline: 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: 'text.primary',
                    textAlign: 'center'
                  }}
                >
                  {selectedBadge?.research_interest_title}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    lineHeight: 1.6,
                    color: 'text.secondary',
                    textAlign: 'justify',
                    mb: 3
                  }}
                >
                  {selectedBadge?.research_interest_long_description}
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Button 
                    onClick={handleCloseModal}
                    variant="contained"
                    size="small"
                  >
                    Close
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Profile;