import React, { ReactNode, Props, Component, HTMLProps } from 'react'

interface TyperElementProps extends Props<TyperElementProps>, HTMLProps<HTMLSpanElement> {
  children?: ReactNode | ReactNode[]
}

interface TyperProps extends Props<TyperProps>, HTMLProps<HTMLSpanElement> {
  prefix?: ReactNode | ReactNode[]
  children: ReactNode | ReactNode[]
  loop?: boolean
  cursor?: boolean
  cursorWidth?: number
  className?: string
  typeDelay?: number
  deleteDelay?: number
  emptyDelay?: number
  completedDelay?: number
}

export declare class Typer extends Component<TyperProps, any> {}

export declare class TyperElement extends Component<TyperElement, any> {}

export {}
