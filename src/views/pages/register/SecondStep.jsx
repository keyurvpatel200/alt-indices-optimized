import { FormGroup, Input, Label } from 'reactstrap'

export default function SecondStep () {
  return (
    <div className="common-box">
      <FormGroup check>
        <Input name="radio1" type="radio"/>
        { ' ' }
        <Label check>
          Endowment / Trust
        </Label>
        <FormGroup tag="fieldset" className="radio-group">
          <FormGroup check>
            <Input name="radio11" type="radio"/>
            { ' ' }
            <Label check>
              Endowment / Trust
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input name="radio11" type="radio"/>
            { ' ' }
            <Label check>
              Pension Fund
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input name="radio11" type="radio"/>
            { ' ' }
            <Label check>
              Insurance Company
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input name="radio11" type="radio"/>
            { ' ' }
            <Label check>
              Sovereign Fund
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input name="radio11" type="radio"/>
            { ' ' }
            <Label check>
              Other
            </Label>
          </FormGroup>
          <div className="other-inputbox">
            <Input placeholder="Other"/>
          </div>
        </FormGroup>
      </FormGroup>
      <FormGroup check>
        <Input name="radio1" type="radio" defaultChecked/>
        { ' ' }
        <Label check>
          Fund manager / General Partner
        </Label>
      </FormGroup>
    </div>
  )
}