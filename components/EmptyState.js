import { Flex, Heading, Text } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";
import DashboardShell from "./DashboardShell";

const EmptyState = () => (
  <DashboardShell>
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading color="Black" size="lg" mb={2}>
        You haven't added any sites.
      </Heading>
      <Text mb={4} color="Black">
        Welcome 👋 Let's get started.
      </Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
);
export default EmptyState;
