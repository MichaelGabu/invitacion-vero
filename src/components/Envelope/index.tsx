import { useRef, useState } from 'react'
import { evento } from '../../invitacion'
import portada from '../../assets/images/portada.webp'
import videoPortada from '../../assets/video/portada.mp4'
import './envelope.css'

interface EnvelopeProps {
  guestName: string
  guestSeats?: number
  open: boolean
  onOpen: () => void
}

export default function Envelope({ guestName, guestSeats, open, onOpen }: EnvelopeProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [estado, setEstado] = useState<'listo' | 'reproduciendo' | 'error'>('listo')

  function reproducir() {
    if (estado === 'error') {
      onOpen()
      return
    }
    const video = videoRef.current
    if (!video || estado === 'reproduciendo') return
    setEstado('reproduciendo')
    void video.play().catch(() => setEstado('error'))
  }

  return (
    <main className={open ? 'envelope envelope--open' : 'envelope'} inert={open} aria-hidden={open}>
      <video className="envelope__video" ref={videoRef} poster={portada} src={videoPortada}
        playsInline preload="metadata" aria-hidden="true"
        onEnded={onOpen} onError={() => setEstado('error')}
        onPause={() => {
          if (!videoRef.current?.ended) setEstado(estado => estado === 'reproduciendo' ? 'listo' : estado)
        }} />
      {estado !== 'reproduciendo' && !open && <div className="envelope__overlay">
        <header className="envelope__heading">
          <p className="envelope__kicker">Mis quince años</p>
          <h1>{evento.nombre}</h1>
          {evento.fecha && <p className="envelope__date">{evento.fecha}</p>}
        </header>
        <div className="envelope__recipient">
          <p className="envelope__kicker">{guestSeats ? 'Invitación para' : 'Una carta para'}</p>
          <h2>{guestSeats ? guestName : 'Ti'}</h2>
          {!!guestSeats && <p>{guestSeats} {guestSeats === 1 ? 'lugar reservado' : 'lugares reservados'}</p>}
          {estado === 'error' && <p role="status">No se pudo reproducir el video.</p>}
          <button type="button" className="envelope__play" onClick={reproducir}>
            {estado === 'error' ? 'Abrir invitación' : 'Reproducir invitación'}
          </button>
        </div>
      </div>}
    </main>
  )
}
