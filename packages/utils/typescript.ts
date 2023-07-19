import type { Scene } from 'three'

export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T
) => val as Mutable<typeof val>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type HTMLElementCustomized<T> = HTMLElement & T

/**
 * @deprecated stop to use null
 * @see {@link https://github.com/sindresorhus/meta/discussions/7}
 */
export type Nullable<T> = T | null

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T
export type AnyFun = (...args: any[]) => any
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

export type OptionFunction<T> = (scene: Scene, instance: T) => any
export type Options<T> = {
  [P in keyof T]: T[P] extends Record<string, any>
    ? Options<T[P]>
    : T[P] extends AnyFun
    ? OptionFunction<T>
    : any[] | string | number
}

export type ThreeOptions<T> = DeepPartial<Options<T>>
