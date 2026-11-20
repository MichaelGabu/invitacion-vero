import { useRef, useState } from 'react'
import type { AlbumPhoto } from '../../invitacion'
import retrato from '../../assets/images/album/demo-0.webp'
import jardin from '../../assets/images/album/demo-1.webp'
import faroles from '../../assets/images/album/demo-2.webp'
import './carousel.css'

const demoPhotos: AlbumPhoto[] = [
  { src: retrato, alt: 'Retrato de muestra de una quinceañera con un ramo de flores lavanda' },
  { src: jardin, alt: 'La quinceañera de muestra camina por un jardín con vestido lila' },
  { src: faroles, alt: 'La quinceañera de muestra sonríe bajo los faroles del jardín' },
]

export default function PhotoCarousel({ photos }: { photos: AlbumPhoto[] }) {
  const slides = photos.length ? photos : demoPhotos
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function move(step: number) {
    if (!track.current) return
    const next = (active + step + slides.length) % slides.length
    track.current.scrollTo({ left: next * track.current.clientWidth })
  }

  return (
    <section className="section album" aria-labelledby="album-title" aria-roledescription="carrusel"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
      <h2 id="album-title">Mis recuerdos</h2>
      <div className="album__frame">
        <div ref={track} className="album__track" tabIndex={slides.length > 1 ? 0 : -1}
          role="group" aria-label="Fotografías del álbum"
          onScroll={({ currentTarget }) => {
            setActive(Math.round(currentTarget.scrollLeft / currentTarget.clientWidth))
          }}>
          {slides.map((photo, index) => (
            <img key={index} src={photo.src} alt={photo.alt} loading="lazy" />
          ))}
        </div>
      </div>
      {slides.length > 1 && <div className="album__controls">
        <button type="button" aria-label="Foto anterior" onClick={() => move(-1)}>‹</button>
        <span aria-live="polite" aria-atomic="true">Foto {active + 1} de {slides.length}</span>
        <button type="button" aria-label="Foto siguiente" onClick={() => move(1)}>›</button>
      </div>}
    </section>
  )
}
