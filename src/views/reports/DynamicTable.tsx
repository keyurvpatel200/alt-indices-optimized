import { FieldType } from './ReactDndDemo'

interface FieldItem {
  id: string
  type: FieldType
  label: string
  value?: string[][]
}

interface DynamicTableProps {
  allData: FieldItem[]
  data: FieldItem
  setValue: (data: FieldItem[]) => void
}

const DynamicTable = ({ allData, data, setValue }: DynamicTableProps) => {

  const handleSetValue = (value: string[][]) => {
    const updatedData = allData?.map((d: FieldItem) => {
      if (d?.id === data?.id) {
        return { ...d, value }
      }
      return d
    })
    setValue(updatedData)
  }

  const updateCell = (row: number, col: number, value: string) => {
    const updated = [...(data?.value ?? [])]
    updated[row][col] = value
    handleSetValue(updated)
  }

  const addRow = () => {
    const colCount = data?.value && data.value.length > 0 ? data.value[0].length : 1
    const newRow = Array(colCount).fill('')
    handleSetValue([...(data?.value ?? []), newRow])
  }

  const addColumn = () => {
    if (!data?.value) return
    const updated = data.value.map((row: string[]) => [...row, ''])
    handleSetValue(updated)
  }

  const removeRow = () => {
    if (data?.value && data.value.length > 1) {
      handleSetValue(data.value.slice(0, -1))
    }
  }

  const removeColumn = () => {
    if (data?.value && data.value[0].length > 1) {
      const updated = data.value.map((row: string[]) => row.slice(0, -1))
      handleSetValue(updated)
    }
  }

  return (
    <div style={ { padding: '20px' } }>
      <table style={ { borderCollapse: 'collapse', marginBottom: '10px' } }>
        <tbody>
          {data?.value?.map((row: string[], rowIndex: number) => (
            <tr key={ `row-${rowIndex}` }>
              {row.map((cell, colIndex) => (
                <td key={ `cell-${rowIndex}-${colIndex}` } style={ { border: '1px solid #999' } }>
                  <input
                    value={ cell }
                    onChange={ e => updateCell(rowIndex, colIndex, e.target.value) }
                    style={ { width: '200px' } }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controls */}
      <div style={ { display: 'flex' } }>
        <button className="recalculate-all-button" onClick={ addRow }>
          Add Row
        </button>
        <button className="recalculate-all-button" onClick={ addColumn }>
          Add Column
        </button>
        <button className="recalculate-all-button" onClick={ removeRow }>
          Remove Row
        </button>
        <button className="recalculate-all-button" onClick={ removeColumn }>
          Remove Column
        </button>
      </div>
    </div>
  )
}

export default DynamicTable
