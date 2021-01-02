import { AvField, AvForm, AvGroup } from 'availity-reactstrap-validation'
import axios from 'axios'
import React, { createRef } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap'
import CategoriesPicker from '../../../Layout/Categories/CategoriesPicker'
import CustomLoader from '../../../Layout/Loading/CustomLoader'
import {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
} from '../../../reducers/Partial'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import { getData } from '../../../utils/data'
import Validation from '../../../utils/validation'
import CkEditor5 from '../../CommonComponent/CkEditor5'
import ImagePartial from '../../CommonComponent/ImagePartial/ImagePartial'

class ProductFormCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      evoucher: {},
      evouchers: [],
      data: {
        description: '',
      },
      modalInfo: {
        show: false,
        message: '',
        type: 'error',
      },
      isSending: false,
    }

    props.loadPickedCategories([])
    props.loadPickedImages([])
    props.loadPickedThumbnailImages([])

    this.ckEditor5ref = createRef()
  }

  componentDidMount() {
    getData
      .getDataGraphQl(
        `
                {
                    evouchers(param:{limit:100000,offset:0,order:"asc",sort:"asc"
                    ,merchantId:"${Common.getCookie(
                      Configuration.merchantId
                    )}"})
                    {
                      items{
                       name,
                        id,
                        active,
                        availableTo,
                        availableFrom,
                        createdBy,
                        createdDate,
                        merchantId,
                        modifiedBy,
                        modifiedDate,
                        totalCode,
                        totalCodeExported,
                        value,
                      },
                      totalCount,
                      success,
                      message
                    }
                }
        `
      )
      .then((result) => {
        this.setState({
          evouchers: result.evouchers.items,
        })
      })

    if (this.props.match.params.id != undefined)
      // Common.getArticle(this.props.match.params.id)

      getData
        .getDataGraphQl(
          `
      
      {
        product(param:{id: "${this.props.match.params.id}"
        ,merchantId:"${Common.getCookie('merchantId')}", languageId:"${
            Common.getParameterByName('languageId')
            // Configuration.languageVi
          }"})
        {
          id,
          categories {
            id,
            name
          },
          images {
            id,
            path,
            name,
            displayOrder,
            isFeatured
          },
          evoucherId,
          name,
          price,
          sku,
          subDescription,
          description
        }
    }
    
     `
        )
        .then((response) => {
          this.props.loadPickedCategories(
            response.product.categories.map((val) => ({
              label: val.name,
              value: val.id,
            }))
          )
          this.props.loadPickedImages(
            response.product.images
              .map((val) => ({
                id: val.id,
                path: val.path,
                name: val.name,
                displayOrder: val.displayOrder,
                isFeatured: val.isFeatured,
              }))
              .filter((val) => !val.isFeatured)
              .sort((a, b) => {
                return a.displayOrder - b.displayOrder
              })
          )
          this.props.loadPickedThumbnailImages(
            response.product.images
              .map((val) => ({
                id: val.id,
                path: val.path,
                name: val.name,
                displayOrder: val.displayOrder,
                isFeatured: val.isFeatured,
              }))
              .filter((val) => val.isFeatured)
              .sort((a, b) => {
                return a.displayOrder - b.displayOrder
              })
          )

          const product = {
            name: response.product.name,
            subDescription: response.product.subDescription,
            description: response.product.description,
            price: response.product.price,
            sku: response.product.sku,
            evoucherId: response.product.evoucherId,
          }
          this.ckEditor5ref.current.setData(response.product.description)
          this.setState({
            data: product,
          })
        })
    else {
      this.props.loadPickedCategories([])
      this.props.loadPickedImages([])
    }
  }

  handleValidSubmit = (event, value) => {
    console.log(this.state.evoucher)
    this.setState({
      isSending: true,
    })
    let relationCategories = []
    this.props.pickedCategories.forEach(function (val, i) {
      relationCategories.push({
        Id: val.value,
        IsFeatured: false,
        DisplayOrder: i,
      })
    })

    let relationImages = []
    this.props.thumbnailImages.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: true,
        DisplayOrder: i,
      })
    })

    this.props.images.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: false,
        DisplayOrder: i,
      })
    })

    const body = {
      Id:
        this.props.match.params.id !== undefined
          ? this.props.match.params.id
          : Common.guid(),
      MerchantId: Common.getCookie('merchantId'),
      Name: value.name,
      SubDescription: value.subDescription,
      Description: this.ckEditor5ref.current.getData(),
      Sku: value.sku,
      Price: value.price,
      Categories: relationCategories,
      Images: relationImages,
      CommandInformation: window.location.href,
      LanguageId: this.props.match.params.id
        ? Common.getParameterByName('languageId')
        : Common.getCookie(Configuration.tokenLanguage),
      CreatedDate: Common.formatDateTime(new Date()),
      CreatedBy: Common.getCookie('userId'),
    }

    const dataSend = {
      CommandName:
        this.props.match.params.id !== undefined
          ? 'UpdateInformationProductVersion01'
          : 'CreateProductVersion01',
      Domain: 'Product',
      Content: JSON.stringify(body),
      TimeOutSecond: 7,
    }

    const api_url = Configuration.url_api + '/Command/SendSync'
    axios
      .post(api_url, dataSend)
      .then((response) => {
        if (response.data.Success)
          this.setState({
            modalInfo: {
              show: true,
              message: 'Thành công',
              responesMessage: response.data.Message,
              type: 'success',
            },
          })
        else
          this.setState({
            modalInfo: {
              show: true,
              message: 'Thất bại',
              responesMessage: response.data.Message,
              type: 'error',
            },
          })
      })
      .catch((err) => {
        this.setState({
          modalInfo: {
            show: true,
            message: 'Thất bại',
            responesMessage: err + '',
            type: 'error',
          },
        })
      })
      .finally(() => {
        this.setState({
          isSending: false,
        })
      })
  }

  onChangeCkEditorHandler = (ckEditorContent) => {
    this.setState({
      data: {
        ...this.state.data,
        description: ckEditorContent + '',
      },
    })
    // this.setState({ description: ckEditorContent + "" });
  }

  render() {
    console.log(`State From: ${this.state.modalInfo.show}`)
    let value = this.state.value
    let people = this.state.people
    return (
      <React.Fragment>
        <CustomLoader
          isSending={this.state.isSending}
          modalInfo={this.state.modalInfo}
          redirectPath="#/product/list"
        >
          <Row>
            <Col md={9}>
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Tạo mới</CardTitle>
                  <AvForm onValidSubmit={this.handleValidSubmit}>
                    <Row>
                      <Col md="6">
                        {/* With AvField */}

                        <AvField
                          name="sku"
                          label="Mã sản phẩm"
                          placeholder="Mã tự sinh nếu bỏ trống"
                          type="text"
                          value={this.state.data.sku}
                          // validate={Validation.force}
                        />

                        <AvGroup>
                          <AvField
                            name="name"
                            label="Tên sản phẩm"
                            type="text"
                            validate={Validation.notEmptyAndMax(256)}
                            value={this.state.data.name}
                          />
                        </AvGroup>
                        {/* With AvGroup AvInput and AvFeedback to build your own */}
                        <AvGroup>
                          <AvField
                            name="price"
                            label="Giá (vnđ)"
                            type="number"
                            validate={Validation.digital}
                            value={this.state.data.price}
                          />
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Label for="subDescription">Trích dẫn</Label>
                          <AvField
                            name="subDescription"
                            id="subDescription"
                            type="textarea"
                            value={this.state.data.subDescription}
                          />
                        </AvGroup>
                      </Col>
                    </Row>
                    <Label>Miểu tả</Label>
                    <CkEditor5 ref={this.ckEditor5ref} />
                    <FormGroup>
                      <Button size="lg" className="mt-3" color="primary">
                        Lưu
                      </Button>
                    </FormGroup>
                  </AvForm>
                </CardBody>
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
            </Col>
          </Row>
        </CustomLoader>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    pickedCategories: state.Partial.pickedCategories,
    images: state.Partial.images,
    thumbnailImages: state.Partial.thumbnailImages,
    currentPathImg: state.Partial.currentPathImg,
  }
}

const mapDispatchToProps = {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormCreate)
