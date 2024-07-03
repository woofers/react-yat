import React from 'react'

type Node = React.ReactNode | React.ReactNode[]

type TyperElementProps = React.HTMLProps<HTMLSpanElement> & {
  children?: Node
  ref?: string
}

type TyperProps = React.HTMLProps<HTMLSpanElement> & {
  prefix: Node
  children: Node
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

export declare const Typer: React.FC<TyperProps>

export declare const TyperElement: React.FC<TyperElementProps>

export {}
