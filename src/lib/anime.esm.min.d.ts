// Public API used by the animation scopes inherited from the invitation.
export interface Scope { add(callback: () => void): Scope; revert(): void }
export function createScope(options: {root: {current: Element | null}}): Scope
export const utils: {
  $(selector: string): Element[]
  set(targets: Element[], values: Record<string, unknown>): void
}
export function animate(targets: Element[], values: Record<string, unknown>): unknown
export function onScroll(options: Record<string, unknown>): unknown
export function stagger(delay: number, options?: Record<string, unknown>): unknown
