import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import Logo from "./Logo";

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="row"
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline align="center">
          <Logo size="24px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth.user.photoUrl} />
        </Flex>
      </Flex>
      <Flex
        color="blackAlpha.500"
        backgroundColor="#EDF2F7"
        p={8}
        height="100vh"
      >
        <Flex
          width="100%"
          maxWidth="800px"
          ml="auto"
          mr="auto"
          direction="column"
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="black">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color="Black" mb={4}>
            My Sites
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
