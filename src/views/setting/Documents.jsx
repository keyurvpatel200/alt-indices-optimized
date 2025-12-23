import { Col, FormGroup, Input, Label } from 'reactstrap'

import FileUploaders from '../../components/fileuploader/FileUploaders'
import view from '../../assets/images/view.svg'
import Delete from '../../assets/images/trash.svg'

export default function Documents () {
  return (
    <div className="user-wrapper-box card">
      <div className="heading-name">
        <label>Company Details</label>
      </div>
      <div className="basic-detail file-uploade-wrap">
        <div className="saperate-section">
          <label className="heading">Certification of Incorporation</label>
          <div className="upload-section">
            <div className="drag-section">
              <FileUploaders/>
            </div>
            <div className="file-action">
              <a href="#view">
                <img src={ view } alt="google" width={ 16 } height={ 21 }/>
              </a>
              <a href="#delete">
                <img src={ Delete } alt="google" width={ 16 } height={ 21 }/>
              </a>
            </div>
          </div>
        </div>

        <div className="saperate-section">
          <label className="heading">Business License</label>
          <div className="upload-section">
            <div className="drag-section">
              <FileUploaders/>
            </div>
            <div className="file-action">
              <a href="#view">
                <img src={ view } alt="google" width={ 16 } height={ 21 }/>
              </a>
              <a href="#delete">
                <img src={ Delete } alt="google" width={ 16 } height={ 21 }/>
              </a>
            </div>
          </div>
        </div>

        <div className="saperate-section">
          <label className="heading">Tax Registration Document</label>
          <div className="upload-section">
            <div className="drag-section">
              <FileUploaders/>
            </div>
            <div className="file-action">
              <a href="#view">
                <img src={ view } alt="google" width={ 16 } height={ 21 }/>
              </a>
              <a href="#delete">
                <img src={ Delete } alt="google" width={ 16 } height={ 21 }/>
              </a>
            </div>
          </div>
        </div>
        <div className="saperate-section">
          <Col md={ 6 }>
            <FormGroup>
              <Label for="examplePassword">
                Proof of Identity for Authorized Representative
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
          <div className="upload-section">
            <div className="drag-section">
              <FileUploaders/>
            </div>
            <div className="file-action">
              <a href="#view">
                <img src={ view } alt="google" width={ 16 } height={ 21 }/>
              </a>
              <a href="#delete">
                <img src={ Delete } alt="google" width={ 16 } height={ 21 }/>
              </a>
            </div>
          </div>

          <FormGroup className="passowrd-regex" column>
            <button className="save-change-btn">Save changes</button>
          </FormGroup>
        </div>
      </div>
    </div>
  )
}