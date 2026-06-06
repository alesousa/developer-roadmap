import React from 'react';
import { Box, Text } from '@chakra-ui/react';

type HangmanWordProps = {
  word: string;
  guessedLetters: Set<string>;
  revealed?: boolean;
};

export function HangmanWord({ word, guessedLetters, revealed = false }: HangmanWordProps) {
  return (
    <Box display="flex" justifyContent="center" gap="8px" flexWrap="wrap" my={6}>
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.has(letter);
        const show = isGuessed || revealed;
        return (
          <Box
            key={index}
            borderBottom="3px solid"
            borderColor="whiteAlpha.700"
            minW="32px"
            textAlign="center"
            pb={1}
          >
            <Text
              fontSize={['20px', '24px', '28px']}
              fontWeight="bold"
              color={!isGuessed && revealed ? 'red.400' : 'white'}
              visibility={show ? 'visible' : 'hidden'}
              fontFamily="mono"
              textTransform="uppercase"
            >
              {letter}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
