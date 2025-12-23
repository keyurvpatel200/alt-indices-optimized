import { Col, Form, FormGroup, Input, Label } from 'reactstrap'

export default function PortfolioAccount () {
  return (
    <div className="user-wrapper-box card">
      <div className="heading-name">
        <label>Portfolio Account</label>
      </div>
      <div className="basic-detail">
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              Account Number
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail"
                name="email"
                placeholder="Enter Account Number"
                type="email"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              Client ID
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail" name="email" placeholder="Enter Client ID" type="email"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              Demat (BO)
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail" name="email" placeholder="Enter Demat" type="email"/>
            </Col>
          </FormGroup>
          <FormGroup className="passowrd-regex" column>
            <button className="save-change-btn">Save changes</button>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
}