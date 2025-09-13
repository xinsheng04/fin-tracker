import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen = false, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleCancel = (event: Event) => {
    event.preventDefault(); // Prevent default close behavior
    onClose?.();
  };
  const handleClick = (event: MouseEvent) => {
    // If the click is on the <dialog> itself (the backdrop), close
    if (event.target === modalRef.current) {
      onClose?.();
    }
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
    modal?.addEventListener("cancel", handleCancel);
    modal?.addEventListener("mousedown", handleClick);
    return () => {
      modal?.removeEventListener("cancel", handleCancel);
      modal?.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <dialog className={styles.modal} ref={modalRef}>
      <div className={styles.content}>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;