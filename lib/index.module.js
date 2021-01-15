import { Typer as TyperDev, TyperElement as TyperElementDev } from './react-yat.module.dev.js'
import { Typer as TyperProd, TyperElement as TyperElementProd } from './react-yat.module.js'

export const Typer = process.env.NODE_ENV === 'production' ? TyperProd : TyperDev
export const TyperElement = process.env.NODE_ENV === 'production' ? TyperElementProd : TyperElementDev
