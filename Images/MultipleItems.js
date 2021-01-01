import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";
import { Button, Card, CardBody, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, UncontrolledButtonDropdown } from 'reactstrap';
import { loadPickedImages, loadPickedImagesHelpDesk } from '../../reducers/Partial';
import Configuration from "../../utils/configuration";


class MultipleItems extends Component {
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

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props.previewImages, 'ldfhgkljjhgkdfgkj kdsfjghkdgkgkoosdfh ong yeu dhasldkj longye hfaldg a i xinh 1 h uhong dang yeu dasd anh thich em nhieu lam kkkk')
    //     if (props.previewImages != undefined && props.previewImages != [])
    //     return {
    //         previewImages: props.previewImages
    //     }
    // }

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
        const images = this.props.helpDesk ? this.props.imagesHelpDesk : this.props.images
        const loadPickedImages = this.props.helpDesk ? this.props.loadPickedImagesHelpDesk : this.props.loadPickedImages
        return (
            <Fragment>
                <Slider {...settings}>
                    {images.map((previewImage, index) => {
                    // {this.state.previewImages.map((previewImage, index) => {
                        return (
                            <Card key={index} >
                                <CardHeader>
                                    <div
                                        className="card-header-title font-weight-normal">
                                        {/* {previewImage.name.length > 20 ? previewImage.name.substring(1,30) + '...' : previewImage.name} */}
                                        Thứ tự: {previewImage.displayOrder}, Nổi bật: {previewImage.isFeatured ? "YES" : "NO"}
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
                                                        <Input style={inputStyle} type="text" name="thuTu" id="thuTu" 
                                                            value={previewImage.displayOrder}
                                                            onChange={event => {
                                                                loadPickedImages(images.map(val => {
                                                                    if (val.id === previewImage.id) return {
                                                                        ...val,
                                                                        displayOrder: event.target.value
                                                                    }
                                                                    else return val
                                                                }))
                                                            }}/>
                                                    </FormGroup>
                                                    <FormGroup style={formGroupStyle}>
                                                        <Label for="noibat" className="mr-sm-2">Nổi bật</Label>
                                                        <FormGroup>
                                                        <Label>
                                                            <Input type="radio" name="isFeature" 
                                                                value={true} 
                                                                onChange={event => loadPickedImages(images.map(val => {
                                                                    if (val.id === previewImage.id) return {
                                                                        ...val,
                                                                        isFeatured: event.target.value
                                                                    }
                                                                    else return val
                                                                }))}
                                                                checked={previewImage.isFeatured} />{' '}
                                                            True
                                                        </Label>
                                                        </FormGroup>
                                                        <FormGroup>
                                                        <Label>
                                                            <Input type="radio" name="isFeature" 
                                                                value={false} 
                                                                onChange={event => loadPickedImages(images.map(val => {
                                                                    if (val.id === previewImage.id) return {
                                                                        ...val,
                                                                        isFeatured: !event.target.value
                                                                    }
                                                                    else return val
                                                                }))}
                                                                checked= {!previewImage.isFeatured}/>{' '}
                                                            False
                                                        </Label>
                                                        </FormGroup>
                                                        {/* <div style={{marginLeft: '42px'}} className="switch has-switch mb-2 mr-2" data-on-label="ON"
                                                            data-off-label="OFF">
                                                            onClick={this.handleClick}>
                                                            <div className={cx("switch-animate", {
                                                                'switch-on': previewImage.isFeatured,//this.state.isToggleOn,
                                                                'switch-off': !previewImage.isFeatured // !this.state.isToggleOn
                                                            })}>
                                                                <input type="checkbox"/><span
                                                                className="switch-left bg-success">ON</span><label>&nbsp;</label><span
                                                                className="switch-right bg-success">OFF</span>
                                                            </div>
                                                        </div> */}
                                                    </FormGroup>
                                                </Form>
                                                <DropdownItem divider/>
                                                <div className="p-1 text-right">
                                                    <Button className="mr-2 btn-shadow btn-sm" color="link">View
                                                        Details</Button>
                                                    <Button className="mr-2 btn-shadow btn-sm"
                                                            color="primary" onClick={() => loadPickedImages(images.filter(val => val.id != previewImage.id))}>Xóa</Button>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                <img style={{width: '100%'}} src={Configuration.image_url + previewImage.path}/>
                                </CardBody>
                            </Card>
                        )
                    })}
                </Slider>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.Partial.images,
        imagesHelpDesk: state.Partial.imagesHelpDesk
    }
}

const mapDispatchToProps = {
    loadPickedImages,
    loadPickedImagesHelpDesk
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleItems)