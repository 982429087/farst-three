import { componentSizes, datePickTypes } from '@farst-three/constants'
import type { ComponentSize, DatePickType } from '@farst-three/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: string): val is DatePickType =>
  ([...datePickTypes] as string[]).includes(val)
