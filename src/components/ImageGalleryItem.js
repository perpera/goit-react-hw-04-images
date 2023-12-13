import { useState } from 'react';
import { Modal } from './Modal';

export const ImageGalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <li className="ImageGalleryItem" onClick={openModal}>
        <img
          src={item.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
        />
      </li>
      {isModalOpen && (
        <Modal item={item} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
