import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrayMove from "array-move";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  SortableContainer, SortableElement
} from "react-sortable-hoc";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import {
  loadPickedImages,
  loadPickedImagesHelpDesk
} from "../../reducers/Partial";
import Configuration from "../../utils/configuration";



class ListImage extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => {
        let imagesNotThumbnail = []; // this.props.images
        let imageThumbnail;
        this.props.images.forEach(image => {
            if (!image) return
            if (!image.isFeatured) imagesNotThumbnail.push(image);
            else imageThumbnail = { ...image };
        });
        this.props.loadPickedImages([
            imageThumbnail,
            ...arrayMove(imagesNotThumbnail, oldIndex, newIndex).map(
                (image, index) => {
                    return {
                        ...image,
                        displayOrder: index
                    };
                }
            )
        ]);
        // this.setState({
        //     subMenuItems: arrayMove(this.props.images, oldIndex, newIndex)
        // });
        //arrayMove(this.props.images, oldIndex, newIndex)
    };

    render() {
        let imagesNotThumbnail = []; // this.props.images
        this.props.images.forEach(image => {
            if (!image) return
            if (!image.isFeatured) imagesNotThumbnail.push(image);
        });
        return (
            <Fragment>
                <SortableImageList
                    items={imagesNotThumbnail}
                    // items={this.props.images}
                    onSortEnd={this.onSortEnd}
                />
            </Fragment>
        );
    }
}

const SortableImageList = SortableContainer(({ items }) => (
    <ListGroup flush>
        {items.length > 0 ? (
            items.map((value, index) => (
                <SortableImageItem
                    key={`item-${value.id}`}
                    index={index}
                    value={value}
                />
            ))
        ) : (
                <p>Không có ảnh nào được chọn</p>
            )}
    </ListGroup>
));

const SortableImageItem = SortableElement(({ value }) => (
    <ImageItem value={value} />
));

const ImageItem = connect(
    mapStateToProps,
    {
        loadPickedImages,
    }
)(({ value, images, loadPickedImages }) => {
    return (
        <ListGroupItem
            style={{
                padding: "10px 0px",
                zIndex: 6
            }}
        >
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                    {/* <div className="widget-content-left mr-3"> */}
                    <img
                        style={{
                            width: "100%"
                        }}
                        // className="rounded-circle"
                        src={
                            Configuration.image_url +
                            value.path +
                            "?mode=Crop&width=150&height=100"
                        }
                        alt="abc"
                    />
                    {/* </div> */}
                    {/* <div className="widget-content-left">
                        <div className="widget-heading" title={value.name}>
                            {value.name.length > 12
                                ? value.name.substring(0, 12) + "..."
                                : value.name}
                        </div>
                        <div className="widget-subheading">
                            {`Display Order: ${value.displayOrder}`}
                        </div>
                    </div>
                    <div className="widget-content-right"> */}
                    <Button
                        className="border-0 btn-transition"
                        outline
                        style={{
                            position: "absolute",
                            right: 2,
                            top: 2
                        }}
                        color="danger"
                        onClick={() => {
                            loadPickedImages(images.filter(val => val.id != value.id))
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    {/* </div> */}
                </div>
            </div>
        </ListGroupItem>
    );
});

function mapStateToProps(state) {
    return {
        images: state.Partial.images,
        imagesHelpDesk: state.Partial.imagesHelpDesk
    };
}

const mapDispatchToProps = {
    loadPickedImages,
    loadPickedImagesHelpDesk
};

export default connect(mapStateToProps, mapDispatchToProps)(ListImage);
