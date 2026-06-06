import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

type HangmanKeyboardProps = {
  guessedLetters: Set<string>;
  targetWord: string;
  disabled?: boolean;
  onGuess: (letter: string) => void;
};

export function HangmanKeyboard({ guessedLetters, targetWord, disabled = false, onGuess }: HangmanKeyboardProps) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap="6px" maxW="500px" mx="auto">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        const isCorrect = targetWord.includes(letter);
        let bg = 'whiteAlpha.200';
        let color = 'white';
        let border = '1px solid';
        let borderColor = 'whiteAlpha.400';

        if (isGuessed && isCorrect) {
          bg = 'green.600';
          borderColor = 'green.400';
        } else if (isGuessed && !isCorrect) {
          bg = 'whiteAlpha.50';
          color = 'whiteAlpha.400';
          borderColor = 'whiteAlpha.200';
        }

        return (
          <Button
            key={letter}
            onClick={() => onGuess(letter)}
            isDisabled={isGuessed || disabled}
            bg={bg}
            color={color}
            border={border}
            borderColor={borderColor}
            size="sm"
            minW="36px"
            h="36px"
            px={0}
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="14px"
            _hover={{ bg: isGuessed ? bg : 'whiteAlpha.400' }}
            _disabled={{ opacity: 1, cursor: 'not-allowed' }}
          >
            {letter}
          </Button>
        );
      })}
    </Box>
  );
}
