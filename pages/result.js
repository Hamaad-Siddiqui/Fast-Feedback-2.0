import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";

const ResultPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useSWR(
    router.query.session_id && user
      ? [`/api/checkout_session/${router.query.session_id}`, user.token]
      : null,
    fetcher
  );
  if (data?.error) return <Center h="100vh">{data.error}</Center>;
  else if (data) {
    router.push("/dashboard");
    return toast({
      title: "Successfully Subscribed",
      description: "Premium plan has been activated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } else if (!data) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
};

export default ResultPage;
