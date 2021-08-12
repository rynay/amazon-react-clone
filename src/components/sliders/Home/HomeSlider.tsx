import { useEffect } from 'react'
import { useState, useMemo } from 'react'
import s from './HomeSlider.module.scss'

const HomeSlider = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = useMemo(
    () => [
      '/slide-0.jpg',
      '/slide-1.jpg',
      '/slide-2.jpg',
      '/slide-3.jpg',
      '/slide-4.jpg',
      '/slide-5.jpg',
    ],
    []
  )
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < 5) {
        setCurrentImage((current) => current + 1)
      } else if (currentImage === 5) {
        setCurrentImage(0)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [currentImage])
  return (
    <div className={s.slider}>
      <div className={s.slider__overlay}></div>
      {images.map((image, i) => (
        <img
          key={image}
          src={image}
          className={
            i === currentImage
              ? s['slider__image--current']
              : i === currentImage + 1 || (i === 0 && currentImage === 5)
              ? s['slider__image--next']
              : i === currentImage - 1
              ? s['slider__image--previous']
              : s['slider__image']
          }
          alt=""
        />
      ))}
    </div>
  )
}

export default HomeSlider
