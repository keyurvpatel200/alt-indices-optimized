import { useState } from 'react'
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'

import AddSVG from 'icons/Add'

export default function CreateOwnDashboard (args) {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  return (
    <>
      <div className="card create-own-dashboard">
        <h3>Create your Own Dashboard</h3>
        <p>Select the Benchmarking to be displayed here</p>
        <button className="add" onClick={ toggle }><AddSVG/> Add</button>
      </div>

      <Modal className="create-dashboard-modal"
        isOpen={ modal }
        toggle={ toggle } { ...args }
        centered>
        <ModalHeader>Select Interest</ModalHeader>
        <ModalBody>

          <Row className="choose-asset">
            <Col md={ 12 } className="box">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Return Objective Benchmark
                </Label>
              </FormGroup>
            </Col>
            <Col md={ 12 } className="box">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Model Portfolio Benchmark
                </Label>
              </FormGroup>
            </Col>
            <Col md={ 12 } className="box">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Total Portfolio Policy Benchmark
                </Label>
              </FormGroup>
            </Col>
            <Col md={ 12 } className="box">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Interquatile Range
                </Label>
              </FormGroup>
            </Col>
            <Col md={ 12 } className="box">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Asset Hierarchy
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="actions">
          <Button className="cancel-btn" onClick={ toggle }>
            Skip
          </Button>{ ' ' }
          <Button className="add-btn" onClick={ toggle }>
            Apply
          </Button>
        </ModalFooter>
      </Modal>

    </>
  )
}