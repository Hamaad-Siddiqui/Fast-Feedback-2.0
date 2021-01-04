import { useRef, useState } from "react";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";
import { deleteFeedback } from "@/lib/db";
import {
  Button,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function RemoveButton({ feedbackId }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const auth = useAuth();
  const removeFeedback = () => {
    deleteFeedback(feedbackId);
    mutate(
      ["/api/feedback", auth.user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId
          ),
        };
      },
      false
    );
    onClose();
  };
  const cancelRef = useRef();

  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="red"
        aria-label="Delete Feedback"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={removeFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
