import React, { Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { Card, CardBody, CardTitle, Col, ListGroupItem, Row } from 'reactstrap'
import Configuration from '../../utils/configuration'
import MultipleItems from './MultipleItems'

class FileDropZone extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      previewImages: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.images != undefined) {
      return {
        previewImages: props.images.map((image) => ({
          name: image.name,
          src: Configuration.image_url + image.path,
        })),
      }
    }
  }

  onDrop(files) {
    console.log(files[0])
    const reader = new FileReader()
    reader.readAsDataURL(files[0])

    reader.addEventListener(
      'load',
      () => {
        this.setState({
          previewImages: [
            ...this.state.previewImages,
            {
              name: files[0].name,
              src: reader.result,
            },
          ],
        })
      },
      false
    )
  }

  onCancel() {
    this.setState({
      files: [],
    })
  }

  render() {
    const files = this.state.files.map((file) => (
      <ListGroupItem key={file.name}>
        {file.name} - {file.size} bytes
      </ListGroupItem>
    ))
    return (
      <Fragment>
        <Row>
          <Col md="6">
            <div className="dropzone-wrapper dropzone-wrapper-lg">
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                onFileDialogCancel={this.onCancel.bind(this)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dropzone-content">
                      <p>
                        Try dropping some files here, or click to select files
                        to upload.
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Col>
          <Col md="6">
            {/* <b className="mb-2 d-block">Dropped Files</b> */}

            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Dropped Files</CardTitle>
                <MultipleItems previewImages={this.state.previewImages} />
              </CardBody>
            </Card>

            {/* <ListGroup>
                            {this.state.previewImages.map((previewImage, index) => {
                                return (
                                    <img key={index} width={300} src={previewImage}/>
                                )
                            })}
                        </ListGroup> */}
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default FileDropZone
