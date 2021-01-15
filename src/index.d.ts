import React, { SFC, ReactNode, ReactNodeArray, Props, HTMLProps } from 'react'

interface TyperElementProps extends Props<TyperElementProps>, HTMLProps<HTMLSpanElement> {
  children?: ReactNode | ReactNodeArray
  ref?: string
}

interface TyperProps extends Props<TyperProps>, HTMLProps<HTMLSpanElement> {
  prefix: ReactNode | ReactNodeArray
  children: ReactNode | ReactNodeArray
  loop?: boolean
  cursor?: boolean
  cursorWidth?: number
  cursorDelay?: number
  className?: string
  typeDelay?: number
  deleteDelay?: number
  emptyDelay?: number
  completedDelay?: number
  ref?: string
}

export declare const Typer: SFC<TyperProps>

export declare const TyperElement: SFC<TyperElementProps>

export {}
