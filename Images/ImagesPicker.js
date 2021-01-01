import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
} from "reactstrap";
import style from "./ImagesPicker.css";
import _ from "lodash";
import Configuration from "../../utils/configuration";
import { connect } from "react-redux";
import { loadPickedImages } from "../../reducers/Partial";
import ModalImagesButton from "./ModalImagesButton";
import ListImage from "./ListImages";
import { Fragment } from "react";
class ImagesPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onSubmitHandler = () => {
        if (this.state.previewImage !== undefined)
            this.props.loadPickedImages([
                ...this.props.images,
                this.state.previewImage
            ]);
    };

    render() {
        let imageThumbnail = this.props.images.find(image => {
            if (image) return image.isFeatured
            else return false
        })
        
        imageThumbnail = imageThumbnail ? Configuration.image_url + imageThumbnail.path : null
        return (
            <Fragment>
                <Card className="main-card mb-2">
                    <CardHeader className="card-header-tab">
                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            Ảnh đại diệnnn
                        </div>
                        <div className="btn-actions-pane-right mr-3">
                            <ModalImagesButton pickThumbnail/>
                        </div>
                    </CardHeader>
                    <CardBody
                    >
                        {
                            imageThumbnail ? <img src={imageThumbnail} width="100%"/> : <p>Không có ảnh được chọn</p>
                        }
                    </CardBody>
                </Card>
                <Card className="main-card mb-3">
                    <CardHeader className="card-header-tab">
                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            Ảnhhh
                        </div>
                        <div className="btn-actions-pane-right mr-3">
                            <ModalImagesButton />
                        </div>
                    </CardHeader>
                    <CardBody
                        style={{
                            overflowY: "scroll",
                            maxHeight: "400px"
                        }}
                    >
                        <ListImage />
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.Partial.images,
        imagesHelpDesk: state.Partial.imagesHelpDesk
    };
}

const mapDispatchToProps = {
    loadPickedImages
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPicker);
