import { AvField, AvForm, AvGroup } from "availity-reactstrap-validation";
import React from "react";
import { CSVLink } from "react-csv";
import Loader from "react-loader-advanced";
import { Loader as LoaderAnim } from "react-loaders";
import {
  Link
} from "react-router-dom";
import Select from "react-select";
import ReactTable from "react-table-6";
import { toast } from "react-toastify";
import {
  Button,






  Card,
  CardBody,






  CardFooter, Col,









  CustomInput, Label, Row
} from "reactstrap";
import SweetAlert from "sweetalert-react";
import ModalImportCSV from "../../CMS/CommonComponent/ModalImportCSV";
import ModalConfirmDelete from "../../Layout/Modal/ModalComfirmDelete";
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";
import { getData, postData } from "../../utils/data";
import CustomLoader from "../Loading/CustomLoader";

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            optionsCategories: [],
            choosedCategories: [],
            pages: 0,
            totalCount: 0,
            loader: false,
            error: {
                status: false,
                message: "",
            },
            checkAll: false,
            toggle: false,
            modalInfo: {
                show: false,
                message: "",
                type: "error",
            },
            isSending: false,
        };
        this.checkedItems = [];
        this.pageSize = 10;
        this.getCommand = null;
        this.deleteCommand = null;
        this.changeStatusCommand = null;

        switch (props.name) {
            case "notifications":
                this.getCommand = getData.getNotifications;
                this.deleteCommand = (body) =>
                    Common.sendCommand(
                        "Notification",
                        "DeleteNotifications",
                        body
                    );
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Notification",
                        "ChangeStatusPublishNotification",
                        body
                    );
                break;
            case "forms":
                this.getCommand = getData.getForm;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Quiz", "DeleteForms", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Quiz",
                        "ChangeStatusPublishForms",
                        body
                    );
                break;
            case "quizs":
                this.getCommand = getData.getQuiz;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Quiz", "DeleteQuizs", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand("Quiz", "ChangeStatusPublishQuiz", body);
                break;

            case "promotions":
                this.getCommand = getData.getPromotion;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Promotion", "DeletePromotions", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Promotion",
                        "ChangeStatusActivatePromotions",
                        body
                    );
                break;
            case "orders":
                this.getCommand = getData.getOrder;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Order", "DeleteOrders", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Order",
                        "ChangeStatusActivateOrders",
                        body
                    );
                break;
            case "evouchers":
                this.getCommand = getData.getEvoucher;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Evoucher", "DeleteEVouchers", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Evoucher",
                        "ChangeStatusActivateEVouchers",
                        body
                    );
                break;
            // case "promotions":
            //     this.getCommand = getData.getPromotions;
            //     this.deleteCommand = body =>
            //         Common.sendCommand("Promotion", "DeletePromotions", body);
            //     this.changeStatusCommand = body =>
            //         Common.sendCommand(
            //             "Promotion",
            //             "ChangeStatusActivatePromotions",
            //             body
            //         );
            //     break;
            case "emailtemplates":
                this.getCommand = getData.getEmailTemplates;
                this.deleteCommand = (body) =>
                    Common.sendCommand(
                        "EmailTemplate",
                        "DeleteEmailTemplates",
                        body
                    );
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "EmailTemplate",
                        "DeleteEmailTemplates",
                        body
                    );
                break;
            case "emails":
                this.getCommand = getData.getEmails;
                this.deleteCommand = (body) =>
                    Common.sendCommand(
                        "EmailTemplate",
                        "DeleteEmailTemplates",
                        body
                    );
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "EmailTemplate",
                        "DeleteEmailTemplates",
                        body
                    );
                break;
            case "products":
                this.getCommand = function(params) {
                    return getData.getProducts({
                        ...params,
                        type: props.type,
                    });
                };
                this.deleteCommand = (body) =>
                    Common.sendCommand(
                        "Product",
                        "DeleteProductVersion01",
                        body
                    );
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Product",
                        "ChangeStatusPublishProduct",
                        body
                    );
                break;
            case "pages":
                this.getCommand = getData.getPages;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Category", "DeleteCategories", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Category",
                        "ChangeStatusPublishCategories",
                        body
                    );
                break;
            case "images":
                this.getCommand = getData.getImages;
                this.deleteCommand = (body) =>
                    Common.sendCommand("Image", "DeleteImages", body);
                // this.changeStatusCommand = body => Common.sendCommand("Category", "ChangeStatusPublishCategories", body)
                break;
            case "users":
                this.getCommand = getData.getUsers;
                this.deleteCommand = (body) =>
                    Common.sendCommand("User", "DeleteUsers", body);
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "User",
                        "ChangeStatusActivateUsers",
                        body
                    );
                break;
            case "articles":
                this.getCommand = function(params) {
                    return getData.getArticles({
                        ...params,
                        type: props.articleType,
                    });
                };
                this.deleteCommand = (body) =>
                    Common.sendCommand(
                        "Article",
                        "DeleteArticlesVersion01",
                        body
                    );
                this.changeStatusCommand = (body) =>
                    Common.sendCommand(
                        "Article",
                        "ChangeStatusPublishArticle",
                        body
                    );
                break;

            default:
                break;
        }
    }

    componentDidMount() {
        this.load({
            limit: this.pageSize,
            offset: 0,
        });
        if (this.props.categoryFilter) this.loadCategories();
    }

    loadCategories = () => {
        getData.getCategories({ type: this.props.type }).then((response) => {
            this.setState({
                optionsCategories: response.categories.items.map((category) => {
                    return {
                        value: category.id,
                        label: category.name,
                    };
                }),
            });
        });
    };

    onCategoriesChangeHandler = (choosedCategories) => {
        const choosedCategoriesId = choosedCategories.map(
            (choosedCategory) => choosedCategory.value
        );
        this.setState({
            choosedCategories: choosedCategoriesId,
        });
    };

    load = (options) => {
        this.setState({
            checkAll: false,
        });
        this.checkedItems = [];
        this.setState({ loader: true });
        // return getData.getThemeWebs(options)
        return this.getCommand(options)
            .then((data) => {
                console.log(data);
                toast["success"](
                    Configuration.toast_information.LOAD_DATA_SUCCESS(
                        data[this.props.name].totalCount,
                        this.props.name
                    )
                );
                this.setState({
                    items: data[this.props.name].items,
                    loader: false,
                    totalCount: data[this.props.name].totalCount,
                    pages: Math.ceil(
                        data[this.props.name].totalCount / this.pageSize
                    ),
                });
            })
            .catch((err) => {
                console.log(err + "err");
                this.setState({
                    error: {
                        status: true,
                        message: err + "",
                    },
                    loader: false,
                });
            })
            .finally(() => {
                this.setState({
                    loader: false,
                });
            });
    };

    searchHandler = (event, errors, value) => {
        const keyword = value.keyword;
        this.load({
            limit: this.pageSize,
            offset: 0,
            keyword: keyword,
            categoryIds: this.state.choosedCategories,
        });
    };

    checkBoxOnClick = (status, id, published) => {
        if (status.target.checked)
            this.checkedItems.push({
                id: id,
                published: published,
            });
        else {
            this.checkedItems.forEach((themeWeb, index) => {
                if (themeWeb.id === id) {
                    this.checkedItems.splice(index, 1);
                }
            });
        }
        console.log(this.checkedItems);
    };

    changeStatusHandler = () => {
        this.setState({
            loader: true,
        });
        const changeStatuses =
            this.props.name === "users" ||
            this.props.name === "evouchers" ||
            this.props.name === "promotions"
                ? this.checkedItems.map((val) => ({
                      Id: val.id,
                      Activate: val.published,
                  }))
                : this.checkedItems.map((val) => ({
                      Id: val.id,
                      Publish: val.published,
                  }));
        const body = {
            Id: Common.guid(),
            ChangeStatuses: changeStatuses,
            ModifiedBy: Common.getCookie("userId"),
            ModifiedDate: Common.formatDateTime(new Date()),
        };
        console.log(body);

        this.changeStatusCommand(body)
            .then((response) => {
                toast["success"](
                    Configuration.toast_information.CHANGE_STATUS_SUCCESS
                );
                this.load({
                    limit: this.pageSize,
                    offset: 0,
                });
            })
            .catch((err) => {
                this.setState({
                    error: {
                        status: true,
                        message: err + "",
                    },
                    loader: false,
                });
            });
    };

    static updateItemHandler = (id, urlName, langId) => {
        window.location.replace(
            `#/${urlName}/edit/${id}${langId ? `?languageId=${langId}` : ""}`
        );
    };

    isCheckboxChecked = (id) => {
        return this.checkedItems.map((val) => val.id).includes(id);
    };

    checkAllHandler = () => {
        if (!this.state.checkAll)
            this.checkedItems = [
                ...this.state.items.map((themeWeb) => ({
                    id: themeWeb.id,
                    published: themeWeb.published,
                })),
            ];
        else {
            this.checkedItems = [];
        }

        this.setState({
            checkAll: !this.state.checkAll,
        });
        console.log(this.checkedItems);
    };

    toggle = (id) => {
        this.setState({
            isModalDeleteOpen: !this.state.isModalDeleteOpen,
            deleteItem: id,
        });
    };

    deleteItemsHandler = () => {
        this.setState({
            loader: true,
        });
        const body = {
            Id: Common.guid(),
            Ids: this.checkedItems.map((val) => {
                return val.id;
            }),
            ModifiedBy: Common.getCookie("userId"),
            ModifiedDate: Common.formatDateTime(new Date()),
        };

        this.deleteCommand(body)
            .then((response) => {
                toast["success"](Configuration.toast_information.SUCCESS);
                console.log(response);
                this.load({
                    limit: this.pageSize,
                    offset: 0,
                });
            })
            .finally(() => {});
    };

    addItemsToCategoryOnSubmit = (event, error, value) => {
        this.setState({
            isSending: true,
        });
        if (this.state.optionsCategories.length < 1)
            return toast["error"]("Không có phân loại nào");
        let categoryId =
            value.category === ""
                ? this.state.optionsCategories[0].value
                : value.category;

        console.log(categoryId, this.checkedItems);

        postData
            .sendCommand("Image", "AddImagesToCategory", {
                Id: Common.guid(),
                CategoryId: categoryId,
                ImageIds: this.checkedItems.map((val) => val.id),
                ModifiedDate: new Date(),
                ModifiedBy: Common.getCookie("userId"),
            })
            .then((response) => {
                if (response.data.Success)
                    this.setState({
                        modalInfo: {
                            show: true,
                            message: "Thành công",
                            responesMessage: response.data.Message,
                            type: "success",
                        },
                    });
                else
                    this.setState({
                        modalInfo: {
                            show: true,
                            message: "Thất bại",
                            responesMessage: response.data.Message,
                            type: "error",
                        },
                    });
            })
            .catch((err) => {
                this.setState({
                    modalInfo: {
                        show: true,
                        message: "Thất bại",
                        responesMessage: err + "",
                        type: "error",
                    },
                });
            })
            .finally(() => {
                this.checkedItems = [];
                this.setState({
                    isSending: false,
                });
            });
    };

    render() {
        const { loader } = this.state;
        const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;

        const { items } = this.state;
        return (
            <div>
                <Card className="main-card mb-3">
                    <Loader message={spinner} show={loader} priority={10}>
                        {/* <CardHeader className="card-header-tab">
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Danh sách {this.props.name}
                            </div>
                        </CardHeader> */}
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <AvForm inline onSubmit={this.searchHandler}>
                                    <Label className="mb-sm-3 w-40">
                                        Tìm kiếm:{" "}
                                    </Label>
                                    <AvGroup className="mb-2 mr-sm-2 mb-sm-3 ml-sm-3">
                                        <AvField
                                            type="text"
                                            name="keyword"
                                            placeholder={`Nhập tên ${this.props.name} ...`}
                                        />
                                        {this.props.categoryFilter ? (
                                            <div
                                                style={{
                                                    marginLeft: 5,
                                                    minWidth: "400px",
                                                }}
                                            >
                                                <Select
                                                    isMulti
                                                    name="category"
                                                    options={
                                                        this.state
                                                            .optionsCategories
                                                    }
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={
                                                        this
                                                            .onCategoriesChangeHandler
                                                    }
                                                />
                                            </div>
                                        ) : null}
                                    </AvGroup>
                                    <Button color="primary mb-sm-3">
                                        Tìm kiếm
                                    </Button>
                                </AvForm>

                                <div>
                                    <Link to={`/${this.props.urlName}/create`}>
                                        <Button color="success mr-3">
                                            Tạo mới
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            {this.props.addItemsToCategory ? (
                                <CustomLoader
                                    isSending={this.state.isSending}
                                    modalInfo={this.state.modalInfo}
                                >
                                    <AvForm
                                        inline
                                        className="mb-3"
                                        onSubmit={
                                            this.addItemsToCategoryOnSubmit
                                        }
                                    >
                                        <Label>Thêm vào phân loại:</Label>
                                        <AvField
                                            className="mr-2 ml-3"
                                            name="category"
                                            type="select"
                                        >
                                            {this.state.optionsCategories.map(
                                                (val, i) => (
                                                    <option
                                                        key={i}
                                                        value={val.value}
                                                    >
                                                        {val.label}
                                                    </option>
                                                )
                                            )}
                                        </AvField>
                                        <Button color="primary">Thêm</Button>
                                    </AvForm>
                                </CustomLoader>
                            ) : null}
                            <ReactTable
                                data={items}
                                manual
                                pages={this.state.pages}
                                style={{
                                    height: "60vh", // This will force the table body to overflow and scroll, since there is not enough room
                                }}
                                onFetchData={(state, instance) => {
                                    this.setState({ loader: true });
                                    this.getCommand({
                                        limit: this.pageSize,
                                        offset: state.page * this.pageSize,
                                    }).then((data) => {
                                        // console.log(data)
                                        // console.log(this.props.name)
                                        // console.log(data[this.props.name])
                                        this.setState({
                                            items: data[this.props.name].items,
                                            loader: false,
                                        });
                                    });
                                }}
                                onPageSizeChange={(pageSize, pageIndex) => {
                                    this.setState({ loader: true });
                                    this.pageSize = pageSize;
                                    // getData.getThemeWebs({
                                    this.getCommand({
                                        limit: this.pageSize,
                                        offset: pageIndex * this.pageSize,
                                    }).then((data) =>
                                        this.setState({
                                            items: data[this.props.name].items,
                                            pages: Math.ceil(
                                                data[this.props.name]
                                                    .totalCount / this.pageSize
                                            ),
                                            loader: false,
                                        })
                                    );
                                }}
                                // filterable
                                onFilteredChange={() =>
                                    console.log("filter here")
                                }
                                columns={[
                                    {
                                        id: "id",
                                        Header: () => (
                                            <CustomInput
                                                type="checkbox"
                                                id="selectAllCheckBox"
                                                checked={this.state.checkAll}
                                                onChange={this.checkAllHandler}
                                            />
                                        ),
                                        accessor: (d) => ({
                                            id: d.id,
                                            status: d.published,
                                        }),
                                        Cell: (props) => (
                                            <CustomInput
                                                type="checkbox"
                                                id={props.value}
                                                defaultChecked={this.isCheckboxChecked(
                                                    props.value
                                                )}
                                                onClick={(event) => {
                                                    console.log({
                                                        ...event.target,
                                                    });
                                                    const published =
                                                        props.original
                                                            .published !==
                                                        undefined
                                                            ? props.original
                                                                  .published
                                                            : props.original
                                                                  .active;
                                                    this.checkBoxOnClick(
                                                        event,
                                                        props.value,
                                                        published
                                                    );
                                                }}
                                            />
                                        ),
                                        filterable: false,
                                        sortable: false,
                                        width: 50,
                                        resizable: false,
                                    },
                                    ...this.props.columns,
                                ]}
                                getTrProps={(state, rowInfo) => {
                                    if (rowInfo && rowInfo.row) {
                                        return {
                                            onClick: (e) => {
                                                //     console.log(rowInfo.original,'roww')
                                                //     this.deletePerson(rowInfo.original.id)
                                                //     this.setState({
                                                //     selected: rowInfo.index
                                                //   })
                                            },
                                            style: {
                                                background:
                                                    rowInfo.index ===
                                                    this.state.selected
                                                        ? "#00afec"
                                                        : "white",
                                                color:
                                                    rowInfo.index ===
                                                    this.state.selected
                                                        ? "white"
                                                        : "black",
                                            },
                                        };
                                    } else {
                                        return {};
                                    }
                                }}
                                getTdProps={(
                                    state,
                                    rowInfo,
                                    column,
                                    instace
                                ) => {
                                    return {
                                        style: {
                                            // overflow: "hidden"
                                        },
                                    };
                                }}
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />

                            <SweetAlert
                                title="Something went wrong"
                                confirmButtonColor=""
                                show={this.state.error.status}
                                text={this.state.error.message}
                                type="error"
                                onConfirm={() =>
                                    this.setState({
                                        error: {
                                            status: false,
                                        },
                                    })
                                }
                            />
                        </CardBody>
                        <CardFooter className="d-block">
                            <Row>
                                <Col md="8">
                                    <Button
                                        size="lg"
                                        className="mb-2 mr-2 btn-shadow-primary"
                                        color="danger"
                                        onClick={() =>
                                            this.setState({
                                                toggle: !this.state.toggle,
                                            })
                                        }
                                    >
                                        Xóa danh sách được chọn
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="mb-2 mr-2 btn-dashed btn-shadow-primary"
                                        color="primary"
                                        disabled={false}
                                        onClick={this.changeStatusHandler}
                                    >
                                        Chuyển trạng thái
                                    </Button>
                                </Col>
                                {this.props.exportExcel ? (
                                    <Col
                                        md="4"
                                        className="d-flex flex-row-reverse"
                                    >
                                        <div>
                                            <a
                                                target="_blank"
                                                href={
                                                    Configuration.sampleUserExcelLink
                                                }
                                            >
                                                File mẫu
                                            </a>
                                            <ModalImportCSV />

                                            {this.state.items ? (
                                                <Button
                                                    color="success"
                                                    className="ml-2"
                                                >
                                                    <CSVLink
                                                        data={this.state.items}
                                                        target="_blank"
                                                    >
                                                        Export Excel
                                                    </CSVLink>
                                                </Button>
                                            ) : (
                                                <p>loading...</p>
                                            )}
                                        </div>
                                    </Col>
                                ) : null}
                            </Row>
                        </CardFooter>

                        <ModalConfirmDelete
                            toggle={this.state.toggle}
                            deleteItemHandler={this.deleteItemsHandler}
                        />

                        {/* <Modal isOpen={this.state.isModalDeleteOpen} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Are you sure to delete Item</ModalHeader>
                        <ModalBody>
                            After delete, data cant be restored. Make sure you want to delete this article
                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            <Button color="danger" onClick={() => this.deleteItemHandler()}>Delete</Button>{' '}
                        </ModalFooter>
                    </Modal> */}
                    </Loader>
                </Card>
            </div>
        );
    }
}

export default TableList;
