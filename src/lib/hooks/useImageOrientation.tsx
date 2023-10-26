import { useEffect, useState } from 'react';
import { useImageSize } from 'react-image-size';

interface ImageProps {
  imageUrl: string;
}

export default function useImageOrientation({ imageUrl }: ImageProps) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [dimensions, { loading, error }] = useImageSize(imageUrl);
  useEffect(() => {
    if (dimensions) {
      if (dimensions?.width > dimensions?.height) {
        setIsLandscape(true); // Landscape
      } else {
        setIsLandscape(false); // Portrait
      }
    }
  }, [dimensions]);

  return [isLandscape, { loading, error }];
}
