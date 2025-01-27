import { useRef } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    const { id } = createSite(newSite);
    toast({
      title: "Success",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(
      ["/api/sites", auth.user.token],
      async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
      false
    );
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onCreateSite)}>
          <ModalContent>
            <ModalHeader>Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="My site"
                  name="name"
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="https://website.com"
                  name="url"
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3} fontWeight="medium">
                Cancel
              </Button>
              <Button
                color="#194D4C"
                backgroundColor="#99FFFE"
                fontWeight="medium"
                type="submit"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddSiteModal;
