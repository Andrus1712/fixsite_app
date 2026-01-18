import React from 'react';
import { ImageGallery } from './ImageGallery';
import { Card } from '../Card';

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
];

const ImageGalleryExample: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>ImageGallery Component Examples</h2>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Default Gallery (80px thumbnails)</h3>
        <ImageGallery images={sampleImages} />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Larger Thumbnails (120px)</h3>
        <ImageGallery images={sampleImages} thumbnailSize={120} />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Small Thumbnails (60px)</h3>
        <ImageGallery images={sampleImages} thumbnailSize={60} />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Large Modal</h3>
        <ImageGallery images={sampleImages} modalSize="xl" />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Without Counter</h3>
        <ImageGallery images={sampleImages} showCounter={false} />
      </Card>

      <Card>
        <h3>Few Images</h3>
        <ImageGallery images={sampleImages.slice(0, 2)} />
      </Card>
    </div>
  );
};

export default ImageGalleryExample;