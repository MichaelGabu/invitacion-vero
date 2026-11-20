export interface Guest {
  nombre: string
  asientos: number
  codigo: string
  cancion?: string
}
interface Actividad { titulo: string; hora: string; descripcion: string }
export interface AlbumPhoto { src: string; alt: string }
interface Evento {
  invitadoMuestra: Pick<Guest, "nombre" | "asientos"> | null;
  nombre: string; fechaISO: string; fecha: string; hora: string; lugar: string; direccion: string; mapa: string;
  oracion: string; familia: string; vestuario: string; ellas: string; ellos: string; fechaLimite: string;
  fotos: string[]; album: AlbumPhoto[]; canciones: string[]; itinerario: Actividad[]; whatsapp: string;
  invitadosCSV: string; proyectoFirebase: string; coleccionInvitados: string; soloConCodigo: boolean;
}
declare global { interface Window { invitacionVero?: Partial<Evento> } }
export const evento: Evento = {
  invitadoMuestra: null, nombre: 'Vero', fechaISO: '', fecha: '', hora: '', lugar: '', direccion: '', mapa: '', familia: '',
  oracion: '', vestuario: '', ellas: '', ellos: '', fechaLimite: '', fotos: [], album: [], canciones: [],
  itinerario: [], whatsapp: '', invitadosCSV: '', proyectoFirebase: '',
  coleccionInvitados: 'guests', soloConCodigo: false, ...window.invitacionVero,
}

// Las comas y los saltos de línea entre comillas son parte de la celda.
function filasCSV(texto: string): string[][] {
  const filas: string[][] = []
  let fila: string[] = [], celda = '', enComillas = false
  const csv = texto.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (c === '"') {
      if (enComillas && csv[i + 1] === '"') { celda += '"'; i++ }
      else enComillas = !enComillas
    } else if (!enComillas && (c === ',' || c === '\n')) {
      fila.push(celda.trim()); celda = ''
      if (c === '\n') { filas.push(fila); fila = [] }
    } else celda += c
  }
  if (enComillas) throw new Error('CSV incompleto')
  fila.push(celda.trim()); filas.push(fila)
  return filas
}
function invitado(datos: Record<string, string>, codigo: string): Guest | null {
  const asientos = Number(datos.asientos)
  if (!datos.nombre?.trim() || !Number.isSafeInteger(asientos) || asientos < 1) return null
  return { nombre: datos.nombre.trim(), asientos, codigo, cancion: datos.cancion }
}
export function invitadoDeMuestra(): Guest | null {
  if (evento.invitadosCSV || evento.proyectoFirebase || !evento.invitadoMuestra) return null
  const { nombre, asientos } = evento.invitadoMuestra
  return invitado({ nombre, asientos: String(asientos), cancion: '1' }, 'DEMO')
}

export async function getGuest(codigo: string, signal: AbortSignal): Promise<Guest | null> {
  if (evento.invitadosCSV) {
    const response = await fetch(evento.invitadosCSV, { signal })
    if (!response.ok) throw new Error('No se pudo consultar la lista')
    const [columnas, ...filas] = filasCSV(await response.text())
    const headers = columnas.map(h => h.toLowerCase())
    if (!['nombre','asientos','codigo'].every(key => headers.includes(key))) throw new Error('La lista no tiene las columnas requeridas')
    const fila = filas.find(f => f[headers.indexOf('codigo')] === codigo)
    return fila ? invitado(Object.fromEntries(headers.map((k,i) => [k,fila[i]])), codigo) : null
  }
  if (!evento.proyectoFirebase) return codigo === 'DEMO' ? (invitadoDeMuestra() ?? { nombre: 'Familia invitada', asientos: 2, codigo }) : null
  const project = encodeURIComponent(evento.proyectoFirebase)
  const collection = encodeURIComponent(evento.coleccionInvitados || 'guests')
  const url = 'https://firestore.googleapis.com/v1/projects/' + project + '/databases/(default)/documents/' + collection + '/' + encodeURIComponent(codigo)
  const response = await fetch(url, { signal })
  if (response.status === 404) return null
  if (!response.ok) throw new Error('No se pudo consultar la invitación')
  const { fields } = await response.json()
  const valores = Object.fromEntries(Object.entries(fields || {}).map(([key,val]) => {
    const campo = val as Record<string,string>
    return [key,String(campo.stringValue ?? campo.integerValue ?? campo.doubleValue ?? '')]
  }))
  return invitado(valores, codigo)
}
