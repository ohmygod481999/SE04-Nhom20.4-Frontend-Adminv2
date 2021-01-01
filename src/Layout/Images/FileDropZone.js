import React, { Fragment } from "react";

import {
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    Card,
    CardBody,
    CardTitle
} from "reactstrap";
import axios from "axios";

import Dropzone from "react-dropzone";
import PreviewImagesUpload from "./PreviewImagesUpload";
import Configuration from "../../utils/configuration";
import Common from "../../utils/common";
import $ from "jquery";
import CustomLoader from "../Loading/CustomLoader";
import { connect } from "react-redux";
import {
    loadPickedImages,
    getCurrentPathImg,
    updateAllImages
} from "../../reducers/Partial";
import { toast } from "react-toastify";
import { AppContext } from "../AppMain/index";

class FileDropZone extends React.Component {
    constructor() {
        super();
        this.state = {
            files: [],
            previewImages: [],
            uploadedImages: [],
            modalInfo: {
                show: false,
                message: "",
                type: "error"
            },
            isSending: false
        };
    }

    static contextType = AppContext;

    static getDerivedStateFromProps(props, state) {
        if (props.images != undefined) {
            return {
                previewImages: props.images.map(image => ({
                    name: image.name,
                    src: Configuration.image_url + image.path
                }))
            };
        }
        return {};
    }

    onDrop(files) {
        files.forEach(file => {
            if (file.size > Configuration.MAX_FILE_SIZE)
                return toast["error"](
                    "Yêu cầu file có dung lượng không lớn hơn là 1 MB"
                );
        });

        this.setState({
            files: {
                ...this.state.files,
                files
            }
        });
        this.setState({
            uploadedImages: [
                ...this.state.uploadedImages, ...files
            ]
        });

        files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener(
                "load",
                () => {
                    this.setState({
                        previewImages: [
                            ...this.state.previewImages,
                            {
                                name: file.name,
                                path: reader.result
                            }
                        ]
                    });
                },
                false
            );
        });
        console.log(this.state.files);
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    submitImages = () => {
        // var imagefiles = $("#file").get(0).files;
        if (this.state.uploadedImages.length < 1)
            return toast["error"]("Vui lòng tải lên ít nhất 1 ảnh");
        this.setState({
            isSending: true
        });
        const formData = new FormData();
        formData.append("token", Common.getCookie(Configuration.userCookie));
        // formData.append("UploadedImage", imagefiles.files)

        // imagefiles.forEach(image => {
        //     formData.append("UploadedImage", image)
        // });

        // for (let f = 0; f < imagefiles.length; f++) {
        //     formData.append("UploadedImage", imagefiles[f]);
        // }
        this.state.uploadedImages.forEach(img =>
            formData.append("UploadedImage", img)
        );
        // let nameImage = imagefiles[0].name;
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "https://apicommand.izzi.asia/Image/UploadFile",
            contentType: false,
            processData: false,
            data: formData
        });

        ajaxRequest.done((response, textStatus) => {
            //Data: response.Data [{Id:"234234", Path:"/kjahs/asdasd"}]
            if (response.Success) {
                this.props.toggleTab("1");
                this.setState({
                    modalInfo: {
                        show: true,
                        message: "Thành công",
                        responesMessage: response.Message,
                        type: "success"
                    }
                });
                // this.context.alert['success']("Thành công")
                if (response.Data.length > 0) {
                    const images = response.Data.map(image => ({
                        id: image.Id,
                        name: image.Name,
                        path: image.Path,
                        active: false
                    }));
                    let tempArray = [...this.props.allImages];
                    tempArray.unshift(...images);
                    this.props.updateAllImages(tempArray);
                }
            } else
                this.setState({
                    modalInfo: {
                        show: true,
                        message: "Thất bại",
                        responesMessage: response.Data.Message,
                        type: "error"
                    }
                });
                // this.context.alert['error']("Thất bại")

            this.setState({
                isSending: false,
                previewImages: [],
                uploadedImages: []
            });
        });

        // axios.post('http://apicommand.izzi.asia/Image/UploadFile', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        //     .then(data => console.log(data))
    };

    render() {
        return (
            <Fragment>
                <Row>
                    <Col md="6">
                        <CustomLoader
                            isSending={this.state.isSending}
                            modalInfo={this.state.modalInfo}
                        >
                            <div className="dropzone-wrapper dropzone-wrapper-lg">
                                <Dropzone
                                    onDrop={this.onDrop.bind(this)}
                                    onDropRejected={(errFiles) => {
                                        toast["error"]("Files không phù hợp:" + errFiles.map(errFile => errFile.name).join(', '))
                                    }}
                                    maxSize={
                                        Configuration.MAX_FILE_SIZE
                                    }
                                    onFileDialogCancel={this.onCancel.bind(
                                        this
                                    )}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input
                                                id="file"
                                                {...getInputProps()}
                                            />
                                            <div className="dropzone-content">
                                                <p>
                                                    Try dropping some files
                                                    here, or click to select
                                                    files to upload.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </CustomLoader>
                    </Col>
                    <Col md="6">
                        {/* <b className="mb-2 d-block">Dropped Files</b> */}

                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Dropped Files</CardTitle>
                                <PreviewImagesUpload
                                    previewImages={this.state.previewImages}
                                />
                            </CardBody>
                        </Card>

                        {/* <ListGroup>
                            {this.state.previewImages.map((previewImage, index) => {
                                return (
                                    <img key={index} width={300} src={previewImage}/>
                                )
                            })}
                        </ListGroup> */}
                    </Col>
                </Row>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <Button onClick={this.submitImages} color="success">
                        Tải lên
                    </Button>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        allImages: state.Partial.allImages
    };
}

const mapDispatchToProps = {
    updateAllImages
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDropZone);
