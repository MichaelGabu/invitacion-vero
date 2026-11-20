import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dist = 'node_modules/.cache/vero-portable'
let html = await readFile(join(dist, 'index.html'), 'utf8')
const licenses = await readFile(join(dist, 'licencias.txt'), 'utf8')
for (const [tag, file] of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)) {
  const js = (await readFile(join(dist, file), 'utf8')).replace(/<\/script/gi, '<\\/script')
  const module = tag.includes('type="module"') ? ' type="module"' : ''
  html = html.replace(tag, () => '<script' + module + '>' + js + '</script>')
}
const style = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!style) throw new Error('Falta la hoja de estilos de la invitación.')
const css = await readFile(join(dist, style[1]), 'utf8')
html = html.replace(style[0], () => '<style>' + css + '</style>')
html = html.replace('</body>', () => '<script type="text/plain" id="licencias">' + licenses + '</script></body>')
await writeFile(join('dist', 'invitacion.html'), html)
