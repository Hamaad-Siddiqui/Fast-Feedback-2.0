import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex width="100%" backgroundColor="white" borderRadius="8px" p={8}>
      <Heading color="Black" size="md">
        Get feedback on your site instantly.
      </Heading>
      <Text color="Black">Start today, then grow with us 🌱</Text>
      <Button fontWeight="medium" variant="solid" size="md" color="Black">
        Upgrade to Starter
      </Button>
    </Flex>
  </DashboardShell>
);
export default FreePlanEmptyState;
