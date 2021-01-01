import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import moment from "moment";

// import $ from 'jquery';
// import Nav from '../AppNav/VerticalNavWrapper';
import NavEditor from "../AppNav/VerticalNavEditor";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PerfectScrollbar from "react-perfect-scrollbar";
import HeaderLogo from "../AppLogo";

import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";

import MerchantElearning from "../AppNav/VerticalNavMerchantElearning";
import MerchantReward from "../AppNav/VerticalNavMerchantReward";
import MerchantNormal from "../AppNav/VerticalNavMerchantNormal";
import NavForAll from "../AppNav/VerticalNavMerchantAll";
import VerticalNavExpiredTime from "../AppNav/VerticalNavExpiredTime";
import { getMerchant } from "../../Services/MerchantService";
import VerticalNavMerchantCoworking from "../AppNav/VerticalNavMerchantCoworking";
import VerticalNavMerchantVacation from "../AppNav/VerticalNavMerchantVacation";

function getSideBar(infoDataUser, isExpired) {
  if (isExpired) return <VerticalNavExpiredTime></VerticalNavExpiredTime>;
  let sidebar;
  const userTypeEditor = Math.pow(2, 8);
  const userTypeAdmin = Math.pow(2, 20);

  const userAllType = window.location.href.includes("localhost")
    ? 1081633
    : null;
  if (Common.getCookie(Configuration.userCookie) !== "") {
    const temp = infoDataUser.AllType;

    switch (infoDataUser.MerchantType) {
      case Configuration.merchantType.normal:
        if (temp - userTypeAdmin === 0) {
          sidebar = <MerchantNormal></MerchantNormal>;
        } else if (temp - userTypeEditor === 0) {
          sidebar = <NavEditor></NavEditor>;
        } else if (temp - userAllType === 0) {
          sidebar = <MerchantNormal></MerchantNormal>;
        }

        break;

      case Configuration.merchantType.full:
        if (temp - userTypeAdmin === 0) {
          sidebar = <NavForAll></NavForAll>;
        } else if (temp - userTypeEditor === 0) {
          sidebar = <NavEditor></NavEditor>;
        } else if (temp - userAllType === 0) {
          sidebar = <NavForAll></NavForAll>;
        }

        break;
      case Configuration.merchantType.content:
        if (temp - userTypeAdmin === 0) {
          sidebar = <MerchantNormal></MerchantNormal>;
        } else if (temp - userTypeEditor === 0) {
          sidebar = <NavEditor></NavEditor>;
        } else if (temp - userAllType === 0) {
          sidebar = <MerchantNormal></MerchantNormal>;
        }

        break;
      case Configuration.merchantType.elearning:
        sidebar = <MerchantElearning></MerchantElearning>;
        break;

      case Configuration.merchantType.reward:
        sidebar = <MerchantReward></MerchantReward>;
        break;

      // EM long Lam phan nay, co gi lien he 0829400301
      case Configuration.merchantType.coworking:
        sidebar = <VerticalNavMerchantCoworking></VerticalNavMerchantCoworking>;
        break;

      case Configuration.merchantType.vacation:
        sidebar = <VerticalNavMerchantVacation></VerticalNavMerchantVacation>;
        break;
      default:
        break;
    }
    return sidebar;
  }
}

class AppSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: "",
        };

        this.scrollBarRef = React.createRef();

    }
    // state = {
    // };
    setScrollTop = (value) => {
        this.state.scrollTop = value;
        console.log("scrollTop = " + value);
        localStorage.setItem("LeftNavScrollTop", value);
    }

    toggleMobileSidebar = () => {
        let { enableMobileMenu, setEnableMobileMenu } = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    };



    componentDidMount() {
        window.scrollBar = this.scrollBarRef;

        //this.scrollBarRef.scrollTop = this.state.scrollTop;

        setTimeout(() => {
            var value = localStorage.getItem("LeftNavScrollTop");
            if (value && value != undefined) {
                console.log("scrollref" + value);
                this.scrollBarRef.current._container.scrollTop = value;

            }
        }, 0);

        const expiredTime = this.props.expiredTime;
        const sidebar = getSideBar(
            this.props.infomationDataUser,
            moment().isAfter(moment(expiredTime))
        );
        this.setState({
            sidebar: sidebar,
        });


    }

    render() {
        // let sidebar;

        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
        } = this.props;

        return (
            <Fragment>
                <div
                    className="sidebar-mobile-overlay"
                    onClick={this.toggleMobileSidebar}
                />
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-sidebar", backgroundColor, {
                        "sidebar-shadow": enableSidebarShadow,
                    })}
                    transitionName="SidebarAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <HeaderLogo />
                    <PerfectScrollbar ref={this.scrollBarRef}                       
                        onScrollY={container => this.setScrollTop(container.scrollTop)}>
                        <div className="app-sidebar__inner">
                            {/* <NavEditor></NavEditor> */}
                            {this.state.sidebar}
                        </div>
                    </PerfectScrollbar>
                    <div
                        className={cx("app-sidebar-bg", backgroundImageOpacity)}
                        style={{
                            backgroundImage: enableBackgroundImage
                                ? "url(" + backgroundImage + ")"
                                : null,
                        }}
                    ></div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage,
  backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
  //user
  infomationDataUser: state.Partial.infomationDataUser,

  //system
  expiredTime: state.System.expiredTime
});

const mapDispatchToProps = dispatch => ({
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
