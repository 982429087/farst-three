import installer from './defaults'
export * from '@farst-three/components'
export * from '@farst-three/constants'
export * from '@farst-three/directives'
export * from '@farst-three/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
