import { Col, Form, FormGroup, Input, Label } from 'reactstrap'

export default function ChangePassword () {
  return (
    <div className="user-wrapper-box card">
      <div className="heading-name">
        <label>Change your password</label>
      </div>
      <div className="basic-detail">
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              Current password
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail"
                name="email"
                placeholder="Enter current password"
                type="email"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              New password
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail" name="email" placeholder="Enter new password" type="email"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={ 2 }>
              Confirm new password
            </Label>
            <Col sm={ 10 }>
              <Input id="exampleEmail"
                name="email"
                placeholder="Confirm new password"
                type="email"/>
            </Col>
          </FormGroup>
          <FormGroup className="passowrd-regex" column>
            <Col sm={ 2 }>
            </Col>
            <Col sm={ 10 }>
              <label>Password requirements:</label>
              <ul>
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase character</li>
                <li>At least one uppercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </ul>
            </Col>
          </FormGroup>
          <FormGroup className="passowrd-regex" column>
            <Col sm={ 12 }>
              <button className="save-change-btn">Save changes</button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
}