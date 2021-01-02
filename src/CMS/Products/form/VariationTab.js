import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import {
  addVatiation,
  createVariationsFromAttributes,
  deleteVatiation,
  editContentVariation,
} from '../../../reducers/Product'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import ModalImage from '../../CommonComponent/ImagePartial2/ModalImage'

function VariationTab() {
  const product = useSelector((state) => state.Product)
  const dispatch = useDispatch()
  const variations = product.variations

  const [accordion, setAccordion] = useState(
    Array.apply(null, Array(variations.length)).map((val) => false)
  )

  useEffect(() => {
    setAccordion(
      Array.apply(null, Array(variations.length)).map((val) => false)
    )
  }, [variations.length])

  const toggleAccordion = (tab) => {
    const prevState = accordion
    const state = prevState.map((x, index) => (tab === index ? !x : false))
    setAccordion(state)
  }

  const addVariationHandler = () => {
    const option = document.getElementById('addVariationSelect').value

    switch (option) {
      case 'new':
        dispatch(addVatiation())
        break
      case 'automate':
        dispatch(createVariationsFromAttributes())
        break

      default:
        break
    }
  }

  const onChangeSelectAttribute = (value, variation, attribute) => {
    const newAttributes = variation.attributes.map((attr) => {
      if (attr.id === attribute.id) {
        return {
          ...attr,
          value: {
            id: value.value,
            name: value.label,
          },
        }
      }
      return attr
    })
    dispatch(editContentVariation(variation.id, 'attributes', newAttributes))
    let code = ''
    let name = ''
    newAttributes.forEach((attr, i) => {
      if (!attr.value) return
      if (i === 0) {
        code += Common.change_alias(attr.value.name.toLowerCase())
        name += Common.change_alias(attr.value.name)
        return
      }
      code += `_${Common.change_alias(attr.value.name.toLowerCase())}`
      name += ` ${Common.change_alias(attr.value.name)}`
    })
    dispatch(editContentVariation(variation.id, 'name', name))
    dispatch(editContentVariation(variation.id, 'code', code))
  }

  return (
    <div>
      <div className="form-inline mb-3">
        <div className="input-group">
          <Input type="select" id="addVariationSelect">
            <option value="automate">
              Thêm biến thể theo thuộc tính tự động
            </option>
            <option value="new">Thêm biến thể mới</option>
          </Input>
          <div className="input-group-append">
            <Button color="primary" onClick={addVariationHandler}>
              Thêm
            </Button>
          </div>
        </div>
      </div>
      <div id="accordion" className="accordion-wrapper mb-3">
        {variations.map((variation, i) => (
          <Card key={variation.id}>
            <CardHeader id="headingOne">
              <Button
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => toggleAccordion(i)}
                aria-expanded={accordion[i]}
              >
                <h5 className="m-0 p-0">
                  #{i + 1} {variation.code}{' '}
                  {variation.errors && (
                    <span className="red">({variation.errors})</span>
                  )}
                </h5>
              </Button>
              <div className="btn-actions-pane-right actions-icon-btn">
                <Button
                  className="mb-2 mr-2 btn-icon btn-icon-only btn-outline-2x"
                  outline
                  color="link"
                  onClick={() => dispatch(deleteVatiation(variation.id))}
                >
                  <i
                    className="pe-7s-trash btn-icon-wrapper"
                    style={{ color: 'red' }}
                  />
                </Button>
              </div>
            </CardHeader>
            <Collapse isOpen={accordion[i]}>
              <CardBody>
                <Row>
                  <Col md="12" className="mb-3">
                    <img
                      className="mr-2"
                      style={{ maxWidth: 300 }}
                      src={
                        Configuration.image_url + _.get(variation, 'image.path')
                      }
                      alt="default img"
                    />
                    <ModalImage
                      pickOne
                      onChange={(img) => {
                        dispatch(
                          editContentVariation(variation.id, 'image', img[0])
                        )
                      }}
                    />
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Mã</Label>
                      <Input
                        type="text"
                        name="code"
                        value={variation.code}
                        onChange={(e) =>
                          dispatch(
                            editContentVariation(
                              variation.id,
                              'code',
                              e.target.value
                            )
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="12">
                                        <FormGroup>
                                            <Label>Tên</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={variation.name}
                                                onChange={(e) =>
                                                    dispatch(
                                                        editContentVariation(
                                                            variation.id,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    </Col> */}
                  <Col md="12">
                    <FormGroup>
                      <Label>Giá</Label>
                      <Input
                        type="number"
                        name="price"
                        value={variation.price}
                        onChange={(e) =>
                          dispatch(
                            editContentVariation(
                              variation.id,
                              'price',
                              e.target.value
                            )
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Thuộc tính</Label>
                      {variation.attributes.map((attribute) => (
                        <FormGroup row key={attribute.id}>
                          <Label sm="2">{attribute.name}</Label>
                          <Col md="10">
                            <Select
                              // isClearable
                              options={product.attributes
                                .find((attr) => attr.id === attribute.id)
                                .values.map((value) => ({
                                  value: value.id,
                                  label: value.name,
                                }))}
                              onChange={(value) =>
                                onChangeSelectAttribute(
                                  value,
                                  variation,
                                  attribute
                                )
                              }
                              value={{
                                value: _.get(attribute, 'value.id'),
                                label: _.get(attribute, 'value.name'),
                              }}
                            />
                          </Col>
                        </FormGroup>
                      ))}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default VariationTab
