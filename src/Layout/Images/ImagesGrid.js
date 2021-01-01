import React from "react";
import JwPagination from "jw-react-pagination";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import {
    loadPickedImages,
    getCurrentPathImg,
    updateAllLibraryImages,
    loadPickedImagesHelpDesk
} from "../../reducers/Partial";
import Configuration from "../../utils/configuration";
import Select from "react-select";
import { getData } from "../../utils/data";

class ImageGrid extends React.Component {
    state = {
        pageOfImages: [],
        optionsCategories: [],
        choosedCategories: []
    };

    componentDidMount() {
        this.loadCategories();
    }

    onChangePage = pageOfImages => {
        // update local state with new page of items
        this.setState({ pageOfImages });
    };

    loadImages = options => {
        getData.getImages(options).then(response => {
            let allImages = response.images.items.map(val => ({
                id: val.id,
                path: val.path,
                name: val.name,
                active: false
            }));
            this.props.updateAllLibraryImages(allImages);
        });
    };

    loadCategories = () => {
        getData
            .getCategories({
                type: Configuration.categoryTypes.IMAGE,
                merchantId: Configuration.libraryMerchantId
            })
            .then(response => {
                this.setState({
                    optionsCategories: response.categories.items.map(
                        category => {
                            return {
                                value: category.id,
                                label: category.name
                            };
                        }
                    )
                });
            });
    };

    onClickImage = image => {
        this.props.onClickImage(image);
    };

    onFilterSubmit = () => {
        this.loadImages({
            categoryIds: this.state.choosedCategories,
            merchantId: Configuration.libraryMerchantId
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

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md="12 mb-3">
                        <div className="d-flex">
                            <div
                                style={{
                                    minWidth: "60%"
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
                    <Col>
                        <JwPagination
                            pageSize={15}
                            disableDefaultStyles={true}
                            items={this.props.allLibraryImages}
                            onChangePage={this.onChangePage}
                        />
                    </Col>
                </Row>

                <Row>
                    {this.state.pageOfImages.map((image, index) => {
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
                                        image.path})`
                                }}
                                onClick={() => this.onClickImage(image)}
                            >
                                {/* <div > */}
                                {/* <img className="image-gallery"  src={image.path}  /> */}
                                <a href="javascript:;" title={image.name}>
                                    <span className="image-title">
                                        {image.name.length > 10
                                            ? image.name.substring(0, 10) +
                                              "..."
                                            : image.name}
                                    </span>
                                </a>
                                {/* </div> */}
                            </Col>
                        );
                    })}
                </Row>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.Partial.images,
        currentPathImg: state.Partial.currentPathImg,
        allImages: state.Partial.allImages,
        allLibraryImages: state.Partial.allLibraryImages,
        imagesHelpDesk: state.Partial.imagesHelpDesk
    };
}

const mapDispatchToProps = {
    loadPickedImages,
    getCurrentPathImg,
    updateAllLibraryImages,
    loadPickedImagesHelpDesk
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);
