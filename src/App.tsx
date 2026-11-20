import { useState, useEffect, useRef } from 'react'
import Envelope from './components/Envelope'
import Head from './components/Head'
import DateSection from './components/Date'
import Prayer from './components/Prayer'
import Timer from './components/Timer'
import Location from './components/Location'
import DressCode from './components/DressCode'
import Photo from './components/Photo'
import Itinerary from './components/Itinerary'
import Parents from './components/Parents'
import Confirmation from './components/Confirmation'
import Footer from './components/Footer'
import Divider from './components/Divider'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import Audio from './components/Audio'
import { evento, getGuest, invitadoDeMuestra } from './invitacion'
import type { Guest } from './invitacion'
import torre from './assets/images/torre.webp'
import lago from './assets/images/faroles.webp'
import melodia1 from './assets/audio/faroles-1.wav'
import melodia2 from './assets/audio/faroles-2.wav'
import melodia3 from './assets/audio/faroles-3.wav'
import melodia4 from './assets/audio/faroles-4.wav'
import './App.css'

const melodias = [melodia1, melodia2, melodia3, melodia4]
type Acceso = 'cargando' | 'listo' | 'invalido' | 'error'
export default function App() {
  const codigo = new URLSearchParams(window.location.search).get('guest')
  const [guest, setGuest] = useState<Guest | null>(() => codigo === null && !evento.soloConCodigo ? invitadoDeMuestra() : null)
  const [acceso, setAcceso] = useState<Acceso>(codigo === null ? (evento.soloConCodigo ? 'invalido' : 'listo') : 'cargando')
  const [intento, setIntento] = useState(0)
  const [abierta, setAbierta] = useState(false)
  const [sobreVisible, setSobreVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const cartaRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (codigo === null) return
    const abort = new AbortController()
    getGuest(codigo, abort.signal).then(persona => {
      if (abort.signal.aborted) return
      setGuest(persona); setAcceso(persona ? 'listo' : 'invalido')
    }).catch(() => { if (!abort.signal.aborted) setAcceso('error') })
    return () => abort.abort()
  }, [codigo, intento])
  useEffect(() => {
    if (!abierta) return
    cartaRef.current?.focus({preventScroll: true})
    const timer = setTimeout(()=>setSobreVisible(false), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900)
    return () => clearTimeout(timer)
  }, [abierta])
  if (acceso === 'cargando') return <Loading />
  if (acceso === 'invalido') return <NotFound />
  if (acceso === 'error') return <main className="estado"><h1>No pudimos cargar tu invitación</h1><button className="button" onClick={()=>{setAcceso('cargando');setIntento(i=>i+1)}}>Volver a intentar</button></main>

  const pista = Number(guest?.cancion || 1) - 1
  const audio = evento.canciones[pista] || melodias[pista] || evento.canciones[0] || melodias[0]
  const fecha = Number.isFinite(Date.parse(evento.fechaISO)) ? evento.fechaISO : ''
  function openInvitation() {
    setAbierta(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      void audioRef.current.play().catch(() => { /* El reproductor permite reintentar. */ })
    }
  }
  return <>
    <audio ref={audioRef} src={audio} preload="none" />
    {sobreVisible && <Envelope guestName={guest?.nombre || 'Ti'} guestSeats={guest?.asientos} open={abierta} onOpen={openInvitation} />}
    {abierta && <div className="invitation invitation--open" ref={cartaRef} tabIndex={-1}>
      <Head title="Mis quince años" />
      <main>
        <DateSection date={fecha} />
        <Divider />
        <Prayer prayer={evento.oracion} />
        <Audio audioRef={audioRef} />
        <Photo src={evento.fotos[0] || torre} alt={evento.fotos[0] ? 'Recuerdo de Vero' : 'La torre de Rapunzel entre glicinas'} />
        <Parents />
        <Divider type="flower" />
        <Timer date={fecha} />
        <Location />
        <Divider type="flower2" />
        <DressCode />
        <Photo src={evento.fotos[1] || lago} alt={evento.fotos[1] ? 'Un recuerdo especial de Vero' : 'Una barca entre faroles dorados'} />
        <Itinerary />
        <Footer />
        <Confirmation guest={guest} />
        <Divider type="flower4" />
        <button className="regresar" onClick={()=>{
          audioRef.current?.pause(); setAbierta(false); setSobreVisible(true); window.scrollTo({top:0,behavior:'instant'})
          requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('.envelope__play')?.focus())
        }}>Volver al sobre</button>
      </main>
    </div>}
  </>
}
