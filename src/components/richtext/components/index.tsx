import { css, cx } from '@emotion/css'
import React, { PropsWithChildren, ReactNode, Ref } from 'react'
import ReactDOM from 'react-dom'

interface BaseProps {
  className?: string
  [key: string]: any
}

type ButtonProps = {
  active: boolean
  reversed: boolean
} & BaseProps & { children?: React.ReactNode }

export const Button = React.forwardRef<HTMLSpanElement, ButtonProps>(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      { ...props }
      ref={ ref }
      className={ cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};
        `
      ) }
    />
  )
)


Button.displayName = 'Button'

export const Icon = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span
      { ...props }
      ref={ ref }
      className={ cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      ) }
    />
  )
)

Icon.displayName = 'Icon'

export const Instruction = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <div
      { ...props }
      ref={ ref }
      className={ cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      ) }
    />
  )
)

Instruction.displayName = 'Instruction'


export const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <div
      { ...props }
      data-test-id="menu"
      ref={ ref }
      className={ cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      ) }
    />
  )
)

Menu.displayName = 'Menu'

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null
}

Portal.displayName = 'Portal'

export const Toolbar = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <Menu
      { ...props }
      ref={ ref }
      className={ cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      ) }
    />
  )
)

Toolbar.displayName = 'Toolbar'