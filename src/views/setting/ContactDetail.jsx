import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

export default function ContactDetail () {
  return (
    <div className="user-wrapper-box card">
      <div className="heading-name">
        <label>Company Deatails</label>
      </div>
      <div className="basic-detail">
        <Row>
          <Col md={ 12 }>
            <FormGroup>
              <Label for="exampleEmail">
                Company Person Name
              </Label>
              <Input id="companyName"
                name="CompanyName"
                placeholder="Enter Company Name"
                type="text"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="examplePassword">
                Contact Person Email
              </Label>
              <Input id="email"
                name="password"
                placeholder="Enter Email Address"
                type="email"
                value="NA"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleEmail">
                Contact Person Phone
              </Label>
              <Input id="companyName"
                name="CompanyName"
                placeholder="Enter Phone Number"
                type="text"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="examplePassword">
                Contact Person Position
              </Label>
              <Input id="IndustryType" name="IndustryType" type="select">
                <option>
                  1
                </option>
                <option>
                  2
                </option>
                <option>
                  3
                </option>
                <option>
                  4
                </option>
                <option>
                  5
                </option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </div>
  )
}