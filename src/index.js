import React, { Children, useState, useEffect } from 'react'
import useInterval from './use-interval'
import useInjectStyle from './use-inject-style'
import PropTypes from './props'

const hidden = {
  position: 'absolute',
  left: 1e4,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden'
}

const animation = '_yat'
const style = `@keyframes ${animation} {` +
  `0%`   + `{opacity:0;}` +
  `50%`  + `{opacity:1;}` +
  `100%` + `{opacity:0;}` +
`}`

export const Typer = p => {
  if (__isDev__) {
    const err = validator(p, 'children', Typer.name)
    if (err) throw err
  }
  const {
    prefix,
    loop,
    cursor,
    cursorDelay,
    cursorWidth,
    children,
    className,
    typeDelay,
    deleteDelay,
    emptyDelay,
    completedDelay,
    ...rest
  } = p
  const wide = {
    animation: `${animation} ${cursorDelay}s infinite`,
    marginLeft: 3,
    display: 'inline-block',
    transform: `scale(${cursorWidth}, 1)`
  }
  const inner = Children.map(children, child => child.props)
  const inners = inner.map(({ children }) => children)
  const props = inner.map(data => Object.assign({}, data))
  const items = inners.map(line => {
    if (typeof line === 'string') return line.split('')
    if (typeof line === 'undefined') return []
    if (!Array.isArray(line)) return [line]
    return line.reduce((acc, next) => {
      if (typeof next === 'string') return acc.concat(next.split(''))
      acc.push(next)
      return acc
    }, [])
  })
  const [curItem, setItem] = useState(0)
  const [curSlice, setSlice] = useState(0)
  const item = items[curItem]
  const prop = props[curItem]
  const isEmpty = item.length <= 0
  const delay = (() => {
    if (!loop && curItem === items.length - 1 && curSlice === -item.length) return null
    if (Math.abs(curSlice) === item.length && !isEmpty) return Math.floor(completedDelay / 2)
    if (curSlice === 0) return Math.floor(emptyDelay / 2)
    if (curSlice < 0) return deleteDelay
    return typeDelay
  })()
  useInjectStyle(style)
  useInterval(() => {
    setSlice(curSlice => {
      if (item.length <= curSlice && !isEmpty) {
        return -curSlice
      }
      else if (curSlice === -1 || isEmpty) {
        setItem(curItem => (curItem + 1) % items.length)
      }
      return curSlice + 1
    })
  }, delay)
  return (
    <span {...rest}>
      <span aria-live="polite" aria-atomic style={hidden}>
        {prefix}{' '}
        {item}
      </span>
      <span {...Object.assign({}, prop, { "aria-hidden": true, children: undefined })}>
        {prefix}{' '}
        {item.slice(0, Math.abs(curSlice))}
      </span>
      { cursor && <span {...Object.assign({ "aria-hidden": true, style: wide, className })}>|</span> }
    </span>
  )
}

export const TyperElement = p => <span {...p} />

let validator
if (__isDev__) {
  validator = (props, key, component) => {
    const validate = (child, prop) => {
      if (!child || child.type !== TyperElement) {
        return new Error(
          `\`${prop}\` supplied to \`${component}\` must be of type \`${TyperElement.name}\`.`
        )
      }
    }
    const children = props[key]
    if (!children || children.length === 0) {
      return new Error(
        `The prop \`${key}\` is marked as required in \`${component}\`, but it is empty or \`undefined\`.`
      )
    }
    if (Array.isArray(children)) {
      for (const [i, child] of children.entries()) {
        const result = validate(child, `${key}[${i}]`)
        if (result) return result
      }
    }
    else {
      return validate(children, key)
    }
  }

  const childrenProp = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])

  TyperElement.propTypes = {
    children: childrenProp
  }

  Typer.propTypes = {
    children: validator,
    prefix: childrenProp,
    loop: PropTypes.bool,
    cursor: PropTypes.bool,
    cursorDelay: PropTypes.number,
    cursorWidth: PropTypes.number,
    className: PropTypes.string,
    typeDelay: PropTypes.number,
    deleteDelay: PropTypes.number,
    emptyDelay: PropTypes.number,
    completedDelay: PropTypes.number
  }
}

Typer.defaultProps = {
  loop: true,
  cursor: true,
  cursorDelay: 2,
  cursorWidth: 1.75,
  typeDelay: 65,
  deleteDelay: 55,
  emptyDelay: 1000,
  completedDelay: 3000
}
