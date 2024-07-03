import React from 'react'

type Node = React.ReactNode | React.ReactNode[]

type TyperBase = Omit<React.HTMLProps<HTMLSpanElement>, 'children' | 'prefix' | 'ref'>

type TyperElementProps = TyperBase & {
  children?: Node
  ref?: React.RefObject<HTMLSpanElement>
}

type TyperProps = TyperBase & {
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
  ref?: React.RefObject<HTMLSpanElement>
}

export declare const Typer: React.FC<TyperProps>

export declare const TyperElement: React.FC<TyperElementProps>

export {}
