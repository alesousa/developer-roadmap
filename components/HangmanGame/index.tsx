import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { HangmanKeyboard } from './HangmanKeyboard';
import { getRandomWord } from './words';

const MAX_WRONG = 6;

export function HangmanGame() {
  const [targetWord, setTargetWord] = useState<string>(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const wrongGuesses = [...guessedLetters].filter(
    (l) => !targetWord.includes(l)
  ).length;

  const isWinner = targetWord
    .split('')
    .every((letter) => guessedLetters.has(letter));
  const isLoser = wrongGuesses >= MAX_WRONG;
  const isGameOver = isWinner || isLoser;

  const guess = useCallback(
    (letter: string) => {
      if (guessedLetters.has(letter) || isGameOver) return;
      setGuessedLetters((prev) => new Set([...prev, letter]));
    },
    [guessedLetters, isGameOver]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) guess(key);
    };
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, [guess]);

  function newGame() {
    setTargetWord(getRandomWord());
    setGuessedLetters(new Set());
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading color="gray.50" fontSize={['24px', '30px']} mb={2}>
            Jogo da Forca
          </Heading>
          <Text color="gray.400" fontSize="14px">
            Adivinhe a palavra relacionada a tecnologia
          </Text>
        </Box>

        <HStack justify="center" spacing={4}>
          <Badge
            colorScheme={wrongGuesses >= 4 ? 'red' : wrongGuesses >= 2 ? 'orange' : 'green'}
            fontSize="14px"
            px={3}
            py={1}
            borderRadius="md"
          >
            Erros: {wrongGuesses} / {MAX_WRONG}
          </Badge>
          <Button size="sm" variant="outline" colorScheme="whiteAlpha" onClick={newGame}>
            Nova Palavra
          </Button>
        </HStack>

        <HangmanDrawing wrongGuesses={wrongGuesses} />

        {isGameOver && (
          <Box
            textAlign="center"
            bg={isWinner ? 'green.800' : 'red.900'}
            border="1px solid"
            borderColor={isWinner ? 'green.500' : 'red.500'}
            borderRadius="lg"
            py={4}
            px={6}
          >
            <Text
              fontSize={['20px', '24px']}
              fontWeight="bold"
              color={isWinner ? 'green.300' : 'red.300'}
              mb={2}
            >
              {isWinner ? '🎉 Parabéns! Você acertou!' : '💀 Game Over!'}
            </Text>
            {isLoser && (
              <Text color="gray.300" fontSize="15px">
                A palavra era:{' '}
                <Text as="span" fontWeight="bold" color="white" textTransform="uppercase">
                  {targetWord}
                </Text>
              </Text>
            )}
            <Button mt={4} colorScheme={isWinner ? 'green' : 'red'} onClick={newGame}>
              Jogar Novamente
            </Button>
          </Box>
        )}

        <HangmanWord
          word={targetWord}
          guessedLetters={guessedLetters}
          revealed={isLoser}
        />

        <Box>
          <Text color="gray.500" fontSize="12px" textAlign="center" mb={3}>
            Clique nas letras ou use o teclado
          </Text>
          <HangmanKeyboard
            guessedLetters={guessedLetters}
            targetWord={targetWord}
            disabled={isGameOver}
            onGuess={guess}
          />
        </Box>
      </VStack>
    </Container>
  );
}
