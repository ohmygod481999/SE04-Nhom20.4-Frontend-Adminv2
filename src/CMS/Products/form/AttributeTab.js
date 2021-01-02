import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Creatable } from 'react-select'
import { toast } from 'react-toastify'
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap'
import Swal from 'sweetalert2'
import {
  addAtrtibute,
  addValueAttribute,
  deleteAtrtibute,
  editValuesAtrtibute,
  validateAttribute,
} from '../../../reducers/Product'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import { getData, postData } from '../../../utils/data'
import { ErrorMessage } from '../../CommonComponent'
import LoadingButton from '../../CommonComponent/Button/LoadingButton'
import CkEditor5Formik from '../../CommonComponent/CkEditor5/CkEditor5formik'
import LaboFormikGroup from '../../CommonComponent/Form/LaboFormikGroup'
import styles from './attributeTab.module.css'

function AttributeTab() {
  const product = useSelector((state) => state.Product)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    getData.getAttributes().then((res) => {
      setAttributes(res.attributes.items)
    })
    return () => {}
  }, [])

  const createAttributeForm = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values) => {
      console.log(values)
      const { name, description } = values
      const id = Common.guid()
      const body = {
        Id: id,
        Name: name,
        Description: description,
        Type: 1, //TYPE ????
        MerchantId: Common.getCookie('merchantId'),
        ImageRelations: null,
        LanguageId: Common.getCookie(Configuration.tokenLanguage),
        CreatedDate: new Date(),
        CreatedBy: Common.getCookie('userId'),
      }

      setLoading(true)
      postData
        .sendCommand('Attribute', 'CreateAttribute', body)
        .then((res) => {
          const { Message, Success } = res.data
          if (Success) {
            toast['success']('Thành công')
            dispatch(addAtrtibute({ id: id, name: name }))
            setIsOpen(false)
          } else toast['error'](Message)
        })
        .catch(Common.handleError)
        .finally(() => setLoading(false))
    },
    validate: (values) => {
      const errors = {}
      if (!values.name) errors.name = 'Trường này không được để trống'

      return errors
    },
  })

  const dispatch = useDispatch()

  const addAttributeHandler = () => {
    const value = document.getElementById('attributeSelect').value

    switch (value) {
      case 'custom':
        toggle()
        break

      default:
        const newAttribute = attributes.find(
          (attribute) => attribute.id === value
        )
        console.log(newAttribute)
        dispatch(
          addAtrtibute({
            id: newAttribute.id,
            name: newAttribute.name,
            allValues: newAttribute.attributeValues,
          })
        )
        break
    }
  }

  const deleteAttributeHandler = (id) => {
    if (product.variations.length > 0)
      // Swal.fire({
      //     title: "Cảnh báo",
      //     text:
      //         "Nếu xóa thuộc tính, bạn sẽ phải cài đặt các biến thể từ đầu, bạn có chắc chắn muốn làm điều này?",
      //     showCancelButton: true,
      // }).then(({ value }) => {
      //     if (value) {
      //         dispatch(deleteAtrtibute(id));
      //     }
      // });
      dispatch(deleteAtrtibute(id))
    else {
      dispatch(deleteAtrtibute(id))
    }
  }

  //ADD ATTRIBUTE HANDLER
  const handleCreate = (id, inputValue) => {
    const valueId = Common.guid()
    const body = {
      Id: id,
      AttributeValueId: valueId,
      Value: inputValue,
      ImageId: null,
      ModifiedDate: new Date(),
      ModifiedBy: Common.getCookie('userId'),
      DisplayOrder: 0,
      LanguageId: Common.getCookie(Configuration.tokenLanguage),
    }
    setLoading(true)
    postData
      .sendCommand('Attribute', 'AddAttributeValue', body)
      .then((res) => {
        const { Message, Success } = res.data
        if (Success) {
          dispatch(
            addValueAttribute(id, {
              id: valueId,
              name: inputValue,
            })
          )
        } else {
          Swal.fire({
            title: 'Thất bại',
            text: Message,
            icon: 'error',
          })
        }
      })
      .catch(Common.handleError)
      .finally(() => {
        setLoading(false)
        dispatch(validateAttribute())
      })
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="form-inline mb-3">
        <div className="input-group">
          <Input type="select" id="attributeSelect">
            <option value="custom">Custom</option>
            {attributes.map((attribute) => (
              <option value={attribute.id}>{attribute.name}</option>
            ))}
          </Input>
          <div className="input-group-append">
            <Button color="primary" onClick={addAttributeHandler}>
              Thêm
            </Button>
          </div>
        </div>
      </div>
      <div>
        {product.attributes.map((attribute) => (
          <div key={attribute.id} className={styles.attributeItem}>
            <div className={styles.attributeHeader}>
              {attribute.name}
              <div style={{ float: 'right' }}>
                <Button
                  color="link"
                  onClick={() => deleteAttributeHandler(attribute.id)}
                >
                  X
                </Button>
              </div>
            </div>
            <div>
              <Row>
                <Label sm="2">Name:</Label>
                <Col sm="10">
                  <div
                    style={{
                      padding: '7px',
                    }}
                  >
                    <strong>{attribute.name}</strong>
                  </div>
                </Col>
              </Row>
              <FormGroup row>
                <Label sm="2">Values:</Label>
                <Col md="10">
                  <Creatable
                    isMulti
                    isClearable
                    isLoading={loading}
                    options={attribute.allValues.map((val) => ({
                      label: val.name,
                      value: val.id,
                    }))}
                    value={attribute.values.map((val) => ({
                      label: val.name,
                      value: val.id,
                    }))}
                    onChange={(values) => {
                      dispatch(
                        editValuesAtrtibute(
                          attribute.id,
                          values.map((val) => ({
                            id: val.value,
                            name: val.label,
                          }))
                        )
                      )

                      dispatch(validateAttribute())
                    }}
                    onCreateOption={(inputValue) =>
                      handleCreate(attribute.id, inputValue)
                    }
                  />
                  <ErrorMessage
                    isDisplay={attribute.errors ? true : false}
                    error={attribute.errors}
                  />
                </Col>
              </FormGroup>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Attribute</ModalHeader>
        <ModalBody>
          <LaboFormikGroup
            formik={createAttributeForm}
            label="Tên <span class='red'>*</span>"
            name="name"
          />
          <CkEditor5Formik formik={createAttributeForm} name="description" />
          <LoadingButton
            color="primary"
            className="mt-2 btn btn-shadow btn-success"
            loading={loading}
            onClick={createAttributeForm.handleSubmit}
          >
            Lưu
          </LoadingButton>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AttributeTab
