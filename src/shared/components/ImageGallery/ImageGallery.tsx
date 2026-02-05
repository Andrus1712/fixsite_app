import React, { useState } from 'react';
import { Modal } from '../Modal';
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';
import {
  GalleryContainer,
  ThumbnailContainer,
  Thumbnail,
  ModalImageContainer,
  ModalImage,
  NavigationButton,
  CloseModalButton,
  ImageCounter,
  LoadingSpinner
} from './ImageGallery.styles';

export interface ImageGalleryProps {
  images: string[];
  thumbnailSize?: number;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
  showCounter?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  thumbnailSize = 80,
  modalSize = 'lg',
  className,
  alt = 'Imagen',
  showCounter = true,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageLoading(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setImageLoading(false);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setImageLoading(true);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setImageLoading(true);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex === null) return;

    switch (e.key) {
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      case 'Escape':
        closeModal();
        break;
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <GalleryContainer className={className}>
        {images.map((image, index) => (
          <ThumbnailContainer key={index}>
            <Thumbnail
              src={`${import.meta.env.VITE_API_BASE_URL}${image}`}
              alt={`${alt} ${index + 1}`}
              thumbnailSize={thumbnailSize}
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </ThumbnailContainer>
        ))}
      </GalleryContainer>

      <Modal
        isOpen={selectedImageIndex !== null}
        onClose={closeModal}
        size={modalSize}
        showCloseButton={false}
        closeOnOverlayClick={true}
      >
        <ModalImageContainer onKeyDown={handleKeyDown} tabIndex={0}>
          {imageLoading && <LoadingSpinner />}
          <ModalImage
            src={selectedImageIndex !== null ? `${import.meta.env.VITE_API_BASE_URL}${images[selectedImageIndex]}` : ''}
            alt={selectedImageIndex !== null ? `${alt} ${selectedImageIndex + 1}` : ''}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />

          {selectedImageIndex !== null && selectedImageIndex > 0 && (
            <NavigationButton
              onClick={goToPrevious}
              position="left"
              aria-label="Imagen anterior"
            >
              <IoChevronBack size={24} />
            </NavigationButton>
          )}

          {selectedImageIndex !== null && selectedImageIndex < images.length - 1 && (
            <NavigationButton
              onClick={goToNext}
              position="right"
              aria-label="Imagen siguiente"
            >
              <IoChevronForward size={24} />
            </NavigationButton>
          )}

          <CloseModalButton onClick={closeModal} aria-label="Cerrar">
            <IoClose size={24} />
          </CloseModalButton>

          {showCounter && selectedImageIndex !== null && (
            <ImageCounter>
              {selectedImageIndex + 1} de {images.length}
            </ImageCounter>
          )}
        </ModalImageContainer>
      </Modal>
    </>
  );
};