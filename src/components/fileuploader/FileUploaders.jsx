import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ['JPEG', 'PNG', 'PDF up to 10MB']

export default function FileUploaders () {
  return (
    <div className="App">
      <FileUploader multiple={ true }
        name="file"
        types={ fileTypes }/>
    </div>
  )
}