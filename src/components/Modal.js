import ReactModal from 'react-modal';
import { useEffect } from 'react';

ReactModal.setAppElement('#root');

export const Modal = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = event => {
    if (event.target.className === 'Overlay') {
      onClose();
    }
  };

  return (
    <ReactModal
      className="Modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
    >
      (
      <div className="Overlay" onClick={handleClick}>
        <img src={item.largeImageURL} alt="largeImage" />
      </div>
      )
    </ReactModal>
  );
};
