import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'
import { setProduct, validateVariation } from '../../../reducers/Product'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import { getData, postData } from '../../../utils/data'
import LoadingButton from '../../CommonComponent/Button/LoadingButton'
import CategoryPartial from '../../CommonComponent/CategoryPartial'
import CkEditor5Formik from '../../CommonComponent/CkEditor5/CkEditor5formik'
import Footer from '../../CommonComponent/Footer'
import LaboFormikGroup from '../../CommonComponent/Form/LaboFormikGroup'
import Header from '../../CommonComponent/Header'
import ImagePartial from '../../CommonComponent/ImagePartial2/ImagePartial'
import AttributeTab from './AttributeTab'
import VariationTab from './VariationTab'

function ProductForm(props) {
  const idProduct = props.match.params.id
  const [activeTab, setActiveTab] = useState('1')
  const [loading, setLoading] = useState(false)
  const [productInfo, setProductInfo] = useState({
    sku: '',
    name: '',
    price: 0,
    subDescription: '',
    categories: [],
    images: [],
    thumbnailImages: [],
  })
  const product = useSelector((state) => state.Product)
  const attributes = product.attributes
  const variations = product.variations
  const dispatch = useDispatch()

  useEffect(() => {
    if (idProduct) {
      getData
        .getAttributes()
        .then((res) => res.attributes.items)
        .then((attributes) => {
          console.log(attributes)
          getData.getProduct(idProduct).then((result) => {
            console.log(result.product.productVariants)
            const pickAttributesObject = {}
            result.product.productVariants.forEach((variation) => {
              variation.attributeValues.forEach((value) => {
                const attribute = attributes.find(
                  (attribute) => attribute.id === value.attributeId
                )
                if (pickAttributesObject[value.attributeId]) {
                  // Kiem tra neu value do ton tai roi thi thoi, ko add nua
                  for (let val of pickAttributesObject[value.attributeId]
                    .values) {
                    if (val.id === value.id) return
                  }
                  //add value do vao attribute [attributeId]
                  pickAttributesObject[value.attributeId].values.push({
                    id: value.id,
                    name: value.value,
                  })
                } else {
                  // Neu attribute do chua ton tai, them moi
                  pickAttributesObject[value.attributeId] = {
                    id: value.attributeId,
                    name: value.name,
                    values: [
                      {
                        id: value.id,
                        name: value.value,
                      },
                    ],
                    allValues: attribute ? attribute.attributeValues : [],
                    errors: null,
                  }
                }
              })
            })
            const pickAttributesArray = Object.keys(pickAttributesObject).map(
              (key) => pickAttributesObject[key]
            )
            setProductInfo({
              ...result.product,
              images: result.product.images.filter((img) => !img.isFeatured),
              thumbnailImages: result.product.images.filter(
                (img) => img.isFeatured
              ),
            })
            dispatch(
              setProduct({
                attributes: pickAttributesArray,
                variations: result.product.productVariants.map((variation) => ({
                  id: variation.id,
                  code: variation.sku,
                  price: variation.price,
                  image: variation.images ? variation.images[0] : null,
                  attributes: variation.attributeValues.map((value) => ({
                    id: value.attributeId,
                    name: value.name,
                    value: {
                      id: value.id,
                      name: value.value,
                    },
                  })),
                })),
              })
            )
          })
        })
    }
    return () => {
      dispatch(
        setProduct({
          attributes: [],
          variations: [],
        })
      )
    }
  }, [])

  const formProduct = useFormik({
    enableReinitialize: true,
    initialValues: productInfo,
    onSubmit: (values) => {
      for (let attribute of attributes) {
        if (attribute.errors) return
      }
      for (let variation of variations) {
        if (variation.errors) {
          toVariationTab()
          document
            .getElementById('accordion')
            .scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
      const {
        sku,
        name,
        price,
        friendlyUrl,
        subDescription,
        description,
        categories,
        images,
        thumbnailImages,
      } = values
      // console.log(values);
      // console.log(variations);
      const productVariant = variations.map((variation) => ({
        Id: variation.id,
        Name: variation.name,
        Sku: variation.code,
        Price: variation.price,
        Images: variation.image
          ? Common.createRelationObjectArray([variation.image.id])
          : null,
        AttributeValues: Common.createRelationObjectArray(
          variation.attributes.map((val) => val.value.id)
        ),
      }))

      const body = {
        Id:
          props.match.params.id !== undefined
            ? props.match.params.id
            : Common.guid(),
        MerchantId: Common.getCookie('merchantId'),
        Name: name,
        SubDescription: subDescription,
        Description: description,
        Sku: sku,
        Price: price,
        FriendlyUrl: friendlyUrl,
        Categories: Common.createRelationObjectArray(
          categories.map((val) => val.id)
        ),
        Images: Common.createImagesRelationObjectArray(images, thumbnailImages),
        CommandInformation: window.location.href,
        LanguageId: props.match.params.id
          ? Common.getParameterByName('languageId')
          : Common.getCookie(Configuration.tokenLanguage),
        CreatedDate: new Date(),
        CreatedBy: Common.getCookie('userId'),
        ProductVariants: productVariant,
      }
      // return console.log(body);
      setLoading(true)
      postData
        .sendCommand(
          'Product',
          props.match.params.id
            ? 'UpdateInformationProductVersion01'
            : 'CreateProductVersion01',
          body
        )
        .then(Common.handleResponse)
        .catch(Common.handleError)
        .finally(() => setLoading(false))
    },
    validate: (values) => {
      const errors = {}
      const friendlyUrlRegex = new RegExp('^[a-zA-Z0-9-]*$')
      if (!values.friendlyUrl || !friendlyUrlRegex.test(values.friendlyUrl))
        errors.friendlyUrl =
          "Link thân thiện chỉ có thể tồn tại chữ không dấu và dấu '-'"
      if (!values.name) errors.name = 'required!'
      if (values.price === undefined) errors.price = 'required!'
      dispatch(validateVariation())
      return errors
    },
  })

  const toVariationTab = () => {
    for (let attribute of attributes) {
      if (attribute.errors) return
    }
    setActiveTab('2')
  }

  return (
    <div className="mb-5">
      <Header title="Product" iconClassName="pe-7s-cart" />
      <Row>
        <Col md="8">
          <Card className="mb-2">
            <CardHeader>Thông tin sản phẩm</CardHeader>
            <CardBody>
              <LaboFormikGroup
                label="Mã sản phẩm"
                formik={formProduct}
                name="sku"
                placeholder="Mã tự sinh nếu bỏ trống"
                row
              />
              <LaboFormikGroup
                label="Tên sản phẩm <span class='red'>*</span>"
                formik={formProduct}
                name="name"
                row
                onBlur={() => {
                  formProduct.setFieldValue(
                    'friendlyUrl',
                    Common.rewriteUrl(formProduct.values['name'])
                  )
                }}
              />
              <LaboFormikGroup
                label="Giá (VNĐ) <span class='red'>*</span>"
                formik={formProduct}
                type="number"
                name="price"
                row
              />
              <LaboFormikGroup
                label="Link thân thiện <span class='red'>*</span>"
                formik={formProduct}
                name="friendlyUrl"
                row
              />
              <LaboFormikGroup
                label="Trích dẫn"
                formik={formProduct}
                type="textarea"
                name="subDescription"
                row
              />
              <FormGroup row>
                <Label sm="2" for="description">
                  Miêu tả
                </Label>
                <Col sm="10">
                  <CkEditor5Formik formik={formProduct} name="description" />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Biến thể sản phẩm</CardHeader>
            <CardBody>
              <div className="forms-wizard-vertical">
                <div>
                  <ol className="forms-wizard">
                    <li
                      className={
                        activeTab === '1'
                          ? 'form-wizard-step-doing'
                          : 'form-wizard-step-todo'
                      }
                      value="0"
                      onClick={() => setActiveTab('1')}
                    >
                      <em>1</em>
                      <span>Thuộc tính</span>
                    </li>
                    <li
                      className={
                        activeTab === '2'
                          ? 'form-wizard-step-doing'
                          : 'form-wizard-step-todo'
                      }
                      value="1"
                      onClick={toVariationTab}
                    >
                      <em>2</em>
                      <span>Biến thể</span>
                    </li>
                  </ol>
                  <div
                    className="form-wizard-content"
                    style={{
                      overflowX: 'hidden',
                    }}
                  >
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <AttributeTab />
                      </TabPane>
                      <TabPane tabId="2">
                        <VariationTab />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <CategoryPartial
            formik={formProduct}
            name="categories"
            type={Configuration.categoryTypes.PRODUCT}
          />
          <ImagePartial
            formik={formProduct}
            name="thumbnailImages"
            title="Ảnh đại diện"
          />
          <ImagePartial formik={formProduct} name="images" title="Ảnh" />
        </Col>
      </Row>
      <Footer
        left={
          <LoadingButton
            color="success"
            loading={loading}
            onClick={formProduct.handleSubmit}
          >
            Lưu
          </LoadingButton>
        }
      />
    </div>
  )
}

export default ProductForm
