import { useId } from 'react'

import styles from './RadioToggle.module.css'

export default function RatioToggle ({ title, options, selected, setSelected }) {
  const handleChange = (value) => {
    setSelected(value)
  }

  const id = useId()

  return (
    <div className={ styles.wrapper }>
      <fieldset>
        <legend>{ title }</legend>
        { options.map(({ value, label }) => (
          <label key={ value }>
            <input type="radio"
              name={ id }
              checked={ selected === value }
              onChange={ () => handleChange(value) }/>
            { label }
          </label>
        )) }
      </fieldset>
    </div>
  )
}