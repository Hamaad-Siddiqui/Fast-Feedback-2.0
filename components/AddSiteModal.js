import { useRef } from "react";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/firestore";
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
  useDisclosure,
} from "@chakra-ui/react";

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const { handleSubmit, register } = useForm();
  const onCreateSite = (values) => createSite(values);

  return (
    <>
      <Button fontWeight="medium" maxW="200px" color="Black" onClick={onOpen}>
        Add Your First Site
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
                  name="site"
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
