import React, { Fragment } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import style from "./ImagesPicker.css";
import _ from "lodash";
import ImageDropZone from "./FileDropZone";
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";
import JwPagination from "jw-react-pagination";
import MultipleItems from "./MultipleItems";
import { connect } from "react-redux";
import {
  loadPickedImages,
  getCurrentPathImg,
  updateAllImages,
  loadPickedImagesHelpDesk,
  updateAllLibraryImages
} from "../../reducers/Partial";
import $ from "jquery";
import ImagesGrid from "./ImagesGrid";
import Select from "react-select";
import { getData } from "../../utils/data";
import { toast } from "react-toastify";
import text from "../../utils/text";
export const Action_Modal_Imgae = {
  openModal: function() {
    $("#btnOpenLibraryImg").click();
  }
};
function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}
class ModalImagesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeTab: "1",
      optionsCategories: [],
      choosedCategories: [],
      images: [
        {
          id: 1,
          path:
            "https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg",
          name: "image",
          active: false
        },
        {
          id: 2,
          path:
            "https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg",
          name: "image",
          active: false
        }
      ],
      pageOfImages: [],
      previewImage: null,
      previewImages: [],
      displayOrder: 0,
      isFeatured: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.loadImages();
    this.loadCategories();
  }

  loadImages = options => {
    getData.getImages(options).then(response => {
      let allImages = response.images.items.map(val => ({
        id: val.id,
        path: val.path,
        name: val.name,
        active: false
      }));
      this.props.updateAllImages(allImages);

      this.setState({
        images: response.images.items.map(val => ({
          id: val.id,
          path: val.path,
          name: val.name,
          active: false
        }))
      });
    });

    // Load Image IZZI CMS
    Common.getDataGraphQl(
      `
        {
            images(param:{type:128,keyword:"",limit:500,offset:0,order:"asc",
            sort:"asc",
            languageId:"${Common.getCookie(
              Configuration.tokenLanguage
            )}",merchantId:"${Configuration.libraryMerchantId}"})
            {
                message,
                success,
                totalCount,
                items{
                        id,
                        name,
                        path,
                        displayOrder,
                        isFeatured
                }
            }    
        }
        `
    ).then(response => {
      let allImages = response.images.items.map(val => ({
        id: val.id,
        path: val.path,
        name: val.name,
        active: false
      }));
      this.props.updateAllLibraryImages(allImages);

      // this.setState({
      //     images: response.images.items.map(val => ({
      //         id: val.id,
      //         path: val.path,
      //         name: val.name,
      //         active: false
      //     }))
      // });
    });
  };

  loadCategories = () => {
    getData
      .getCategories({ type: Configuration.categoryTypes.IMAGE })
      .then(response => {
        this.setState({
          optionsCategories: response.categories.items.map(category => {
            return {
              value: category.id,
              label: category.name
            };
          })
        });
      });
  };

  onChangePage = pageOfImages => {
    // update local state with new page of items
    this.setState({ pageOfImages });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onClickImage = image => {
    this.state.images.forEach(i => {
      if (i.id === image.id) {
        i.active = true;
      } else i.active = false;
    });
    this.setState({
      images: this.state.images
    });
    const img = new Image();
    img.src = Configuration.image_url + image.path;
    img.onload = () => {
      this.setState({
        previewImage: {
          ...image,
          dimension: `${img.width}x${img.height}`,
          type: image.name
            .split(".")
            [image.name.split(".").length - 1].toUpperCase()
        }
      });
    };
  };

  onFilterSubmit = () => {
    this.loadImages({
      categoryIds: this.state.choosedCategories
    });
  };

  onCategoriesChangeHandler = choosedCategories => {
    const choosedCategoriesId = choosedCategories.map(
      choosedCategory => choosedCategory.value
    );
    this.setState({
      choosedCategories: choosedCategoriesId
    });
  };

  onSubmitHandler = () => {
    if (!this.state.previewImage) return toast["error"]("Vui lòng chọn ảnh");
    // if (
    //     this.props.images
    //         .map(image => image.id)
    //         .includes(this.state.previewImage.id)
    // )
    //     return toast["error"]("Vui lòng không chọn trùng ảnh");
    if (this.props.pickLink) {
      this.setState({
        modal: !this.state.modal
      });
      return this.props.getCurrentPathImg(this.state.previewImage);
    }
    const loadImagesFunction = this.props.helpDesk
      ? this.props.loadPickedImagesHelpDesk
      : this.props.loadPickedImages;

    const images = this.props.helpDesk
      ? this.props.imagesHelpDesk
      : this.props.images;

    if (this.state.previewImage !== undefined) {
      this.props.getCurrentPathImg(this.state.previewImage);

      let newImage = {
        ...this.state.previewImage,
        isFeatured: this.state.isFeatured,
        displayOrder: this.state.displayOrder
      };
      let newImages = images;
      if (this.props.pickThumbnail) {
        let temp = [...images];
        for (let i = 0; i < temp.length; i++) {
          if (temp[i] && temp[i].isFeatured) {
            temp.splice(i, 1);
            i = i - 1;
          }
        }
        // return console.log(temp);

        newImages = [
          {
            ...this.state.previewImage,
            isFeatured: true, //this.state.isFeatured,
            displayOrder: 0
          },
          ...temp
        ];
      } else {
        newImages = [
          ...images,
          {
            ...this.state.previewImage,
            isFeatured: false, //this.state.isFeatured,
            displayOrder: this.props.images.length - 1
          }
        ];
        // newImage.isFeatured = false
      }

      loadImagesFunction(newImages);
      // loadImagesFunction([
      //     ...images,
      //     newImage
      // ]);
    }
    if (this.props.getImage) this.props.getImage(this.state.previewImage);

    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Fragment>
        <Button
          color="primary"
          onClick={this.toggle}
          id={"btnOpenLibraryImg"}
          style={{
            minWidth: "90px"
          }}
        >
          Chọn ảnh
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-image"
        >
          <ModalHeader toggle={this.toggle} className="modal-header">
            <Nav>
              <NavItem>
                <NavLink
                  href="javascript:void(0);"
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  Thư viện
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="javascript:void(0);"
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                >
                  Upload
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="javascript:void(0);"
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggleTab("3");
                  }}
                >
                  Thư viện IZZI
                </NavLink>
              </NavItem>
            </Nav>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={9}>
                <TabContent
                  activeTab={this.state.activeTab}
                  style={{
                    minHeight: "400px"
                  }}
                >
                  <TabPane tabId="1">
                    {/* <div style={toolStyle}> */}
                    <Row>
                      <Col md="12">
                        <Row>
                          <Col md="6">
                            <div className="d-flex mb-3">
                              <div
                                style={{
                                  width: "100%"
                                }}
                              >
                                <Select
                                  isMulti
                                  name="category"
                                  options={this.state.optionsCategories}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={this.onCategoriesChangeHandler}
                                />
                              </div>
                              <Button
                                color="primary"
                                style={{
                                  height: 38,
                                  marginLeft: 5
                                }}
                                onClick={this.onFilterSubmit}
                              >
                                Filter
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="12">
                        <JwPagination
                          pageSize={15}
                          disableDefaultStyles={true}
                          items={this.props.allImages}
                          onChangePage={this.onChangePage}
                        />
                      </Col>
                    </Row>

                    {/* </div> */}
                    <Row>
                      {this.state.pageOfImages.length > 0 ? (
                        this.state.pageOfImages.map((image, index) => {
                          return (
                            <Col
                              md={3}
                              key={index}
                              className={
                                image.active
                                  ? "image-card-active"
                                  : "image-card"
                              }
                              style={{
                                backgroundImage: `url(${Configuration.image_url +
                                  image.path +
                                  "?mode=crop&width=200&height=300"})`
                              }}
                              onClick={() => this.onClickImage(image)}
                            >
                              {/* <div > */}
                              {/* <img className="image-gallery"  src={image.path}  /> */}
                              <a href="javascript:;" title={image.name}>
                                <span className="image-title">
                                  {image.name.length > 10
                                    ? image.name.substring(0, 10) + "..."
                                    : image.name}
                                </span>
                              </a>
                              {/* </div> */}
                            </Col>
                          );
                        })
                      ) : (
                        <p className="mx-auto">{text("EMPTY")}</p>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <ImageDropZone
                      toggleTab={tabId =>
                        this.setState({
                          activeTab: tabId
                        })
                      }
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <ImagesGrid onClickImage={this.onClickImage} />
                  </TabPane>
                </TabContent>
              </Col>
              <Col md={3} className="preview-block">
                <h2 className="preview-title">Preview</h2>

                <div>
                  {this.state.previewImage == null ? null : (
                    <img
                      alt=""
                      className="preview-image"
                      src={
                        Configuration.image_url +
                        _.get(this, "state.previewImage.path")
                      }
                    />
                  )}
                </div>
                {this.state.previewImage == null ? null : (
                  <Form>
                    <p>Kích thước ảnh : {this.state.previewImage.dimension}</p>
                    <p>Loại ảnh : {this.state.previewImage.type}</p>
                    <FormGroup>
                      <Label>Link </Label>
                      <Input
                        value={
                          Configuration.image_url + this.state.previewImage.path
                        }
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="displayOrder" className="mr-sm-2">
                        Thứ tự hiện thị
                      </Label>
                      <Input
                        type="number"
                        name="displayOrder"
                        id="displayOrder"
                        value={this.state.displayOrder}
                        onChange={event =>
                          this.setState({
                            displayOrder: event.target.value
                          })
                        }
                      />
                    </FormGroup>
                    {/* <FormGroup>
                                            <Label
                                                for="examplePassword22"
                                                className="mr-sm-2"
                                            >
                                                Nổi bật
                                            </Label>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="isFeature"
                                                        value={
                                                            this.state
                                                                .isFeatured
                                                        }
                                                        checked={
                                                            this.state
                                                                .isFeatured
                                                        }
                                                        onChange={() =>
                                                            this.setState({
                                                                isFeatured: true
                                                            })
                                                        }
                                                    />{" "}
                                                    Có
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="isFeature"
                                                        value={
                                                            !this.state
                                                                .isFeatured
                                                        }
                                                        checked={
                                                            !this.state
                                                                .isFeatured
                                                        }
                                                        onChange={() =>
                                                            this.setState({
                                                                isFeatured: false
                                                            })
                                                        }
                                                    />{" "}
                                                    Không
                                                </Label>
                                            </FormGroup>
                                        </FormGroup> */}
                  </Form>
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              Cancel
            </Button>
            <Button
              id="btn-submit"
              color="primary"
              disabled={this.state.previewImage === undefined}
              onClick={() => {
                this.onSubmitHandler();
                setTimeout(() => {
                  isFunction(this.props.callBackSubmit)
                    ? this.props.callBackSubmit()
                    : console.log("");
                }, 100);
                // typeof this.props.tempClick != "undefined" ? this.props.tempClick() : null;
                // typeof this.props.tempClick === "function" ? this.props.tempClick() : null;
              }}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.Partial.images,
    currentPathImg: state.Partial.currentPathImg,
    allImages: state.Partial.allImages,
    imagesHelpDesk: state.Partial.imagesHelpDesk
  };
}

const mapDispatchToProps = {
  loadPickedImages,
  getCurrentPathImg,
  updateAllImages,
  loadPickedImagesHelpDesk,
  updateAllLibraryImages
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImagesButton);
