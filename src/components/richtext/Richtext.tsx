import isHotkey from 'is-hotkey'
import React, { KeyboardEvent, MouseEvent, useCallback, useMemo } from 'react'
import { Descendant, Editor, Element as SlateElement, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact
} from 'slate-react'
import { Button, Icon, Toolbar } from './components'
import {
  CustomEditor,
  CustomElement,
  CustomElementType,
  CustomElementWithAlign,
  CustomTextKey
} from './custom-types'
import { css, cx } from '@emotion/css'
import { FieldType } from '@/views/reports/ReactDndDemo'
interface FieldItem {
  id: string
  type: FieldType
  label: string
  value?: any
}

const HOTKEYS: Record<string, CustomTextKey> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const

type AlignType = (typeof TEXT_ALIGN_TYPES)[number]
type ListType = (typeof LIST_TYPES)[number]
type CustomElementFormat = CustomElementType | AlignType | ListType

const Wrapper = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    { ...props }
    className={ cx(
      className,
      css`
        padding: 20px;
      `
    ) }
  />
)

export const ExampleContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Wrapper
    { ...props }
    className={ css`
      background: #fff;
    ` }
  />
)

interface RichTextExampleProps {
  allData: FieldItem[]
  data: FieldItem
  setValue: (data: FieldItem[]) => void
}

const RichTextExample = ({ allData, data, setValue }: RichTextExampleProps) => {
  const renderElement = useCallback((props: RenderElementProps) => <Element { ...props } />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf { ...props } />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const onChange = (value: Descendant[]) => {
    const updatedData = allData?.map((d: FieldItem) => {
      if (d?.id === data?.id) {
        return { ...d, value }
      }
      return d
    })
    setValue(updatedData)
  }

  return (
    <Slate editor={ editor } initialValue={ data?.value } onChange={ onChange }>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        {/* <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" /> */}
      </Toolbar>
      <Editable
        renderElement={ renderElement }
        renderLeaf={ renderLeaf }
        placeholder="Enter text…"
        spellCheck
        autoFocus
        onKeyDown={ (event: KeyboardEvent<HTMLDivElement>) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        } }
      />
    </Slate>
  )
}

const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  const isActive = isBlockActive(editor, format, isAlignType(format) ? 'align' : 'type')
  const isList = isListType(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true
  })
  let newProperties: Partial<SlateElement>
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format
          }
          return n.type === format
        }
        return false
      }
    })
  )

  return !!match
}

const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {}
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType
  }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={ style } { ...attributes }>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={ style } { ...attributes }>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={ style } { ...attributes }>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={ style } { ...attributes }>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={ style } { ...attributes }>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={ style } { ...attributes }>
          {children}
        </ol>
      )
    default:
      return (
        <p style={ style } { ...attributes }>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span { ...attributes }>{children}</span>
}

interface BlockButtonProps {
  format: CustomElementFormat
  icon: string
}

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={ isBlockActive(editor, format, isAlignType(format) ? 'align' : 'type') }
      onMouseDown={ (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        toggleBlock(editor, format)
      } }
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

interface MarkButtonProps {
  format: CustomTextKey
  icon: string
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={ isMarkActive(editor, format) }
      onMouseDown={ (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        toggleMark(editor, format)
      } }
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType)
}

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType)
}

const isAlignElement = (element: CustomElement): element is CustomElementWithAlign => {
  return 'align' in element
}

export default RichTextExample
