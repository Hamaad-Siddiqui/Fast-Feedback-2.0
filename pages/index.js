import Head from "next/head";
import { Box, Button, Flex, Text, Link, Stack } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import GitHub from "@/components/Logo/Github";
import Logo from "@/components/Logo/Logo";
import Google from "@/components/Logo/Google";
import { getAllFeedback } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";

const SITE_ID = "BJBg64firvBoKD4jd3Jx";

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  };
}

export default function Home({ allFeedback }) {
  const auth = useAuth();
  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
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
          <Logo mb={2} size="48px" />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
            {" is being built as part of "}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Stack isInline mt={4}>
              <Button
                onClick={() => auth.signinWithGitHub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<GitHub />}
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
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
}
