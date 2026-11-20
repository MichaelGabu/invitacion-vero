import { useState } from 'react'
import type { FormEvent } from 'react'
import { evento } from '../../invitacion'
import type { Guest } from '../../invitacion'
import './confirmation.css'

export default function Confirmation({ guest }: {guest: Guest | null}) {
  const [nombre, setNombre] = useState(guest?.nombre || '')
  const [asiste, setAsiste] = useState(true)
  const [cupos, setCupos] = useState('1')
  const telefono = String(evento.whatsapp || '').replace(/\D/g,'')
  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const campo = e.currentTarget.elements.namedItem('nombre') as HTMLInputElement
    if (!nombre.trim()) { campo.setCustomValidity('Escribe tu nombre.'); campo.reportValidity(); return }
    const cantidad = guest && guest.asientos > 1 ? ' para ' + cupos + (cupos === '1' ? ' persona' : ' personas') : ''
    const respuesta = asiste ? 'Confirmo mi asistencia' + cantidad + '.' : 'Esta vez no podré asistir.'
    const texto = '¡Hola, ' + evento.nombre + '! Soy ' + nombre.trim() + '. ' + respuesta + ' Gracias por invitarme a tus quince años.'
    window.open('https://wa.me/' + telefono + '?text=' + encodeURIComponent(texto), '_blank', 'noopener,noreferrer')
  }
  return <section className="section confirmation"><div className="section__container confirmation__container">
    <h2>Confirma tu asistencia</h2>
    {evento.fechaLimite && <p>Por favor, responde antes del {evento.fechaLimite}.</p>}
    <form onSubmit={enviar}>
      <label>Tu nombre<input name="nombre" required maxLength={100} autoComplete="name" value={nombre} onChange={e=>{e.target.setCustomValidity('');setNombre(e.target.value)}} /></label>
      <fieldset><legend>¿Podrás acompañarme?</legend><div className="opciones">
        <label><input type="radio" name="asiste" checked={asiste} onChange={()=>setAsiste(true)} /> Sí, asistiré</label>
        <label><input type="radio" name="asiste" checked={!asiste} onChange={()=>setAsiste(false)} /> No podré asistir</label>
      </div></fieldset>
      {asiste && guest && guest.asientos>1 && <label>Personas que asistirán<input type="number" required min="1" max={guest.asientos} value={cupos} onChange={e=>setCupos(e.target.value)} /></label>}
      <button type="submit" className="button button--color-default">Responder por WhatsApp</button>
      <small>{telefono ? 'Envía el mensaje para entregar tu respuesta.' : 'Selecciona el chat de quien te invitó y envía tu respuesta.'}</small>
    </form>
  </div></section>
}
