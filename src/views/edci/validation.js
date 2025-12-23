import _ from 'lodash'

const ruleMap = {
  maxLength: ['maxStringLength', 'Max length is $1'],
  minLength: ['minStringLength', 'Min length is $1'],
  minimum: ['minNumber', 'Minimum number is $1'],
  maximum: ['maxNumber', 'Maximum number is $2'],
}
export default function makeValidators (model) {
  _.each(model.properties, (p, name) => {
    p.validators = []
    p.errorMessages = []
    if (model.required.includes(name)) {
      p.validators.push('required')
      p.errorMessages.push('This field is required.')
    }
    _.each(ruleMap, (rule, name) => {
      if (!_.isNil(p[name])) {
        p.validators.push(`${rule[0]}:${ p[name] }`)
        let message = `${rule[1]}`
        message = message.replace('$1', p[name])
        p.errorMessages.push(message)
      }
    })
  })
  return model
}