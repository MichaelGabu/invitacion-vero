import { useState, useEffect } from 'react'
import type { RefObject } from 'react'
import Button from '../Button'
import './audio.css'

export default function Audio({ audioRef }: {audioRef: RefObject<HTMLAudioElement | null>}) {
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const sync = () => setPlaying(!audio.paused && !audio.ended)
    sync()
    for (const event of ['play','pause','ended','error']) audio.addEventListener(event, sync)
    return () => { for (const event of ['play','pause','ended','error']) audio.removeEventListener(event, sync) }
  }, [audioRef])
  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    setError(false)
    if (audio.paused) audio.play().catch(() => setError(true))
    else audio.pause()
  }
  return <section className="section audio"><div className="section__container audio__container">
    <Button label={playing ? 'Pausar música' : 'Escuchar música'} onClick={toggle} type="outlined" />
    {error && <p role="status">No se pudo reproducir la música.</p>}
  </div></section>
}
