import Head from "next/head";
import { Box, Button, Flex, Stack, Heading } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import GitHub from "@/components/Logo/Github";
import Logo from "@/components/Logo/Logo";
import Google from "@/components/Logo/Google";

export default function Home() {
  const auth = useAuth();
  return (
    <Box bg="gray.100">
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
        margin="0 auto"
      >
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
              window.location.href = "/dashboard"
            }
          `,
            }}
          />
          <title>Fast Feedback</title>
        </Head>
        <Logo mb={2} size="64px" />
        <Heading m={5}>Fast Feedback</Heading>
        <Stack>
          <Button
            onClick={() => auth.signinWithGitHub()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            leftIcon={<GitHub />}
            mt={4}
            size="lg"
            _hover={{ bg: "gray.700" }}
            _active={{
              bg: "gray.800",
              transform: "scale(0.95)",
            }}
          >
            Sign In with GitHub
          </Button>
          <Button
            onClick={() => auth.signinWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            leftIcon={<Google />}
            mt={4}
            size="lg"
            _hover={{ bg: "gray.100" }}
            _active={{
              bg: "gray.100",
              transform: "scale(0.95)",
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
