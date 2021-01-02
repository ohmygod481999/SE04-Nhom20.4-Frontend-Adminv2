import React from 'react';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import cx from 'classnames';
import Switch from "react-switch";
import {
    Button, Row, Col,
    Card, CardBody, CardTitle, Label, FormGroup, Media, Table, Input
} from 'reactstrap';
import Validation from '../../../utils/validation';
import FormCkEditorEditor from '../../../utils/CkEditor';
// import CKEDITOR from "react-ckeditor-component";
import $ from 'jquery';
import FileDropZone from '../../../utils/FileDropZone'

class CategoryFormCreate extends React.Component {
    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);

        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
        this.handleClickSwitch = this.handleClickSwitch.bind(this);

        this.state = {
            description: '',
            file: null,
            domCopy: {},
            count: 0,
            build: '',
            btnSwitch: {
                checked: false,
                isToggleOn: true

            },
            // isToggleOn: true
        }

    }
    handleChangeSwitch(checked) {
        this.setState({
            btnSwitch: {
                checked: checked,
            }
        })


    }



    handleClickSwitch() {


        this.setState(function (prevState) {
            return { btnSwitch: { isToggleOn: !prevState.btnSwitch.isToggleOn } }
        }
        );

    }

    handleValidSubmit(event, values) {
        console.log(values);
        console.log(this.state.description);
        var obj = {
            ...values,
            description: this.state.description
        }
        console.log(obj);
    }
    onChangeCkEditorHandler = (ckEditorContent) => {
        this.setState({ description: ckEditorContent + '' });
    }
    componentDidMount() {
        this.state.domCopy = $(this.refs.tr).clone();
        // $(this.refs.tr).remove();

    }
    handleChangeImage(event) {
        var self = this;
        var dom = $(self.state.domCopy).clone();
        $('tbody').append("<tr>" + $(dom).html() + "</tr>");
        $('tbody tr').first().find('input[name="orderImage"]').attr('name', 'orderImage' + self.state.count);
        $('tbody tr').first().find(`input[name="orderImage${self.state.count}"]`).val(self.state.count);

        self.state.count += 1;

        console.log(this.state.file);
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        }, function () {
            console.log(this.state.file);


        });


    }

    render() {

        return (
            <div>
                <Row>
                    <Card className="main-card mb-3 col-8">
                        <CardBody>
                            <CardTitle>Tạo mới</CardTitle>
                            <AvForm onValidSubmit={this.handleValidSubmit} >
                                <Row>
                                    <Col md="9">
                                        {/* With AvField */}
                                        <FormGroup>
                                            <Label for="exampleSelect">Cấp trước</Label>
                                            <AvField type="select" name="preLevel" id="Select" >
                                                <option>-</option>
                                                <option value="2">2</option>

                                            </AvField>
                                        </FormGroup>
                                        <AvGroup>
                                            <AvField name="name" label="Tên phân loại" type="text" validate={Validation.name} />
                                        </AvGroup>
                                        {/* With AvGroup AvInput and AvFeedback to build your own */}
                                        <AvGroup>
                                            <AvField name="order" label="Thứ tự bài viết" type="number" validate={Validation.digital} />
                                        </AvGroup>
                                        {/* Trích dẫn */}
                                        <AvGroup>
                                            <Label for="subDescription">Trích dẫn</Label>
                                            <AvField name="subDescription" id="subDescription" type="textarea" />
                                        </AvGroup>


                                    </Col>
                                    <Col md="3">




                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">

                                    </Col>
                                    <Col md='6'>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <th width="20%">Số thứ tự</th>
                                                    <th width="30%">Ảnh</th>
                                                    <th width="20%">Nổi bật</th>
                                                    <th width="30%">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <trTable index="0" pathImg={this.state.file}>

                                            </trTable> */}
                                                <tr ref="tr">
                                                    <td> <AvField name="orderImage" type="number" /></td>

                                                    <td>
                                                        <img src={this.state.file} id="imgPreview" alt="placeholder image" height="150" width="100%" className="mt-3" />
                                                    </td>

                                                    <td>  <div className="switch has-switch mb-2 mr-2" data-on-label="ON"
                                                        data-off-label="OFF"
                                                        onClick={this.handleClickSwitch}>
                                                        <div className={cx("switch-animate", {
                                                            'switch-on': this.state.btnSwitch.isToggleOn,
                                                            'switch-off': !this.state.btnSwitch.isToggleOn
                                                        })}>
                                                            <input type="checkbox" /><span
                                                                className="switch-left bg-success">ON</span><label>&nbsp;</label><span
                                                                    className="switch-right bg-success">OFF</span>
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <button className="mb-2 mr-2 btn btn-info">Edit</button>
                                                        <button className="mb-2 mr-2 btn btn-danger">Xóa</button>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <FormCkEditorEditor onChange={this.onChangeCkEditorHandler} />

                                <FormGroup>
                                    <Button size="lg" className="mt-3" color="primary">Submit</Button>
                                </FormGroup>
                            </AvForm>
                        </CardBody>
                    </Card>
                    <Card className="main-card mb-3 col-3" style={{ marginLeft: "20px" }}>
                        <CardBody>
                            <CardTitle>Chức năng hỗ trợ</CardTitle>
                            <Row>
                                <Col md="12">
                                    <Input type="file" />
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Row>

            </div>
        )
    }
}

export default CategoryFormCreate;