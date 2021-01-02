import { AvField, AvForm, AvGroup } from 'availity-reactstrap-validation'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import BlockUi from 'react-block-ui'
import { Loader } from 'react-loaders'
import { connect } from 'react-redux'
import { Button, Card, CardBody, CardTitle, Col, Label, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
} from '../../reducers/Partial'
import Common from '../../utils/common'
import Configuration from '../../utils/configuration'
import { getData, postData } from '../../utils/data'
import Validation from '../../utils/validation'
import CkEditor5 from '../CommonComponent/CkEditor5'
import Header from '../CommonComponent/Header'
import ImagePartial from '../CommonComponent/ImagePartial/ImagePartial'

function CategoryForm(props) {
  const ckEditorRef = useRef()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({
    name: '',
    parentId: Common.GUID_EMPTY,
    displayOrder: 0,
    description: '',
    subDescription: '',
  })
  const [isSending, setSending] = useState(false)

  const languageId = Common.getParameterByName('languageId')
    ? Common.getParameterByName('languageId')
    : Common.getCookie(Configuration.tokenLanguage)

  const redirectPath = [
    {
      type: 2,
      redirectPath: '#/Categories/list',
    },
    {
      type: 256,
      redirectPath: '#/navigation/list',
    },
    {
      type: 131072,
      redirectPath: '#/member-categories/list',
    },

    {
      type: 4,
      redirectPath: '#/user-categories/list',
    },
    {
      type: Configuration.categoryTypes.IMAGE,
      redirectPath: '#/image-categories/list',
    },
    {
      type: Configuration.categoryTypes.PRODUCT,
      redirectPath: '#/product-categories/list',
    },
    {
      type: Configuration.categoryTypes.ADDRESS,
      redirectPath: '#/address-categories/list',
    },
    {
      type: Configuration.articleType.BOOK.categoryType,
      redirectPath: '#/books/categories',
    },
    {
      type: Configuration.articleType.SLIDE.categoryType,
      redirectPath: '#/slide/categories',
    },
    {
      type: Configuration.categoryTypes.COURSE,
      redirectPath: '#/course/categories',
    },
    {
      type: Configuration.categoryTypes.THEME_WEB,
      redirectPath: '#/theme-web/categories/list',
    },
    {
      type: Configuration.categoryTypes.THEME_WEB_SECTION,
      redirectPath: '#/theme-web/section/categories/list',
    },
    {
      type: Configuration.categoryTypes.THEME_WEB_TEMPLATE,
      redirectPath: '#/theme-template/categories/list',
    },
  ]

  const getRedirectPath = (type) => {
    return redirectPath.find((val) => val.type == type).redirectPath
  }

  useEffect(() => {
    props.loadPickedCategories([])
    props.loadPickedImages([])

    getData.getCategories({ type: props.type }).then((data) => {
      const categories = data.categories.items.map((val) => ({
        id: val.id,
        name: val.name,
      }))
      if (props.match.params.id) {
        setCategories(
          categories.filter((val) => val.id !== props.match.params.id)
        )
      } else {
        setCategories(categories)
      }
    })

    if (props.match.params.id != undefined) {
      getData
        .getDataGraphQl(
          `
            {
                category(param:{id: "${
                  props.match.params.id
                }",languageId:"${languageId}", merchantId:"${Common.getCookie(
            'merchantId'
          )}"}){
                  name,
                  parentId,
                  displayOrder,
                  friendlyUrl,
                  images {
                      id,
                      path,
                      name,
                      displayOrder,
                      isFeatured
                  }
                  description,
                  subDescription             
                }
              }
            `
        )
        .then((response) => {
          setCategory({ ...response.category })

          ckEditorRef.current.setData(response.category.description)

          props.loadPickedImages(
            response.category.images
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
          props.loadPickedThumbnailImages(
            response.category.images
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
        })
      // getData.getDataById('category', props.match.params.id, Object.keys(category).toString()).then(response => {
      //     console.log(response.category)

      // })
    }
  }, [])

  const submitHander = (event, value) => {
    setSending(true)

    let relationImages = []
    props.thumbnailImages.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: true,
        DisplayOrder: i,
      })
    })
    props.images.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: false,
        DisplayOrder: i,
      })
    })

    const body = {
      Id:
        props.match.params.id !== undefined
          ? props.match.params.id
          : Common.guid(),
      Name: value.name, //formData.get('name'),
      ParentId: value.parentId, // formData.get('parentId'),
      DisplayOrder: value.displayOrder, // formData.get('displayOrder'),
      FriendlyUrl: value.friendlyUrl,
      Description: ckEditorRef.current.getData(), // formData.get('description'),
      SubDescription: value.subDescription,
      Type: props.type,
      Images: relationImages,
      LanguageId: languageId,
    }

    if (props.match.params.id === undefined) {
      body.CreatedDate = Common.formatDateTime(new Date())
      body.CreatedBy = Common.getCookie('userId')
    } else {
      body.ModifiedDate = Common.formatDateTime(new Date())
      body.ModifiedBy = Common.getCookie('userId')
    }

    postData
      .sendCategory(body, props.match.params.id !== undefined)
      .then((response) => {
        if (response.data.Success == true) {
          Swal.fire({
            title: 'Thành công',
            text: response.data.Message,
            icon: 'success',
          })
          // this.props.history.push('/theme-web/list-section')
        } else {
          Swal.fire({
            title: 'Thất bại',
            text: response.data.Message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Thất bại',
          text: err,
          icon: 'success',
        })
      })
      .finally(() => setSending(false))
  }

  //Component will unmount
  useEffect(() => {
    return () => {
      loadPickedCategories([])
      loadPickedImages([])
    }
  }, [])

  return (
    <div>
      <Header
        title="Phân loại"
        description="Category"
        iconClassName="pe-7s-ribbon"
      />

      <Row>
        <Col md={9}>
          <Card className="main-card mb-3">
            <BlockUi
              tag="div"
              blocking={isSending}
              className="block-overlay-dark"
              loader={<Loader color="#ffffff" active />}
            >
              <CardBody>
                <CardTitle>Tạo mới</CardTitle>
                <AvForm onValidSubmit={submitHander}>
                  <AvGroup>
                    <Label>
                      Tên <label style={{ color: 'red' }}>*</label>
                    </Label>
                    <AvField
                      type="text"
                      name="name"
                      value={category.name}
                      onBlur={() =>
                        setCategory({
                          ...category,
                          friendlyUrl: Common.rewriteUrl(category.name),
                        })
                      }
                      onChange={(event) =>
                        setCategory({
                          ...category,
                          name: event.target.value,
                        })
                      }
                      validate={Validation.notEmptyAndMax(400)}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label>Phân loại cha</Label>
                    <AvField
                      type="select"
                      name="parentId"
                      value={category.parentId}
                      onChange={(event) =>
                        setCategory({
                          ...category,
                          parentId: event.target.value,
                        })
                      }
                    >
                      <option value="00000000-0000-0000-0000-000000000000">
                        -
                      </option>
                      {categories.map((val) => {
                        return (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                        )
                      })}
                    </AvField>
                  </AvGroup>
                  <AvGroup>
                    <Label>Thứ tự hiển thị</Label>
                    <AvField
                      type="number"
                      name="displayOrder"
                      value={_.get(category, 'displayOrder').toString()}
                      onChange={(event) =>
                        setCategory({
                          ...category,
                          displayOrder: event.target.value,
                        })
                      }
                      validate={Validation.notEmptyAndMax(10)}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label>
                      Link thân thiện <label style={{ color: 'red' }}>*</label>
                    </Label>
                    <AvField
                      type="text"
                      name="friendlyUrl"
                      value={category.friendlyUrl}
                      onChange={(event) =>
                        setCategory({
                          ...category,
                          friendlyUrl: event.target.value,
                        })
                      }
                      validate={{
                        required: {
                          value: true,
                          errorMessage: 'Trường này không được để trống',
                        },
                        pattern: {
                          value: '^[a-zA-Z0-9-]*$',
                          errorMessage: 'Sai cú pháp',
                        },
                      }}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label>Trích dẫn</Label>
                    <AvField
                      type="textarea"
                      name="subDescription"
                      value={category.subDescription}
                      onChange={(event) =>
                        setCategory({
                          ...category,
                          subDescription: event.target.value,
                        })
                      }
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label>Mô tả</Label>
                    <CkEditor5 ref={ckEditorRef} />
                  </AvGroup>
                  <Button color="info">
                    {props.match.params.id ? 'Lưu' : 'Tạo'}
                  </Button>
                </AvForm>
              </CardBody>
            </BlockUi>
          </Card>
        </Col>
        <Col md="3">
          <ImagePartial thumbnail />
          <ImagePartial />
        </Col>
      </Row>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    images: state.Partial.images,
    pickedImages: state.Partial.pickedImages,
    thumbnailImages: state.Partial.thumbnailImages,
  }
}

const mapDispatchToProps = {
  loadPickedImages,
  loadPickedCategories,
  loadPickedThumbnailImages,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)
