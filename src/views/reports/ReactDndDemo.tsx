import React, { useEffect, useRef, useState } from 'react'
import dragula from 'react-dragula'
import 'dragula/dist/dragula.css'
import { Pagination, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RichTextExample, { ExampleContent } from '@/components/richtext/Richtext'
import DynamicTable from './DynamicTable'
import CashFlowChart from '../fund/CashFlowChart'

export type FieldType = 'text' | 'textarea' | 'graphs' | 'quill' | 'table' | 'notes'

interface FieldItem {
  id: string
  type: FieldType
  label: string
  value?: any
}

const toolboxItems: FieldItem[] = [
  { id: 'textarea', type: 'textarea', label: 'Text Box' },
  { id: 'table', type: 'table', label: 'Table' },
  { id: 'graphs', type: 'graphs', label: 'Graphs' },
  { id: 'notes', type: 'notes', label: 'Notes' }
]

const ReactDndDemos: React.FC = () => {
  const [formFields, setFormFields] = useState<FieldItem[]>([])
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})
  const toolboxRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const drakeRef = useRef<dragula.Drake>()

  const ITEMS_PER_PAGE = 5
  const [page, setPage] = useState(1)

  const handleChangePage = (_: any, value: number) => {
    setPage(value)
  }

  const pageCount = Math.ceil(formFields.length / ITEMS_PER_PAGE)
  const paginatedFields = formFields.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleMenuOpen = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls(prev => ({ ...prev, [id]: event.currentTarget }))
  }

  const handleMenuClose = (id: string) => {
    setAnchorEls(prev => ({ ...prev, [id]: null }))
  }

  const moveField = (id: string, direction: 'up' | 'down') => {
    setFormFields(prev => {
      const index = prev.findIndex(f => f.id === id)
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (index < 0 || swapWith < 0 || swapWith >= prev.length) return prev
      const updated = [...prev]
      ;[updated[index], updated[swapWith]] = [updated[swapWith], updated[index]]
      return updated
    })
  }

  useEffect(() => {
    drakeRef.current?.destroy()

    if (toolboxRef.current && editorRef.current) {
      const drake = dragula([toolboxRef.current, editorRef.current], {
        copy: (_, source) => source === toolboxRef.current,
        accepts: (_, target) => target === editorRef.current,
        removeOnSpill: false,
        revertOnSpill: true
      })

      drake.on('drop', (el, target, source, sibling) => {
        const type = el.getAttribute('data-type') as FieldType

        if (source === toolboxRef.current && target === editorRef.current) {
          const newId = `${type}-${Date.now()}-${Math.random()}`
          const count = formFields.filter(f => f.type === type).length + 1

          const newField: FieldItem = {
            id: newId,
            type,
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
            value: type === 'table' ? [ ['', ''],['', ''] ] : type === 'textarea' ? [ { type: 'paragraph', children: [ { text: '' } ] } ]: ''
          }

          let insertIndex = (page - 1) * ITEMS_PER_PAGE + paginatedFields.length
          if (sibling && sibling instanceof HTMLElement) {
            const siblingId = sibling.getAttribute('data-id')
            const siblingIndex = formFields.findIndex(f => f.id === siblingId)
            if (siblingIndex >= 0) {
              insertIndex = siblingIndex
            }
          }

          const updated = [...formFields]
          updated.splice(insertIndex, 0, newField)
          setFormFields(updated)
          el.remove()
        }

        if (source === editorRef.current && target === editorRef.current) {
          const nodeList = Array.from(editorRef.current.children)
          const newOrder = nodeList
            .map(node => {
              const id = node.getAttribute('data-id')
              return formFields.find(f => f.id === id)
            })
            .filter((f): f is FieldItem => !!f)

          const fullList = [...formFields]
          const start = (page - 1) * ITEMS_PER_PAGE
          fullList.splice(start, ITEMS_PER_PAGE, ...newOrder)
          setFormFields(fullList)
        }
      })

      drakeRef.current = drake
    }

    return () => {
      drakeRef.current?.destroy()
    }
  }, [formFields, page])

  const renderField = (field: FieldItem) => {
    switch (field.type) {
      case 'textarea':
        return (
          <ExampleContent>
            <RichTextExample
              key={ field?.id }
              allData={ formFields }
              data={ field }
              setValue={ setFormFields }
            />
          </ExampleContent>
        )
      case 'graphs':
        return <CashFlowChart year_data={ [2, 5, 7, 8, 6] } years={ [2017, 2018, 2019, 2020, 2021] } />
      case 'table':
        return (
          <DynamicTable
            key={ field?.id }
            allData={ formFields }
            data={ field }
            setValue={ setFormFields }
          />
        )
      case 'notes':
        return <div>
          <input
            type="text" 
            value={ field?.value?.title }
            onChange={ e => {
              const updated = formFields.map(f => f.id === field.id ? { ...f, value: { ...f?.value, title: e.target.value } } : f)
              setFormFields(updated)
            } }
            placeholder="Enter title"
            style={ { width: '100%', marginBottom: '10px' } }
          />
          <textarea
            value={ field?.value?.description || '' }
            onChange={ e => {
              const updated = formFields.map(f => f.id === field.id ? { ...f, value: { ...f?.value, description : e.target.value } } : f)
              setFormFields(updated)
            } }
            placeholder="Enter your notes here..."
            style={ { width: '100%', height: '100px' } }
          />
        </div>
      default:
        return null
    }
  }

  return (
    <div>
      <div style={ { display: 'flex', padding: 20 } }>
        {/* Toolbox */}
        <div
          ref={ toolboxRef }
          style={ {
            width: '200px',
            padding: '16px',
            border: '1px solid #ccc',
            marginRight: '20px'
          } }
        >
          <h3>Toolbox</h3>
          {toolboxItems.map(item => (
            <div
              key={ item.id }
              data-type={ item.type }
              style={ {
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#f0f0f0',
                border: '1px solid #999',
                cursor: 'move'
              } }
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div
          ref={ editorRef }
          style={ {
            flex: 1,
            minHeight: '400px',
            padding: '16px',
            backgroundColor: '#ffffff',
            border: '2px dashed #aaa'
          } }
        >
          {paginatedFields.map(field => (
            <div
              key={ field.id }
              data-id={ field.id }
              style={ {
                position: 'relative',
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#D0D5DD',
                border: '1px solid #00796b',
                cursor: 'move'
              } }
            >
              <div style={ { position: 'absolute', top: 5, right: 5 } }>
                <IconButton size="small" onClick={ e => handleMenuOpen(field.id, e) }>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={ anchorEls[field.id] }
                  open={ Boolean(anchorEls[field.id]) }
                  onClose={ () => handleMenuClose(field.id) }
                >
                  <MenuItem
                    onClick={ () => {
                      moveField(field.id, 'up')
                      handleMenuClose(field.id)
                    } }
                  >
                    Move Up
                  </MenuItem>
                  <MenuItem
                    onClick={ () => {
                      moveField(field.id, 'down')
                      handleMenuClose(field.id)
                    } }
                  >
                    Move Down
                  </MenuItem>
                  <MenuItem
                    onClick={ () => {
                      handleMenuClose(field.id)
                    } }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={ () => {
                      setFormFields(prev => prev.filter(f => f.id !== field.id))
                      handleMenuClose(field.id)
                    } }
                    style={ { color: 'red' } }
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div style={ { marginTop: '20px', textAlign: 'center' } }>
          <Pagination
            count={ pageCount }
            variant="outlined"
            shape="rounded"
            page={ page }
            onChange={ handleChangePage }
          />
        </div>
      )}
    </div>
  )
}

export default ReactDndDemos
