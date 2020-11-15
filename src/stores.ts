import { writable, Writable } from 'svelte/store'

export const interactiveWidth: Writable<number> = writable(null, undefined)
