import styles from './SwitchToggle.module.css'

export default function SwitchToggle ({ title, checked, setChecked }) {
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <div className={ styles.wrapper }>
      <label className='d-flex align-items-center gap-2'>
        { title }{ ' ' }
        <input type="checkbox" checked={ checked } onChange={ handleChange }/>
      </label>
    </div>
  )
}