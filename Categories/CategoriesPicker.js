import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Async } from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import LoadingButton from '../../CMS/CommonComponent/Button/LoadingButton'
import useModal from '../../CMS/CommonComponent/CustomHooks/useModal'
import { loadPickedCategories } from '../../reducers/Partial'
import Common from '../../utils/common'
import Configuration from '../../utils/configuration'
import { getData } from '../../utils/data'

function CategoriesPicker({
  type,
  isHaveParent = true,
  isMulti = true,
  languageId,
  ...props
}) {
  const [isOpen, toggle, dataModal, _, setData] = useModal()

  const [loading, setLoading] = useState(false)

  const { register, errors, getValues, handleSubmit } = useForm()

  const [parentCategory, setParentCategory] = useState(null)

  const createCategory = (values) => {
    const id = Common.guid()
    setLoading(true)
    Common.createCategory({
      Id: id,
      Name: values.name,
      ParentId: parentCategory ? parentCategory.value : Common.GUID_EMPTY,
      Type: type,
      DisplayOrder: 99,
      LanguageId: languageId
        ? languageId
        : Common.getCookie(Configuration.tokenLanguage),
    })
      .then(Common.handleResponse)
      .catch(Common.handleError)
      .finally(() => {
        setLoading(false)
        toggle()
      })
  }

  const loadOptions = (inputValue) => {
    return getData
      .getCategories({
        type: type,
        languageId: languageId
          ? languageId
          : Common.getCookie(Configuration.tokenLanguage),
        limit: 20,
        keyword: inputValue,
      })
      .then((res) =>
        res.categories.items.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      )
  }

  return (
    <Card className="mb-2">
      <CardHeader>
        Phân loại
        <div className="btn-actions-pane-right mr-3">
          <Button color="primary" onClick={() => toggle()}>
            Tạo mới
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>Tạo mới phân loại</ModalHeader>
          <ModalBody>
            {isHaveParent ? (
              <FormGroup>
                <Label>Phân loại cha</Label>

                <Async
                  value={parentCategory}
                  defaultOptions
                  loadOptions={loadOptions}
                  onChange={(value) => {
                    console.log(value)
                    setParentCategory(value)
                  }}
                />
              </FormGroup>
            ) : null}
            <FormGroup>
              <Label>Tên phân loại</Label>
              <input
                className="form-control"
                name="name"
                ref={register({
                  required: 'Trường bắt buộc',
                })}
              />
              {errors.name ? (
                <FormFeedback className="d-block">
                  {errors.name.message}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <LoadingButton
              className="btn btn-primary"
              loading={loading}
              onClick={handleSubmit(createCategory)}
            >
              Tạo
            </LoadingButton>
          </ModalFooter>
        </Modal>
        <Async
          value={props.pickedCategories}
          isMulti={isMulti}
          //defaultOptions
          loadOptions={loadOptions}
          onChange={(values) => {
            props.loadPickedCategories(values)
          }}
        />
      </CardBody>
    </Card>
  )
}

function mapStateToProps(state) {
  return {
    pickedCategories: state.Partial.pickedCategories,
  }
}

const mapDispatchToProps = {
  loadPickedCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPicker)
