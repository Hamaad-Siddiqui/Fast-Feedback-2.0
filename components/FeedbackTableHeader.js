import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function FeedbackTableHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Feedback</Heading>
      </Flex>
    </>
  );
}
