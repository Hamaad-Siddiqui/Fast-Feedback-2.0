import Head from "next/head";
import { Button, Flex } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
      >
        <Head>
          <title>Fast Feedback</title>
        </Head>
        <Logo size={"64px"} />
        {auth.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </>
  );
}
