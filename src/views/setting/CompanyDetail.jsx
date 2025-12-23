import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'

import editIcon from '../../assets/images/edit-icon.svg'

export default function CompanyDetail () {
  return (
    <div className="user-wrapper-box card">
      <div className="heading-name">
        <label>Company Deatails</label>
      </div>
      <div className="basic-detail">
        <Row>
          <div className="row-panel">
            <div className="avatar-edit-img">
              <span>Profile Picture</span>
              <div className="upload-avatar">
                <Input id="exampleFile" name="file" type="file"/>
                <Button variant="contained">
                  <img src={ editIcon } alt="google" width={ 16 } height={ 21 }/>
                </Button>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleEmail">
                Contact Person Name
              </Label>
              <Input id="companyName"
                name="CompanyName"
                placeholder="Enter Contact person"
                type="text"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="examplePassword">
                Email
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
                Company Started
              </Label>
              <Input id="companyName"
                name="CompanyName"
                placeholder="Enter Company Name"
                type="date"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleSelect">
                Industry Type
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
        <Row>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleEmail">
                ID Number
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
                Phone
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
                Address
              </Label>
              <Input id="companyName" name="CompanyName" placeholder="Enter Address" type="text"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="examplePassword">
                Street
              </Label>
              <Input id="email" name="password" placeholder="Enter Street" type="email" value="NA"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleSelect">
                State / Province
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
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleSelect">
                City
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
        <Row>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleEmail">
                Zip / Postal Code
              </Label>
              <Input id="companyName" name="CompanyName" placeholder="Enter Zip Code" type="text"/>
            </FormGroup>
          </Col>
          <Col md={ 6 }>
            <FormGroup>
              <Label for="exampleSelect">
                Country / Region
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