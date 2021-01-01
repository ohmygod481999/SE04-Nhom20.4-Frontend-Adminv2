import React from 'react';
import {
    Button, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Input,
    Card, CardBody, CardTitle, Label, FormGroup, CustomInput, Container, CardHeader, CardFooter
} from 'reactstrap';
import './ThemeWeb.css'
import ReactTable from "react-table-6";
import Common from '../../utils/common';
import Loader from 'react-loader-advanced';
import {Loader as LoaderAnim} from 'react-loaders'
import SweetAlert from 'sweetalert-react';
import _ from 'lodash';

class ThemeWebListTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articles: [],
            loader: false,
            themeWebs: [],
            error: {
                status: false,
                message: ''
            },
            checkAll: false,
            modalDelete: false
        }
        this.checkedArticles = []
    }

    componentDidMount() {
        this.load()
    }

    load = (themeWebId) => {
        this.setState({loader :true})
        const merchantId = Common.getCookie('merchantId');
        const paramGraphQl = themeWebId == "" || themeWebId == undefined ? "" : `themeWebId: "${themeWebId}"`
        Common.getDataGraphQl(`
        {
            sections(param:{${paramGraphQl}}){
              items {
                id,
                name,
                html,
                description,
                displayOrder,
                defaultHtml,
                createdDate
              },
              message,
              success,
              totalCount
            }
        }
        `).then(data => {
            console.log(data)
            this.setState({articles: data.sections.items, loader: false})
        })
        .catch(err => {
            console.log(err + 'err')
            this.setState({
                error: {
                    status: true,
                    message: err + ''
                },
                loader: false
            })
        })
    }
    
    checkBoxOnClick = (status, id) => {
        if(status.target.checked) this.checkedArticles.push(id)
        else {
            this.checkedArticles.forEach((articleId, index) => {
                if(articleId === id) {
                    this.checkedArticles.splice(index, 1)
                }
            })
        }
        console.log(this.checkedArticles)
    }
    
    deleteItemHandler = (id) => {
        this.setState({
            modalDelete: !this.state.modalDelete,
            deleteItem: {
                id: id
            }
        });
    }

    deleteItemsHandler = () => {
        alert(`This button will delete Items: ${this.checkedArticles.join(', ')}`)
    }

    changeStatusHandler = () => {
        alert(`This button will change status items: ${this.checkedArticles.join(', ')}`)
    }

    updateItemHandler = (id) => {
        window.location.replace(`#/theme-web/section/${id}`);
        // alert(`This button will update item with id ${id}`)
    }

    isCheckboxChecked = (id) => {
        return this.checkedArticles.includes(id)
    }

    checkAllHandler = () => {
        if (!this.state.checkAll) this.checkedArticles = [...this.state.articles.map(article => article.id)]
        else {
            this.checkedArticles = []
        }
        
        this.setState({
            checkAll: !this.state.checkAll
        })
        console.log(this.checkedArticles)
    }

    toggle =() => {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    onChangeThemeWebSelection = (id) => {
        this.load(id)
    }
    

    render () {
        const {
            loader
        } = this.state;
        const spinner = <LoaderAnim color="#ffffff" type="ball-pulse"/>;

        const {articles} = this.state;
        console.log(articles)
        const style = {
            margin: "auto"
        }
        return (
            <div>
                <Card className="main-card mb-3">
                                <CardHeader className="card-header-tab">
                                    <div
                                        className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        Danh sach
                                        
                                    </div>
                                    <Input className="theme-web-select" type="select" name="theme-webs" id="theme-webs" onChange={(event) => this.onChangeThemeWebSelection(event.target.value)}>
                                                <option value="">All</option>
                                        {this.state.themeWebs.map((themeWeb, index) => {
                                            return (
                                                <option key={index} value={themeWeb.id}>{themeWeb.name}</option>
                                            )
                                        })}
                                    </Input>
                                </CardHeader>

                                <CardBody>
                                    <Loader
                                        message={spinner}
                                        show={loader} priority={10}>
                                        <ReactTable
                                            data={articles}
                                            filterable
                                            onPageChange={() => this.forceUpdate()}
                                            columns={[
                                                {
                                                    Header: () => (
                                                        <CustomInput type="checkbox" id="selectAllCheckBox" checked={this.state.checkAll} onChange={this.checkAllHandler}/>
                                                    ),
                                                    accessor: 'id',
                                                    Cell: props => <CustomInput 
                                                    type="checkbox" 
                                                    id={props.value} 
                                                    defaultChecked={this.isCheckboxChecked(props.value)} 
                                                    onClick={(event) => {
                                                        console.log({...event.target})
                                                        this.checkBoxOnClick(event, props.value)
                                                    }}/>,
                                                    filterable: false,
                                                    sortable: false,
                                                    width: 50,
                                                    resizable: false
                                                },
                                                {
                                                    Header: "Tên",
                                                    accessor: "name",
                                                    resizable: false,
                                                    width: 400
                                                },
                                                {
                                                    Header: "Phát hành",
                                                    Cell: props => (
                                                        <div>
                                                            <div className="mb-2 mr-2 badge badge-success">Đã đăng bài</div>
                                                        </div>
                                                    ),
                                                    accessor: "status",
                                                    resizable: false,
                                                    width: 130
                                                },
                                                {
                                                    id: 'description',
                                                    Header: "Nội dung",
                                                    accessor: d => {
                                                        if (d.description.length > 50) return d.description.substring(0,49)
                                                        return d.description
                                                    },
                                                    resizable: false
                                                },
                                                {
                                                    id: 'createdDate',
                                                    Header: "Ngày tạo",
                                                    accessor: d => {
                                                        const date = (new Date(d.createdDate))
                                                        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                                                    },
                                                    resizable: false,
                                                    width: 130
                                                },
                                                {
                                                    Header: "Thao tác",
                                                    accessor: "id",
                                                    Cell: props => (
                                                        <div style={style}>
                                                            <Button className="mb-2 mr-2 btn-shadow" color="danger" onClick={() => this.deleteItemHandler(props.value)}>Xóa</Button>
                                                            <Button className="mb-2 mr-2 btn-shadow" color="info" onClick={() => this.updateItemHandler(props.value)}>Sửa</Button>
                                                        </div>
                                                    ),
                                                    filterable: false,
                                                    resizable: false,
                                                    width: 150
                                                },

                                                
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
                                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                                    }
                                                }
                                                }else{
                                                return {}
                                                }
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
                                            onConfirm={() => this.setState({
                                                error: {
                                                    status: false
                                                }
                                            })}/>
                                    </Loader>
                                </CardBody>
                                <CardFooter className="d-block">
                                    <Button size="lg" className="mb-2 mr-2 btn-shadow-primary" color="danger" onClick={this.deleteItemsHandler}>Delete</Button>
                                    <Button size="lg" className="mb-2 mr-2 btn-dashed btn-shadow-primary" color="primary" disabled={false} onClick={this.changeStatusHandler}>Chuyển trạng thái</Button>
                                </CardFooter>

                                <Modal isOpen={this.state.modalDelete} toggle={this.deleteItemHandler} className={this.props.className}>
                                        <ModalHeader toggle={this.toggle}>Are you sure to delete Item: {_.get(this,'state.deleteItem.id')}</ModalHeader>
                                    <ModalBody>
                                        After delete, data cant be restored. Make sure you want to delete this article
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="link" onClick={this.toggle}>Cancel</Button>
                                        <Button color="danger" onClick={this.toggle}>Delete</Button>{' '}
                                    </ModalFooter>
                                </Modal>
                            </Card>
            </div>
        )
    }
}

export default ThemeWebListTable;