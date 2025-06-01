import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Fade, 
  Grid, 
  CircularProgress,
  Paper,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PartnerDetails from './PartnerDetails';

function PartnerProfile({ partnerData, onBack, userData }) {
  const [talkingPoints, setTalkingPoints] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (partnerData && partnerData.id) {
      const userID = localStorage.getItem('userID');
      
      // Fetch talking points from pairData.json
      fetch(`${process.env.PUBLIC_URL}/pairData.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Get the partner info from pairData structure
          const partnerInfo = data[userID] && data[userID][partnerData.id];
          
          if (partnerInfo) {
            setTalkingPoints({
              opening_line: partnerInfo.opening_line,
              discussion_points: partnerInfo.discussion_points
            });
          } else {
            throw new Error('Talking points not found for this pair');
          }
        })
        .catch(error => {
          console.error('Error fetching talking points:', error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [partnerData]);

  if (!partnerData) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No student selected
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 100%)', 
      minHeight: '100vh' 
    }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
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
              Back to Search
            </Button>

            <Grid container spacing={4}>
              {/* Student Profile Section */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    height: 'fit-content',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(71, 85, 105, 0.1)',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: 'primary.main',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {partnerData.Name ? 
                        partnerData.Name.split(' ').map(n => n[0]).join('').slice(0, 2) : 
                        <PersonIcon sx={{ fontSize: '2rem' }} />
                      }
                    </Avatar>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: 'text.primary'
                      }}
                    >
                      {partnerData.Name || 'Unknown Student'}
                    </Typography>
                    
                    {partnerData.Position && (
                      <Chip 
                        label={partnerData.Position}
                        sx={{ 
                          backgroundColor: 'primary.light',
                          color: 'white',
                          fontWeight: 600,
                          mb: 2
                        }}
                      />
                    )}
                    
                    {partnerData.Affiliation && (
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {partnerData.Affiliation}
                      </Typography>
                    )}
                  </Box>

                  <PartnerDetails partnerData={partnerData} />
                </Paper>
              </Grid>

              {/* Talking Points Section */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(71, 85, 105, 0.1)',
                    height: 'fit-content'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      color: 'text.primary',
                      textAlign: 'center'
                    }}
                  >
                    Conversation Starters
                  </Typography>

                  {isLoading ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <CircularProgress size={40} thickness={4} />
                      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                        Generating personalized talking points...
                      </Typography>
                    </Box>
                  ) : error ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="error" variant="h6" sx={{ mb: 1 }}>
                        Unable to Load
                      </Typography>
                      <Typography color="text.secondary">
                        {error}
                      </Typography>
                    </Box>
                  ) : talkingPoints ? (
                    <Box>
                      {/* Opening Line */}
                      {talkingPoints.opening_line && (
                        <Box sx={{ mb: 4 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              mb: 2, 
                              fontWeight: 600,
                              color: 'primary.main'
                            }}
                          >
                            💬 Opening Line
                          </Typography>
                          <Paper 
                            sx={{ 
                              p: 3,
                              backgroundColor: 'rgba(71, 85, 105, 0.02)',
                              border: '1px solid rgba(71, 85, 105, 0.1)',
                              fontStyle: 'italic'
                            }}
                          >
                            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                              "{talkingPoints.opening_line}"
                            </Typography>
                          </Paper>
                        </Box>
                      )}

                      {/* Discussion Points */}
                      {talkingPoints.discussion_points && talkingPoints.discussion_points.length > 0 && (
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              mb: 3, 
                              fontWeight: 600,
                              color: 'primary.main'
                            }}
                          >
                            🎯 Discussion Topics
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {talkingPoints.discussion_points.map((point, index) => (
                              <Paper 
                                key={index}
                                sx={{ 
                                  p: 3,
                                  backgroundColor: 'rgba(14, 165, 233, 0.02)',
                                  border: '1px solid rgba(14, 165, 233, 0.1)',
                                  transition: 'all 0.2s ease-in-out',
                                  '&:hover': {
                                    backgroundColor: 'rgba(14, 165, 233, 0.04)',
                                    borderColor: 'rgba(14, 165, 233, 0.2)',
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    lineHeight: 1.7,
                                    color: 'text.primary'
                                  }}
                                >
                                  {point}
                                </Typography>
                              </Paper>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">
                        No talking points available for this student pair.
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default PartnerProfile;