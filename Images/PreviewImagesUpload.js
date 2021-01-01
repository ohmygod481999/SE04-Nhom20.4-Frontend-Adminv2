import React, { Fragment, Component } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    Label,
    Input,
    FormGroup
} from "reactstrap";
import Slider from "react-slick";
import Switch from "react-switch";
import { connect } from "react-redux";
import { loadPickedImages } from "../../reducers/Partial";
import _ from "lodash";

import cx from "classnames";

class MultipleItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewImages: [],
            checked: false,
            isToggleOn: true
        };
    }

    handleClick = () => {
        this.setState(function(prevState) {
            return { isToggleOn: !prevState.isToggleOn };
        });
    };

    static getDerivedStateFromProps(props, state) {
        if (props.previewImages != undefined && props.previewImages != [])
            return {
                previewImages: props.previewImages
            };
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            // slidesToShow: 0,
            slidesToScroll: 1
            // adaptiveHeight: true
        };
        const formGroupStyle = {
            margin: "0px 10px 10px 24px"
        };
        const inputStyle = {
            width: "70px",
            marginLeft: "40px"
        };
        return (
            <Fragment>
                <Slider {...settings}>
                    {/* {this.props.images.map((previewImage, index) => { */}
                    {this.state.previewImages.map((previewImage, index) => {
                        return (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="card-header-title font-weight-normal">
                                        {previewImage.name.length > 20
                                            ? previewImage.name.substring(
                                                  1,
                                                  30
                                              ) + "..."
                                            : previewImage.name}
                                        {/* Thứ tự: {previewImage.displayOrder}, Nổi bật: {previewImage.isFeatured ? "YES" : "NO"} */}
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                        <Button
                                            className="btn-icon btn-icon-only"
                                            color="link"
                                            onClick={() => {
                                                this.props.removeImage(index)
                                            }}
                                        >
                                            <i className="lnr-cross btn-icon-wrapper" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <img
                                        style={{ width: "100%" }}
                                        src={previewImage.path}
                                    />
                                </CardBody>
                            </Card>
                        );
                    })}
                </Slider>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.Partial.images
    };
}

const mapDispatchToProps = {
    loadPickedImages
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleItems);
