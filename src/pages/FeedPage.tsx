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
//import postData from "./data/posts.json";
import type { Post } from "../types/post";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

function App() {
    // "Posts" is the current list of posts shown
    // "setPost" is how React updates what is shown
    // Start with tweets from JSON file
    const [posts, setPost] = useState<Post[]>([]);

    // "Input" is what is currently typed in the box
    // setInput is how React knows about newly typed data
    const [input, setInput] = useState("")

    const handlePeakclick = () => {
        if (!input.trim()) return;
        const newPost: Post = {
            id: Date.now(),
            name: "Guest",
            username: "guestAccount",
            createdAt: new Date().toISOString(),
            text: input.trim(),
            likes: 0,
            replies: 0,
            tag: "Product Development"
        }
        setPost([newPost, ...posts]);
        setInput("");
    }

    useEffect(() => {
        async function load() {
            const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

            if (error) console.error(error);
            else setPost(data || []);
        }

        load();
    }, []);
    // Save the current time once during this render.
    const currentTime = new Date().toISOString();

    // Helper function that turns a date into "now", "2m", "3h", or "2d".
    const timeAgo = (iso?: string) => {
        if (!iso) return "now";
        const diff = new Date(currentTime).getTime() - new Date(iso).getTime();
        const sec = Math.floor(diff / 1000);
        if (sec < 60) return "now";
        const min = Math.floor(sec / 60);
        if (min < 60) return `${min}m`;
        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr}h`;
        const day = Math.floor(hr / 24);
        return `${day}d`;
    };
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
                            value={input}
                            // Every time a user types, we update
                            onChange={(userInput) => setInput(userInput.target.value)}
                        />
                        <Button colorScheme="twitter" alignSelf="flex-end" 
                        // When clicked, run code
                        onClick={handlePeakclick}
                        >
                            Post
                        </Button>
                    </VStack>
                </Box>
                    {posts.map((post, index) => (
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
                                    <Avatar.Fallback name={post.name} />
                                </Avatar.Root>

                                <VStack align="stretch" gap={2} flex="1">
                                    <HStack justify="space-between">
                                        <Box>
                                            <HStack>
                                                <Text fontWeight="bold" color="white">
                                                    {post.name}
                                                </Text>
                                                <Badge colorScheme="twitter">{post.tag}</Badge>
                                            </HStack>
                                            <Text color="gray.400" fontSize="sm">
                                                {post.username} · {timeAgo(post.createdAt)}
                                            </Text>
                                        </Box>
                                    </HStack>

                                    <Text color="white">{post.text}</Text>

                                    <HStack gap={6} color="gray.400" fontSize="sm" pt={2}>
                                        <Text>💬 {post.replies}</Text>
                                        <Text>❤️ {post.likes}</Text>
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
        {//</Box>
        }
      </VStack>
    </Container>
  </Box>
);
}

export default App;