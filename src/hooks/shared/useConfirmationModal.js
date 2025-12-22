import { useState } from "react";

/**
 * Custom hook to manage a confirmation modal
 * @param {string} defaultTitle - default title for modal
 * @param {string} defaultMessage - default message for modal
 * @returns {object} modal state and helper functions
 */
export function useConfirmationModal(defaultTitle = "Confirm", defaultMessage = "Are you sure?") {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState(defaultMessage);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});

  const open = (callback, customTitle, customMessage) => {
    setTitle(customTitle || defaultTitle);
    setMessage(customMessage || defaultMessage);
    setOnConfirmCallback(() => callback);
    setShow(true);
  };

  const confirm = () => {
    setShow(false);
    onConfirmCallback();
  };

  const cancel = () => setShow(false);

  return {
    show,
    title,
    message,
    open,
    confirm,
    cancel,
  };
}
