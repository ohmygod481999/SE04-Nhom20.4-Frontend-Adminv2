import React, { Fragment } from "react";

import moment from 'moment'

import PerfectScrollbar from "react-perfect-scrollbar";

import {
    DropdownToggle,
    DropdownMenu,
    Nav,
    Col,
    Row,
    Button,
    NavItem,
    NavLink,
    UncontrolledTooltip,
    UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
// import avatar from '../../../assets/utils/images/avatars/1.jpg';
import Common from "../../../utils/common";
import Configuration from "../../../utils/configuration";
import _ from "lodash";
import { getMerchant } from "../../../Services/MerchantService";

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            merchant: {}
        };
        this.defaultImage =
            "https://www.kafkas.edu.tr/dosyalar/ashmyo/image/default-user.png";
    }

    componentDidMount() {
        getMerchant().then((res) => {
            this.setState({
                merchant: {
                    ...res.merchant,
                    expiredTime: new Date(res.merchant.expiredTime),
                },
            });
        });

        if (Common.getCookie(Configuration.userCookie) != "") {
            Common.GetUserDataByToken(
                Common.getCookie(Configuration.userCookie),
                (data) => {
                    if (data.Success) {
                        this.setState({ user: JSON.parse(data.Message) });
                    } else return;
                }
            );
        }
    }

    // Logout
    logout = () => {
        Common.deleteCookie(Configuration.userCookie);
        console.log(this.props.history);
        window.location.replace("#/");
    };

    // notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
    //     transition: Bounce,
    //     closeButton: true,
    //     autoClose: 5000,
    //     position: 'bottom-center',
    //     type: 'success'
    // });

    render() {
        return (
            <Fragment>
                <div className="header-btn-lg pr-0" data-tut="tour-profile">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle
                                        color="link"
                                        className="p-0"
                                    >
                                        <img
                                            width={42}
                                            className="rounded-circle"
                                            src={
                                                _.get(
                                                    this.state,
                                                    "user.Avatar"
                                                ) !== null
                                                    ? _.get(
                                                          this.state,
                                                          "user.Avatar"
                                                      )
                                                    : this.defaultImage
                                            }
                                            alt=""
                                        />
                                        <FontAwesomeIcon
                                            className="ml-2 opacity-8"
                                            icon={faAngleDown}
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu
                                        right
                                        className="rm-pointers dropdown-menu-lg"
                                    >
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div
                                                    className="menu-header-image opacity-2"
                                                    style={{
                                                        backgroundImage:
                                                            "url(" +
                                                            city3 +
                                                            ")",
                                                    }}
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img
                                                                    width={42}
                                                                    className="rounded-circle"
                                                                    src={
                                                                        _.get(
                                                                            this
                                                                                .state,
                                                                            "user.Avatar"
                                                                        ) !==
                                                                        null
                                                                            ? _.get(
                                                                                  this
                                                                                      .state,
                                                                                  "user.Avatar"
                                                                              )
                                                                            : this
                                                                                  .defaultImage
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    {_.get(
                                                                        this
                                                                            .state,
                                                                        "user.FullName"
                                                                    )}
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    {_.get(
                                                                        this
                                                                            .state,
                                                                        "user.Mobile"
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button
                                                                    className="btn-pill btn-shadow btn-shine"
                                                                    color="focus"
                                                                    onClick={this.logout.bind(
                                                                        this
                                                                    )}
                                                                >
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="scroll-area-xs"
                                            style={{
                                                height: "150px",
                                            }}
                                        >
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Hành động
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#/user/change-password">
                                                            Đổi mật khẩu
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                        <Nav vertical>
                                            <NavItem className="nav-item-divider" />
                                            <NavItem className="nav-item-btn ">
                                                Ngày hết hạn:{" "}
                                                {moment(this.state.merchant.expiredTime).format("DD/MM/YYYY")}
                                                {/* {JSON.stringify(_.get(
                                                    this.state,
                                                    "merchant.expiredTime"
                                                ))} */}
                                                <br />
                                                Dung lượng tối đa: 512 MB
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {_.get(this.state, "user.FullName")}
                                </div>
                                <div className="widget-subheading">
                                    {/* VP People Manager */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
            // <Fragment>
            //     <div className="header-btn-lg pr-0">
            //         <div className="widget-content p-0">
            //             <div className="widget-content-wrapper">

            //                 <div className="widget-content-left">
            //                     <div className="widget-heading">
            //                         {_.get(this.state, 'user.FullName')}
            //                     </div>
            //                     <div className="widget-subheading">
            //                         <a className="btn-pill btn-shadow btn-shine"
            //                             color="focus" onClick={this.logout.bind(this)}>
            //                             Logout
            //                                                     </a>
            //                     </div>

            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </Fragment>
        );
    }
}

export default UserBox;
