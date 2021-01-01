import cx from 'classnames';
import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import { Button, Card, CardBody, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, UncontrolledButtonDropdown } from 'reactstrap';


export default class MultipleItems extends Component {
    constructor(props){
        super(props);

        this.state = {
            previewImages: [],
            checked: false,
            isToggleOn: true
        }
    }

    handleClick = () => {
        this.setState(function (prevState) {
            return {isToggleOn: !prevState.isToggleOn};
        });
    }

    static getDerivedStateFromProps(props, state) {
        return {
            previewImages: props.previewImages
        }
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            // slidesToShow: 0,
            slidesToScroll: 1,
            // adaptiveHeight: true
        };
        const formGroupStyle = {
            margin: "0px 10px 10px 24px"
        }
        const inputStyle = {
            width: '70px',
            marginLeft: '40px'
        }
        return (
            <Fragment>
                <Slider {...settings}>
                    {this.state.previewImages.map((previewImage, index) => {
                        return (
                            <Card key={index} >
                                <CardHeader>
                                    <div
                                        className="card-header-title font-weight-normal">
                                        {previewImage.name}
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle className="btn-icon btn-icon-only" color="link">
                                                <i className="lnr-cog btn-icon-wrapper"/>
                                            </DropdownToggle>
                                            <DropdownMenu right className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
                                                <DropdownItem header>Tùy chỉnh</DropdownItem>
                                                <Form inline>
                                                    <FormGroup style={formGroupStyle}>
                                                        <Label for="thuTu" className="mr-sm-2">Thứ tự</Label>
                                                        <Input style={inputStyle} type="text" name="thuTu" id="thuTu" />
                                                    </FormGroup>
                                                    <FormGroup style={formGroupStyle}>
                                                        <Label for="thuTu" className="mr-sm-2">Nổi bật</Label>
                                                        <div style={{marginLeft: '42px'}} className="switch has-switch mb-2 mr-2" data-on-label="ON"
                                                            data-off-label="OFF"
                                                            onClick={this.handleClick}>
                                                            <div className={cx("switch-animate", {
                                                                'switch-on': this.state.isToggleOn,
                                                                'switch-off': !this.state.isToggleOn
                                                            })}>
                                                                <input type="checkbox"/><span
                                                                className="switch-left bg-success">ON</span><label>&nbsp;</label><span
                                                                className="switch-right bg-success">OFF</span>
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                                <DropdownItem divider/>
                                                <div className="p-1 text-right">
                                                    <Button className="mr-2 btn-shadow btn-sm" color="link">View
                                                        Details</Button>
                                                    <Button className="mr-2 btn-shadow btn-sm"
                                                            color="primary">Xóa</Button>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                <img style={{width: '100%'}} height={400} src={previewImage.src}/>
                                </CardBody>
                            </Card>
                        )
                    })}
                </Slider>
            </Fragment>
        );
    }
}