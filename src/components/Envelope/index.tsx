import { evento } from '../../invitacion'
import Button from '../Button'
import stamp from '../../assets/images/sello.webp'
import './envelope.css'

interface EnvelopeProps {
  guestName: string
  guestSeats?: number
  open: boolean
  onClick: () => void
}

export default function Envelope({ guestName, guestSeats, open, onClick }: EnvelopeProps) {
  return (
    <main className={open ? 'envelope envelope--open' : 'envelope'} inert={open} aria-hidden={open}>
      <div className="envelope__top">
        <div className="envelope__flap">
          <div className="envelope__inscription">
            <p className="envelope__kicker">Mis quince años</p>
            <h1 className="envelope__title">{evento.nombre}</h1>
            <div className="envelope__filigree" aria-hidden="true">✧</div>
            {evento.fecha && <p className="envelope__date">{evento.fecha}</p>}
          </div>
        </div>
        <button type="button" className="envelope__stamp" aria-label="Abrir el sello" onClick={onClick}>
          <img src={stamp} alt="" />
        </button>
      </div>
      <div className="envelope__bottom">
        <div className="envelope__paper" />
        <div className="envelope__recipient">
          <p className="envelope__label">{guestSeats ? 'Invitación para' : 'Una carta para'}</p>
          <h2 className="envelope__guest-name">{guestSeats ? guestName : 'Ti'}</h2>
          {guestSeats && <p className="envelope__seats-number"><strong>{guestSeats}</strong> {guestSeats === 1 ? 'lugar reservado' : 'lugares reservados'}</p>}
          <Button label="Ver invitación" onClick={onClick} />
        </div>
      </div>
    </main>
  )
}
