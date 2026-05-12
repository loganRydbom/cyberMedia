import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box bg="gray.800" p={6} borderRadius="2xl" boxShadow="md">
      <VStack gap={4} align="stretch">
        <Heading size="lg" color="white">
          Welcome to Yapper
        </Heading>
        <Text color="gray.400">
          Head over to the feed to view posts and create your own.
        </Text>
      </VStack>
    </Box>
  );
}