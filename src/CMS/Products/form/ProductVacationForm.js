import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import LaboFormikGroup from "../../CommonComponent/Form/LaboFormikGroup";
// import CkEditor5Formik from "../../CommonComponent/CkEditor5/CkEditor5formik";
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CustomInput,
  FormGroup,
  Label,
  ListGroup,
  Row,
} from 'reactstrap'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import ListGroupItem from 'reactstrap/lib/ListGroupItem'
import CategoriesPicker from '../../../Layout/Categories/CategoriesPicker'
import FormCkEditorEditor from '../../../Layout/Editor/CkEditor'
import {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
  updateAddress,
} from '../../../reducers/Partial'
import { getAttributes } from '../../../Services/AttributeService'
import {
  createVacationProduct,
  getProduct,
  updateVacationProduct,
} from '../../../Services/ProductService'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import AddressPartial from '../../CommonComponent/AddressPartial'
import LoadingButton from '../../CommonComponent/Button/LoadingButton'
import useModal from '../../CommonComponent/CustomHooks/useModal'
import Footer from '../../CommonComponent/Footer'
import Header from '../../CommonComponent/Header'
import ImagePartial from '../../CommonComponent/ImagePartial/ImagePartial'
import ModalCreateValueVacation from '../Components/ModalCreateValueVacation'
//import { registerLocale, setDefaultLocale } from "react-datepicker";
// import vn from "date-fns/locale/vi";

// import "react-datepicker/dist/react-datepicker.css";
// registerLocale("vn", vn);

function ProductVacationForm(props) {
  const id = props.match.params.id
  const [attributes, setAttributes] = useState()
  const [attributeSelecteds, setAttributeSelecteds] = useState([])
  const [description, setDescription] = useState('')
  const [variations, setVariations] = useState([])
  const merchantId = useSelector((state) => state.System.merchantId)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const [isOpen, toggle, dataModal, setDataModal, setData] = useModal()

  useEffect(() => {
    if (id == undefined) {
      getAttributes({ type: 1, published: true }).then((res) => {
        setAttributes(res.attributes.items)
      })
    }
    if (id !== undefined) {
      console.log(attributes)
      getProduct(id).then((res) => {
        const {
          addresses,
          categories,
          description,
          friendlyUrl,
          images,
          name,
          price,
          productVariants,
          attributeValueIds,
          sku,
          subDescription,
        } = res.product
        console.log(productVariants)
        setValue('sku', sku)
        setValue('name', name)
        setValue('price', price)
        setValue('friendlyUrl', friendlyUrl)
        setValue('subDescription', subDescription)

        // setValue()
        setVariations(
          productVariants.map((variation) => ({
            Id: variation.id,
            Sku: variation.sku,
            Price: variation.price,
            OriginalPrice: variation.originalPrice,
            FromDate: new Date(variation.fromDate),
            ToDate: new Date(variation.toDate),
            ExpireDate: variation.expireDate,
          }))
        )
        setDescription(description)
        setAttributeSelecteds(attributeValueIds)
        getAttributes({ type: 1, published: true }).then((res) => {
          setAttributes(res.attributes.items)
        })
        dispatch(
          loadPickedCategories(
            categories.map((cate) => ({
              value: cate.id,
              label: cate.name,
            }))
          )
        )
        dispatch(
          loadPickedImages(
            images
              .filter((i) => !i.isFeatured)
              .map((img, i) => ({
                id: img.id,
                path: img.path,
                name: img.name,
                displayOrder: i,
              }))
          )
        )
        dispatch(
          loadPickedThumbnailImages(
            images
              .filter((i) => i.isFeatured)
              .map((img, i) => ({
                id: img.id,
                path: img.path,
                name: img.name,
                displayOrder: i,
              }))
          )
        )
        dispatch(
          updateAddress(
            addresses.length > 0
              ? {
                  value: addresses[0].id,
                  label: addresses[0].name,
                }
              : null
          )
        )
      })
    }
    return () => {
      dispatch(loadPickedCategories([]))
    }
  }, [])

  const onDelete = () => {
    const listValues = document.querySelectorAll('.checkboxValues')
    const checkItems = []
    listValues.forEach((value) => {
      const id = value.childNodes[0].getAttributeNode('id').value
      const isCheck = value.childNodes[0].checked
      if (isCheck) checkItems.push(id)
    })

    setVariations(variations.filter((value) => !checkItems.includes(value.Id)))
  }

  const onChangeCkEditorHandler = (ckEditorContent) => {
    setDescription(ckEditorContent)
  }

  const {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm()

  const images = useSelector((state) => state.Partial.images)
  const thumbnailImages = useSelector((state) => state.Partial.thumbnailImages)
  const pickedCategories = useSelector(
    (state) => state.Partial.pickedCategories
  )
  const address = useSelector((state) => state.Partial.address)

  const onSubmit = (values) => {
    if (!_.get(address, 'value')) {
      //alert("hihi");
      setError('address', {
        type: 'manual',
        message: 'Trường bắt buộc',
      })
      return
    }

    const { name, price, friendlyUrl, subDescription, sku } = values
    let relationAttributeValues = []
    attributes.map((val, i) => {
      if (values[val.id] != undefined) {
        values[val.id].map((item, index) => {
          relationAttributeValues.push({
            Id: item.value,
            IsFeatured: false,
            DisplayOrder: i + index,
          })
        })
      }
    })
    const body = {
      addressId: address.value,
      merchantId: merchantId,
      attributeValues: relationAttributeValues,
      categories: Common.createRelationObjectArray(
        pickedCategories.map((cate) => cate.value)
      ),
      images: Common.createImagesRelationObjectArray(images, thumbnailImages),
      description: description,
      friendlyUrl: friendlyUrl,
      name: name,
      price: price,
      productVariants: variations.map((v) => ({
        Id: v.Id,
        Sku: v.Sku,
        Price: v.Price,
        OriginalPrice: v.OriginalPrice,
        FromDate: Common.formatDateTimeMoment(v.FromDate),
        ToDate: Common.formatDateTimeMoment(v.ToDate),
        ExpireDate: v.ExpireDate,
      })),
      sku: sku,
      subDescription: subDescription,
    }
    setLoading(true)
    if (id) {
      updateVacationProduct({
        id: id,
        ...body,
      })
        .then(Common.handleResponse)
        .catch(Common.handleError)
        .finally(() => {
          window.location.href = '#/product/vacation/list'
          setLoading(false)
        })
    } else {
      createVacationProduct(body)
        .then(Common.handleResponse)
        .catch(Common.handleError)
        .finally(() => {
          window.location.href = '#/product/vacation/list'
          setLoading(false)
        })
    }
  }

  return (
    <div className="mb-5">
      <ModalCreateValueVacation
        isOpen={isOpen}
        toggle={toggle}
        dataModal={dataModal}
        variations={variations}
        setVariations={setVariations}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Sản phẩm kì nghỉ"
          iconClassName="pe-7s-cart"
          description="Thông tin kì nghỉ"
        />
        <Row>
          <Col md="9">
            <Card className="mb-2">
              <CardHeader>Thông tin sản phẩm</CardHeader>
              <CardBody>
                <FormGroup>
                  <label>Mã sản phẩm</label>
                  <input
                    placeholder="Mã tự sinh nếu bỏ trống"
                    name="sku"
                    type="text"
                    ref={register}
                    className="form-control"
                  />

                  {/* {errors.sku ? (
                                        <FormFeedback className="d-block">
                                            {errors.sku.message}
                                        </FormFeedback>
                                    ) : null} */}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Tên sản phẩm <span className="red">*</span>
                  </Label>
                  <input
                    type="text"
                    name="name"
                    onBlur={() => {
                      if (getValues('friendlyUrl').trim() == '') {
                        setValue(
                          'friendlyUrl',
                          Common.rewriteUrl(getValues('name'))
                        )
                      }
                    }}
                    ref={register({
                      required: 'Trường bắt buộc',
                    })}
                    className="form-control"
                  />
                  {errors.name ? (
                    <FormFeedback className="d-block">
                      {errors.name.message}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Giá (VNĐ) <span className="red">*</span>
                  </Label>
                  <input
                    minLength="0"
                    type="number"
                    name="price"
                    ref={register({
                      required: 'Trường bắt buộc',
                      min: 0,
                    })}
                    className="form-control"
                  />
                  {errors.price ? (
                    <FormFeedback className="d-block">
                      {errors.price.message}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Link thân thiện <span className="red">*</span>
                  </Label>
                  <input
                    type="text"
                    name="friendlyUrl"
                    ref={register({
                      required: 'Trường bắt buộc',
                      maxLength: 256,
                    })}
                    className="form-control"
                  />
                  {errors.price ? (
                    <FormFeedback className="d-block">
                      {errors.price.message}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label>Trích dẫn</Label>
                  <textarea
                    pe="text"
                    name="subDescription"
                    ref={register({
                      maxLength: 400,
                    })}
                    className="form-control"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Miêu tả</Label>
                  <FormCkEditorEditor
                    onchange={onChangeCkEditorHandler}
                    content={description}
                  />
                </FormGroup>
                {attributes !== undefined &&
                  attributes.map((item, i) => {
                    const options = []
                    item.attributeValues.map((subItem, subI) => {
                      options.push({
                        value: subItem.id,
                        label: subItem.name,
                      })
                    })

                    return (
                      <FormGroup>
                        <Label>{item.name}</Label>
                        <Controller
                          isMulti
                          name={item.id}
                          as={Select}
                          defaultValue={options.filter(
                            (e) => attributeSelecteds.includes(e.value) > 0
                          )}
                          options={options}
                          control={control}
                          //rules={{ required: true }}
                        />
                      </FormGroup>
                    )
                  })}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Thời gian kì nghỉ</CardHeader>
              <CardBody>
                <ListGroup id="listValues" className="todo-list-wrapper" flush>
                  {variations && variations.length > 0 ? (
                    variations.map((value, index) => (
                      <ListGroupItem style={{ zIndex: 0 }}>
                        <div className="todo-indicator bg-info" />
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-2">
                              <CustomInput
                                className="checkboxValues"
                                type="checkbox"
                                id={value.Id}
                                label="&nbsp;"
                              />
                            </div>
                            <div className="widget-content-left mr-3"></div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                <a
                                  href="iumin"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toggle(value)
                                  }}
                                >
                                  Từ{' '}
                                  {moment(value.FromDate).format('DD/MM/YYYY')}{' '}
                                  đến{' '}
                                  {moment(value.ToDate).format('DD/MM/YYYY')} -
                                  Ngày hết hạn:{' '}
                                  {moment(value.ExpireDate).format(
                                    'DD/MM/YYYY'
                                  )}{' '}
                                  - Đơn giá:{' '}
                                  <span className="red">
                                    {Common.formatMoney(value.Price, 0)}
                                  </span>
                                </a>
                              </div>
                              <div className="widget-subheading">
                                {/* A short description here */}
                              </div>
                            </div>
                            <div className="widget-content-right">
                              {/* <DragHander /> */}
                            </div>
                          </div>
                        </div>
                      </ListGroupItem>
                    ))
                  ) : (
                    <td colSpan="6" className="text-center">
                      <i>Chưa có giá trị nào</i>
                    </td>
                  )}
                </ListGroup>
              </CardBody>

              <CardFooter className="d-block clearfix">
                <div className="float-left">
                  <Button
                    size="sm"
                    className="mr-2 btn-icon btn-icon-only"
                    outline
                    color="danger"
                    onClick={onDelete}
                  >
                    Xóa
                  </Button>
                </div>
                <div className="float-right">
                  <Button
                    size="sm"
                    className="btn-wide btn-shadow"
                    color="primary"
                    onClick={() => {
                      toggle(null)
                    }}
                  >
                    Thêm thời gian kì nghỉ
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="3">
            <CategoriesPicker
              type={Configuration.categoryTypes.PRODUCT}
              languageId={
                Common.getParameterByName('languageId')
                  ? Common.getParameterByName('languageId')
                  : Common.getCookie(Configuration.tokenLanguage)
              }
            />
            <ImagePartial thumbnail />
            <ImagePartial />
            <AddressPartial
              error={_.get(errors, 'address.message')}
              onChange={() => {
                clearErrors('address')
              }}
            />
          </Col>
        </Row>
        <Footer
          left={
            <LoadingButton
              className="btn btn-shadow btn-success"
              color="success"
              loading={loading}
              // onClick={onSubmit}
            >
              Lưu
            </LoadingButton>
          }
        />
      </form>
    </div>
  )
}

export default ProductVacationForm
