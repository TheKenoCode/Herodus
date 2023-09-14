import { useState, useEffect } from 'react'
import { useImageSize } from 'react-image-size'

interface Props {
  // define your props here
}

const useImageOrientation: React.FC<Props> = ({ imageUrl }) => {
  const [isLandscape, setIsLandscape] = useState(false)
  const [dimensions, { loading, error }] = useImageSize(imageUrl)
  useEffect(() => {
    if (dimensions) {
      if (dimensions?.width > dimensions?.height) {
        setIsLandscape(true) // Landscape
        console.log(true)
      } else {
        setIsLandscape(false) // Portrait
        console.log(false)
      }
    }
  }, [dimensions])

  return [isLandscape, { loading, error }]
}

export default useImageOrientation
