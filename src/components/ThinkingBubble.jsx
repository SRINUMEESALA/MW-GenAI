import React from 'react';
import {
  Button, // Add to imports
  Container,
  Grid,
  IconButton,
  Box,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import {
  keyframes, // Add this import
  styled,
} from '@mui/system';
import { useTheme } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ThinkingBubble = () => {
  const theme = useTheme();
  return <ThinkingBubbleStyled theme={theme} sx={{ marginBottom: '-5px' }} />;
};

export default ThinkingBubble;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ThinkingBubbleStyled = styled(MoreHorizIcon)`
  animation: ${pulse} 1s ease-in-out infinite;
  margin-bottom: -5px;
`;
