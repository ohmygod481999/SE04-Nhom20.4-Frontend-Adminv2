import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvField, AvForm, AvGroup } from "availity-reactstrap-validation";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,




  Label, UncontrolledTooltip
} from "reactstrap";
import CkEditor from "../../Layout/Editor/CkEditor";
import { loadPickedCategories, loadPickedImages, loadPickedImagesHelpDesk } from '../../reducers/Partial';
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";
import { getData, postData } from "../../utils/data";
import ImagesPicker from "../Images/ImagesPicker";
import CustomLoader from "../Loading/CustomLoader";






class ThemeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            categories: [],
            data: {
                category: "",
                description: ""
            },
            showing: false,
            modalInfo: {
                show: false,
                message: "",
                type: "error"
            },
            isSending: false
        };
    }

    submitHandler = (event, value) => {
        this.setState({
            isSending: true
        });

        const subDescription = JSON.stringify({
            userAgent: navigator.userAgent,
            href: window.location.href
        });

        if (this.state.categories.length < 1) return toast["error"]("Không có phân loại lỗi được chọn")

        let relationCategories = [{
            Id: value.category === "" ? this.state.categories[0].id : value.category,
            IsFeatured: false,
            DisplayOrder: 0
        }];

        let relationImages = [];
        this.props.imagesHelpDesk.forEach(function (val, i) {
            relationImages.push({
                Id: val.id,
                IsFeatured: val.isFeatured,
                DisplayOrder: val.displayOrder
            })
        })

        const body = {
            Id: Common.guid(),
            MerchantId: Configuration.helpDeskMerchantId,
            Name: value.name,
            SubDescription: subDescription,
            Description: this.state.data.description,
            MetaName: "",
            MetaKeyword: "",
            MetaDescription: "",
            MetaImage: "",
            Categories: relationCategories,
            Images: relationImages,
            LanguageId: Common.getCookie(Configuration.tokenLanguage),
            CreatedDate: Common.formatDateTime(new Date()),
            CreatedBy: Common.getCookie("userId"),
            CommandInformation: navigator.userAgent
        };

        postData
            .sendCommand("Article", "CreateArticleVersion01", body)
            .then(response => {
                if (response.data.Success)
                    this.setState({
                        modalInfo: {
                            show: true,
                            message: "Thành công",
                            responesMessage: response.data.Message,
                            type: "success"
                        }
                    });
                else
                    this.setState({
                        modalInfo: {
                            show: true,
                            message: "Thất bại",
                            responesMessage: response.data.Message,
                            type: "error"
                        }
                    });
            })
            .catch(err => {
                this.setState({
                    modalInfo: {
                        show: true,
                        message: "Thất bại",
                        responesMessage: err + "",
                        type: "error"
                    }
                });
            })
            .finally(() => {
                this.setState({
                    isSending: false,
                    data: {
                        description: ""
                    }
                });
                this.form && this.form.reset();
                this.props.loadPickedImagesHelpDesk([])
            });
    };

    onChangeCkEditorHandler = ckEditorContent => {
        this.setState({
            data: {
                ...this.state.data,
                description: ckEditorContent + ""
            }
        });
    };

    componentDidMount() {
        getData
            .getCategories({
                type: 2,
                merchantId: Configuration.helpDeskMerchantId
            })
            .then(response =>
                this.setState({
                    categories: response.categories.items
                })
            );
    }

    render() {
        const { showing, categories } = this.state;

        return (
            <div
                className={
                    "ui-theme-settings " + (showing ? "settings-open" : "")
                }
            >
                <Button
                    className="btn-open-options"
                    id="TooltipDemo"
                    color="warning"
                    onClick={() => this.setState({ showing: !showing })}
                >
                    <FontAwesomeIcon
                        icon={faCog}
                        spin
                        color="#573a04"
                        fixedWidth={false}
                        size="2x"
                    />
                </Button>
                <UncontrolledTooltip placement="left" target={"TooltipDemo"}>
                    Gửi thông báo lỗi tới nhà phát triển
                </UncontrolledTooltip>
                <div className="theme-settings__inner">
                    <PerfectScrollbar>
                        <div className="theme-settings__options-wrapper">
                            <h3 className="themeoptions-heading">Help Desk</h3>
                            <div className="p-3">
                                <CustomLoader
                                    isSending={this.state.isSending}
                                    modalInfo={this.state.modalInfo}
                                    redirectPath="#/articles/list"
                                >
                                    <AvForm
                                        onValidSubmit={this.submitHandler}
                                        ref={c => (this.form = c)}
                                    >
                                        <AvGroup>
                                            <Label>Phân loại lỗi</Label>
                                            <AvField
                                                type="select"
                                                name="category"
                                                value={this.state.data.category}
                                            >
                                                {categories.map((val, i) => {
                                                    return (
                                                        <option
                                                            key={i}
                                                            value={val.id}
                                                        >
                                                            {val.name}
                                                        </option>
                                                    );
                                                })}
                                            </AvField>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label>Tiêu đề</Label>
                                            <AvField type="text" name="name" />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label>Mô tả</Label>
                                            <CkEditor
                                                onchange={
                                                    this.onChangeCkEditorHandler
                                                }
                                                content={
                                                    this.state.data.description
                                                }
                                            />
                                        </AvGroup>
                                        <ImagesPicker helpDesk={true} />
                                        <Button color="primary" type="submit">
                                            Gửi
                                        </Button>
                                    </AvForm>
                                </CustomLoader>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pickedCategories: state.Partial.pickedCategories,
        images: state.Partial.images,
        currentPathImg: state.Partial.currentPathImg,
        imagesHelpDesk: state.Partial.imagesHelpDesk
    };
}

const mapDispatchToProps = {
    loadPickedCategories,
    loadPickedImages,
    loadPickedImagesHelpDesk
}


export default connect(mapStateToProps, mapDispatchToProps)(ThemeOptions);