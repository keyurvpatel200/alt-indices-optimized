import { Fragment, useState } from 'react'
import _ from 'lodash'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles'
import { ValidatorForm } from 'react-form-validator-core'

import TextValidator from '../../components/TextValidator'
import Input from '../../components/Input'
import LinearProgress from '../../components/LinearProgress'
import makeValidators from './validation'
import schema from './schema.json'
import fieldsSchema from './fields'
import categories from './categories'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D2939',
      light: alpha('#1D2939', 0.75),
    },
  },
})

const data = {}
const model = makeValidators(schema.definitions['models.EDCI_data'])
const fields = []
_.map(fieldsSchema, (value, key) => {
  const f = _.defaults(value, model.properties[key])
  f.name = key
  fields.push(f)
  if (f.value) data[key] = f.value
})

export default function CompanyForm () {
  const [activeCatIndex, setActiveCatIndex] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeCat = categories[activeCatIndex]
  const activeStep = activeCat.steps?.[activeStepIndex]

  //TODO pull from url / state
  const [formData, setFormData] = useState(_.merge({
    companyID: 1,
    fundID: 1,
    gpName: 'GP Name',
    fundName: 'Fund Name',
  }, data))
  const currentFields = _.filter(fields, f => {
    let hidden = f.hidden
    if (_.isString(f.hidden)) {
      const condition = `"use strict";const f=${ JSON.stringify(formData) };f.${ f.hidden }`

      hidden = eval?.(condition)
    }
    return !hidden && f.category === activeCat.name && (!activeCat.steps || f.step === activeStep)
  })

  const nextStep = () => {
    if (activeCatIndex === categories.length - 1) return
    if (activeStepIndex < activeCat.steps?.length - 1) setActiveStepIndex(activeStepIndex + 1)
    else {
      setActiveStepIndex(0)
      setActiveCatIndex(prevActiveCat => prevActiveCat + 1)
    }
  }
  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value }
      return newData
    })
  }

  const onSubmit = () => {
    console.log(_.pickBy(formData, f => f.skip !== true))
  }

  return (
    <ThemeProvider theme={ theme }>
      <Paper elevation={ 0 } sx={ { padding: '16px' } }>
        <Grid container spacing={ 8 }>
          <Grid size={ 3 }>
            <Stepper activeStep={ activeCatIndex } orientation="vertical">
              { categories.map((category, i) => (
                <Step key={ category.name } onClick={ () => {
                  setActiveStepIndex(0)
                  setActiveCatIndex(i)
                } }>
                  <StepLabel>
                    { category.name }
                  </StepLabel>
                </Step>
              )) }
            </Stepper>
          </Grid>

          <Grid size={ 6 }>
            <ValidatorForm style={ { width: '100%' } }
              onSubmit={ onSubmit }
              onError={ errors => console.log(errors) }>
              <Typography variant="h4" gutterBottom>{ activeStep || activeCat.name }</Typography>
              <Grid container spacing={ 4 } mt={ 4 }>
                { _.map(currentFields, (f) => {
                  const width = f.width || 12

                  return (
                    <Fragment key={ f.name }>
                      <Grid size={ width }>
                        <FormControl variant="standard" sx={ { width: '100%' } }>
                          <FormLabel sx={ { color: theme.palette.primary.main } }>
                            { f.label }
                          </FormLabel>
                          <Typography variant="body2"
                            pt={ 1 }
                            pb={ 1 }
                            sx={ { color: theme.palette.primary.light } }>
                            { f.description }
                          </Typography>
                          { f.fieldType === 'RadioButton' &&
                            <RadioGroup name={ f.name } onChange={ onChange }>
                              { _.map(f.fields, (_f, i) =>
                                <FormControlLabel key={ `${ f.name }-${ f.enum[i] }` }
                                  value={ f.enum[i] }
                                  label={ _f.label || _f }
                                  control={ <Radio/> }/>,
                              ) }
                            </RadioGroup>
                          }
                          { !f.fieldType && (f.fields || f.enum) &&
                            <Select value={ formData[f.name] || '' } onChange={ (e) => onChange({
                              target: {
                                name: f.name,
                                value: e.target.value,
                              },
                            }) } input={ <Input/> }>
                              { _.map(f.enum, (v, i) => (
                                <MenuItem key={ f.name + v } value={ v }>
                                  { f.fields?.[i]?.label || f.fields?.[i] || v }
                                </MenuItem>
                              )) }
                            </Select>
                          }
                          { !f.fieldType && !f.enum && !f.fields &&
                            <TextValidator label={ f.label }
                              onChange={ onChange }
                              name={ f.name }
                              required={ model.required.includes(f.name) }
                              disabled={ f.disabled }
                              fullWidth
                              multiline={ f.height > 0 }
                              rows={ f.height }
                              value={ formData[f.name] || '' }
                              validators={ f.validators }
                              errorMessages={ f.errorMessages }
                              style={ { width: '100%' } }/>
                          }
                          <Typography variant="body2"
                            pt={ 1 }
                            sx={ { color: theme.palette.primary.light } }>{ f.note }</Typography>
                        </FormControl>
                      </Grid>
                    </Fragment>
                  )
                }) }

                <Grid size={ 12 } container alignItems="center" spacing={ 2 }>
                  <Grid size={ 8 }>
                    { activeCat.steps && <LinearProgress variant="determinate"
                      value={ (activeStepIndex + 1) / activeCat.steps.length * 100 }/> }
                  </Grid>
                  <Grid size={ 1 }>
                    { activeCat.steps &&
                      <span>{ activeStepIndex + 1 }/{ activeCat.steps.length } </span> }
                  </Grid>
                  <Grid size={ 3 }>
                    <Button variant="contained"
                      onClick={ nextStep }
                      type={ activeCatIndex === categories.length - 1 ? 'submit' : '' }>
                      { activeCatIndex === categories.length - 1 ? 'Submit' : 'Continue' }
                    </Button>
                  </Grid>
                </Grid>

              </Grid>
            </ValidatorForm>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}