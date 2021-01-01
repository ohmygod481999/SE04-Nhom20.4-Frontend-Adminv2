import {
  AvField,
  AvForm,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation'
import axios from 'axios'
import React, { createRef } from 'react'
import BlockUi from 'react-block-ui'
import Loader from 'react-loaders'
import { connect } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import CategoriesPicker from '../../Layout/Categories/CategoriesPicker'
import FormCkEditorEditor from '../../Layout/Editor/CkEditor'
import ModalImagesButton from '../../Layout/Images/ModalImagesButton'
import {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
  updateFiles,
  updateUsers,
} from '../../reducers/Partial'
import Common from '../../utils/common'
import Configuration from '../../utils/configuration'
import { getData } from '../../utils/data'
import Validation from '../../utils/validation'
import AuthorPartial from '../CommonComponent/AuthorPartial'
import FilesPartial from '../CommonComponent/FilesPartial'
import Header from '../CommonComponent/Header'
import ImagePartial from '../CommonComponent/ImagePartial/ImagePartial'
import VideosPartial from '../CommonComponent/VideosPartial'
// import CkEditor5 from "../CommonComponent/CkEditor5";

class ArticleFormCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {
        name: '',
        subDescription: '',
        description: '',
        friendlyUrl: '',
      },
      optionsCategories: [],
      modalInfo: {
        show: false,
        message: '',
        type: 'error',
      },
      isSending: false,
    }

    this.CkEditor5ref = createRef()

    props.loadPickedCategories([])
    props.loadPickedImages([])
    props.loadPickedThumbnailImages([])
    props.updateFiles([])
    props.updateUsers([])
  }

  componentDidMount() {
    if (this.props.match.params.id != undefined)
      getData
        .getArticle(this.props.match.params.id, {
          languageId: Common.getParameterByName('languageId'),
        })
        .then((response) => {
          this.props.loadPickedCategories(
            response.article.categories.map((val) => ({
              label: val.name,
              value: val.id,
            }))
          )
          this.props.loadPickedImages(
            response.article.images
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
            response.article.images
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
          this.props.updateUsers(
            response.article.authors.map((val) => ({
              value: val.id,
              label: val.name,
            }))
          )

          const article = {
            name: response.article.name,
            subDescription: response.article.subDescription,
            choosedCategories: response.article.categories.map((val) => val.id), // Aray object {id: "asdasd",name: "tieu de"}
            images: response.article.images,
            description: response.article.description,
            friendlyUrl: response.article.friendlyUrl,
            metaName: response.article.metaName,
            metaDescription: response.article.metaDescription,
            metaImage: response.article.metaImage,
            metaKeyword: response.article.metaKeyword,
          }

          // this.CkEditor5ref.current.setData(
          //     response.article.description
          // );
          this.setState({
            article: article,
          })

          // If BOOK
          if (
            this.props.type.type === Configuration.articleType.BOOK.type ||
            this.props.type.type === Configuration.articleType.VIDEO.type
          ) {
            this.props.updateFiles(response.article.files)
          }
        })
    else {
      this.props.loadPickedCategories([])
      this.props.loadPickedImages([])
    }
  }

  onChangeCkEditorHandler = (ckEditorContent) => {
    this.setState({
      article: {
        ...this.state.article,
        description: ckEditorContent + '',
      },
    })
  }

  submitFormHandler = (event, value) => {
    // event.preventDefault();

    this.setState({
      isSending: true,
    })

    event.preventDefault()
    // const formData = new FormData(event.target)

    let relationCategories = []
    this.props.pickedCategories.forEach(function (val, i) {
      relationCategories.push({
        Id: val.value,
        IsFeatured: true,
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

    let relationUsers = []
    this.props.users.forEach(function (val, i) {
      if (!val) return
      relationUsers.push({
        Id: val.value,
        IsFeatured: true,
        DisplayOrder: i,
      })
    })

    const body = {
      Id:
        this.props.match.params.id !== undefined
          ? this.props.match.params.id
          : Common.guid(),
      MerchantId: Common.getCookie('merchantId'),
      Name: value.name, // formData.get('name'),
      SubDescription: value.subDescription, // formData.get('subDescription'),
      Description: this.state.article.description,
      // Description: this.CkEditor5ref.current.getData(),
      FriendlyUrl: value.friendlyUrl
        ? value.friendlyUrl
        : Common.rewriteUrl(value.name), // formData.get('metaName'),
      MetaName: value.metaName ? value.metaName : value.name, // formData.get('metaName'),
      MetaKeyword: value.metaKeyword, // formData.get('metaKeyword'),
      MetaDescription: value.metaDescription, // formData.get('metaDescription'),
      MetaImage: value.metaImage,
      Categories: relationCategories,
      Images: relationImages,
      Authors: relationUsers,
      LanguageId: this.props.match.params.id
        ? Common.getParameterByName('languageId')
        : Common.getCookie(Configuration.tokenLanguage),
      CreatedDate: Common.formatDateTime(new Date()),
      CreatedBy: Common.getCookie('userId'),
      CommandInformation: navigator.userAgent,
    }

    if (this.props.type.type === Configuration.articleType.BOOK.type) {
      let relationBooks = []
      this.props.listFile.forEach(function (val, i) {
        if (!val) return
        relationBooks.push({
          Id: val.id,
          IsFeatured: true,
          DisplayOrder: i,
        })
      })
      body.Books = relationBooks
    }

    if (this.props.type.type === Configuration.articleType.VIDEO.type) {
      let relationVideos = []
      this.props.listFile.forEach(function (val, i) {
        if (!val) return
        relationVideos.push({
          Id: val.id,
          IsFeatured: true,
          DisplayOrder: i,
        })
      })
      body.Videos = relationVideos
    }

    const dataSend = {
      CommandName:
        this.props.match.params.id !== undefined
          ? this.props.type.commandUpdate
          : this.props.type.commandCreate,
      Domain: 'Article',
      Content: JSON.stringify(body),
      TimeOutSecond: 7,
    }

    let redirectPath
    switch (this.props.type.type) {
      case 0:
        redirectPath = '/articles/list'
        break
      case 5:
        redirectPath = '/books/list'
        break
      case Configuration.articleType.VIDEO.type:
        redirectPath = '/video/list'
        break
      case Configuration.articleType.SLIDE.type:
        redirectPath = '/slide/list'
        break
      default:
        redirectPath = '/articles/list'
        break
    }

    const api_url = Configuration.url_api + '/Command/SendSync'
    axios
      .post(api_url, dataSend)
      .then((response) => {
        if (response.data.Success)
          Swal.fire({
            title: 'Thành công',
            text: response.data.Message,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Đến trang danh sách',
            cancelButtonText: 'Ở lại',
          }).then(({ value }) => {
            if (value) this.props.history.push(redirectPath)
          })
        else
          Swal.fire({
            title: 'Thất bại',
            text: response.data.Message,
            icon: 'error',
          })
      })
      .catch((err) => {
        Swal.fire({
          title: 'Thất bại',
          text: err + '',
          icon: 'error',
        })
      })
      .finally(() => {
        this.setState({
          isSending: false,
        })
      })
  }

  componentWillUnmount() {
    loadPickedCategories([])
    loadPickedImages([])
  }

  render() {
    return (
      <BlockUi
        tag="div"
        blocking={this.state.isSending}
        className="block-overlay-dark"
        loader={<Loader color="#ffffff" active />}
      >
        <Header
          title={this.props.type.name}
          description="Articles"
          iconClassName="pe-7s-news-paper"
        />
        <Row>
          <Col md="9">
            <Card className="main-card mb-3">
              <CardHeader>
                {this.props.match.params.id ? 'Cập nhật' : 'Tạo mới'}
              </CardHeader>
              <CardBody>
                <AvForm onValidSubmit={this.submitFormHandler}>
                  <Row>
                    <Col md="6">
                      <AvGroup>
                        <Label for="name">
                          Tiêu đề{' '}
                          <label style={{ color: 'red' }} className="mb-0">
                            *
                          </label>
                        </Label>
                        <AvField
                          className="form-control"
                          name="name"
                          id="name"
                          type="text"
                          onBlur={() =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                friendlyUrl: Common.rewriteUrl(
                                  this.state.article.name
                                ),
                              },
                            })
                          }
                          value={this.state.article.name}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                name: event.target.value,
                              },
                            })
                          }
                          validate={Validation.notEmptyAndMax(4000)}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="friendlyUrl">
                          Link thân thiện{' '}
                          <label style={{ color: 'red' }} className="mb-0">
                            *
                          </label>
                        </Label>
                        <AvField
                          className="form-control"
                          name="friendlyUrl"
                          id="friendlyUrl"
                          type="text"
                          value={this.state.article.friendlyUrl}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                friendlyUrl: event.target.value,
                              },
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
                        <Label for="metaName">Meta tên</Label>
                        <AvField
                          className="form-control"
                          name="metaName"
                          id="metaName"
                          type="text"
                          value={this.state.article.metaName}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                metaName: event.target.value,
                              },
                            })
                          }
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="metaDescription">Meta mô tả</Label>
                        <AvField
                          className="form-control"
                          name="metaDescription"
                          id="metaDescription"
                          type="text"
                          value={this.state.article.metaDescription}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                metaDescription: event.target.value,
                              },
                            })
                          }
                        />
                      </AvGroup>
                    </Col>
                    <Col md="6">
                      {/* Trích dẫn */}
                      <AvGroup>
                        <Label for="subDescription">
                          Trích dẫn{' '}
                          <label style={{ color: 'red' }} className="mb-0">
                            *
                          </label>
                        </Label>
                        <AvField
                          className="form-control"
                          name="subDescription"
                          id="subDescription"
                          type="textarea"
                          type="text"
                          value={this.state.article.subDescription}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                subDescription: event.target.value,
                              },
                            })
                          }
                          validate={Validation.notEmptyAndMax(4000)}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="metaKeyword">Meta từ khóa</Label>
                        <AvField
                          className="form-control"
                          name="metaKeyword"
                          id="metaKeyword"
                          type="text"
                          value={this.state.article.metaKeyword}
                          onChange={(event) =>
                            this.setState({
                              article: {
                                ...this.state.article,
                                metaKeyword: event.target.value,
                              },
                            })
                          }
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="metaImage">Meta ảnh</Label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <AvInput
                            className="form-control"
                            name="metaImage"
                            id="metaImage"
                            type="text"
                            // value={this.state.article.metaImage }
                            value={
                              this.state.article.metaImage !== undefined &&
                              this.props.currentPathImg.path === undefined
                                ? this.state.article.metaImage
                                : this.props.currentPathImg.path == undefined
                                ? ''
                                : Configuration.image_url +
                                  this.props.currentPathImg.path
                            }
                            onChange={(event) =>
                              this.setState({
                                article: {
                                  ...this.state.article,
                                  metaImage: event.target.value,
                                },
                              })
                            }
                            style={{
                              marginRight: '5px',
                            }}
                          />
                          <ModalImagesButton pickLink />
                        </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <FormCkEditorEditor
                    onchange={this.onChangeCkEditorHandler}
                    content={this.state.article.description}
                  />
                  {/* <CkEditor5 ref={this.CkEditor5ref} /> */}

                  <AvGroup>
                    <Button size="lg" className="mt-3" color="primary">
                      Lưu
                    </Button>
                  </AvGroup>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            {this.props.type.type === Configuration.articleType.BOOK.type ? (
              <FilesPartial sendFiles={this.getFiles} />
            ) : null}
            {this.props.type.type === Configuration.articleType.VIDEO.type ? (
              <VideosPartial />
            ) : null}
            <CategoriesPicker
              type={this.props.type.categoryType}
              languageId={
                Common.getParameterByName('languageId')
                  ? Common.getParameterByName('languageId')
                  : Common.getCookie(Configuration.tokenLanguage)
              }
            />
            <AuthorPartial type={Configuration.userType.AUTHOR} />
            {/* <ImagesPicker /> */}
            <ImagePartial thumbnail />
            <ImagePartial />
          </Col>
        </Row>
      </BlockUi>
    )
  }
}

function mapStateToProps(state) {
  return {
    pickedCategories: state.Partial.pickedCategories,
    images: state.Partial.images,
    thumbnailImages: state.Partial.thumbnailImages,
    currentPathImg: state.Partial.currentPathImg,
    listFile: state.Partial.listFile,
    users: state.Partial.users,
  }
}

const mapDispatchToProps = {
  loadPickedCategories,
  loadPickedImages,
  loadPickedThumbnailImages,
  updateFiles,
  updateUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFormCreate)
