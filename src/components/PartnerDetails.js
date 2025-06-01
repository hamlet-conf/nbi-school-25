import React, { useState } from 'react';
import { Typography, Box, Paper, Fade, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function PartnerDetails({ partnerData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const badgeGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  ];

  if (!partnerData || !partnerData.researcher_badges) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          Research information not available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Research Interests */}
      {partnerData.researcher_badges.research_interests && partnerData.researcher_badges.research_interests.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography 
            variant="h6" 
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
            {partnerData.researcher_badges.research_interests.map((badge, index) => (
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
      )}

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
    </Box>
  );
}

export default PartnerDetails;