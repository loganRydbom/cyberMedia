import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

function App() {
    const tweets = [
        {
            name: "Maya Johnson",
            username: "@maya_codes",
            time: "2m",
            text: "Just got my Vite app running with Chakra UI. The hardest part was realizing components are just fancy building blocks.",
            likes: 14,
            replies: 3,
            tag: "Web Dev",
        },
        {
            name: "Ethan Brooks",
            username: "@ethanbuilds",
            time: "12m",
            text: "Today I learned that a Stack is basically a cleaner way to organize stuff on a page without fighting CSS forever.",
            likes: 22,
            replies: 5,
            tag: "Chakra",
        },
        {
            name: "Ava Smith",
            username: "@ava_secure",
            time: "25m",
            text: "Hardcoding data first actually makes sense. Get the page looking right, then connect real data later.",
            likes: 31,
            replies: 8,
            tag: "Cyber 301",
        },
    ];
    
  return (
    <Box bg="gray.900" minH="100vh" py={8}>
        <Container maxW="650px">
        <VStack gap={5} align="stretch">
            <Box bg="gray.800" p={6} borderRadius="2xl" boxShadow="md">
                <Heading size="lg" color="white">
                    Sneak-Peak
                </Heading>
                <Box bg="gray.800" p={5} borderRadius="2xl" boxShadow="md">
                    <VStack gap={3} align="stretch">
                        <Text fontWeight="bold" color="white">
                            Create a post
                        </Text>
                        <Input
                            placeholder="What's happening?"
                            bg="gray.700"
                            borderColor="gray.600"
                            color="white"
                        />
                        <Button colorScheme="twitter" alignSelf="flex-end">
                            Peak
                        </Button>
                    </VStack>
                    {tweets.map((tweet, index) => (
                        <Box
                            key={index}
                            bg="gray.800"
                            p={5}
                            borderRadius="2xl"
                            boxShadow="md"
                            border="1px solid"
                            borderColor="gray.700"
                        >
                            <HStack align="start" gap={4}>
                                <Avatar.Root>
                                    <Avatar.Fallback name={tweet.name} />
                                </Avatar.Root>

                                <VStack align="stretch" gap={2} flex="1">
                                    <HStack justify="space-between">
                                        <Box>
                                            <HStack>
                                                <Text fontWeight="bold" color="white">
                                                    {tweet.name}
                                                </Text>
                                                <Badge colorScheme="twitter">{tweet.tag}</Badge>
                                            </HStack>
                                            <Text color="gray.400" fontSize="sm">
                                                {tweet.username} · {tweet.time}
                                            </Text>
                                        </Box>
                                    </HStack>

                                    <Text color="white">{tweet.text}</Text>

                                    <HStack gap={6} color="gray.400" fontSize="sm" pt={2}>
                                        <Text>💬 {tweet.replies}</Text>
                                        <Text>❤️ {tweet.likes}</Text>
                                        <Text>🔁 Share</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
            </Box>
            <Text color="gray.400" mt={2}>
                A simple Twitter clone built with Vite and Chakra UI.
            </Text>
        </Box>
      </VStack>
    </Container>
  </Box>
);
}

export default App;