import { Box, Button, Flex, Link, Avatar } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import NextLink from "next/link";
import Logo from "./Logo/Logo";

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex>
            <NextLink href="/" passHref>
              <Box>
                <Link>
                  <Logo size="24px" />
                </Link>
              </Box>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={4} ml={6}>
                Sites
              </Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <Button
                as="a"
                href="/"
                variant="ghost"
                mr={2}
                onClick={() => signout()}
              >
                Log Out
              </Button>
            )}
            <NextLink href="/account" passHref>
              <Link>
                <Avatar size="sm" src={user?.photoUrl} />
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
