import React from 'react';
import { Box } from '@chakra-ui/react';

type HangmanDrawingProps = {
  wrongGuesses: number;
};

export function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  return (
    <Box display="flex" justifyContent="center">
      <svg width="200" height="230" viewBox="0 0 200 230">
        {/* Base */}
        <line x1="10" y1="220" x2="150" y2="220" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Vertical pole */}
        <line x1="60" y1="220" x2="60" y2="20" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Horizontal beam */}
        <line x1="60" y1="20" x2="140" y2="20" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Rope */}
        <line x1="140" y1="20" x2="140" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />

        {/* Head */}
        {wrongGuesses >= 1 && (
          <circle cx="140" cy="65" r="16" stroke="#FC8181" strokeWidth="4" fill="none" />
        )}
        {/* Body */}
        {wrongGuesses >= 2 && (
          <line x1="140" y1="81" x2="140" y2="140" stroke="#FC8181" strokeWidth="4" strokeLinecap="round" />
        )}
        {/* Left arm */}
        {wrongGuesses >= 3 && (
          <line x1="140" y1="100" x2="110" y2="125" stroke="#FC8181" strokeWidth="4" strokeLinecap="round" />
        )}
        {/* Right arm */}
        {wrongGuesses >= 4 && (
          <line x1="140" y1="100" x2="170" y2="125" stroke="#FC8181" strokeWidth="4" strokeLinecap="round" />
        )}
        {/* Left leg */}
        {wrongGuesses >= 5 && (
          <line x1="140" y1="140" x2="110" y2="175" stroke="#FC8181" strokeWidth="4" strokeLinecap="round" />
        )}
        {/* Right leg */}
        {wrongGuesses >= 6 && (
          <line x1="140" y1="140" x2="170" y2="175" stroke="#FC8181" strokeWidth="4" strokeLinecap="round" />
        )}
      </svg>
    </Box>
  );
}
