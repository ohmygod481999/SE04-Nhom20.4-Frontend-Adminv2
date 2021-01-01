import React, { Fragment } from "react";
import cx from "classnames";

import { connect } from "react-redux";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import HeaderLogo from "../AppLogo";

import SearchBox from "./Components/SearchBox";
import MegaMenu from "./Components/MegaMenu";
import UserBox from "./Components/UserBox";
import HeaderRightDrawer from "./Components/HeaderRightDrawer";
import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
    trial = () => {
        window.location.href = "#/theme";
    };
    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, {
                        "header-shadow": enableHeaderShadow
                    })}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <HeaderLogo />

                    <div
                        className={cx("app-header__content", {
                            "header-mobile-open": enableMobileMenuSmall
                        })}
                    >
                        <div className="app-header-left">
                            {/* <SearchBox /> */}
                            {/* <button
                                className="mb-2 mr-2 btn-icon btn btn-wide btn-info"
                                onClick={() => this.trial()}
                            >
                                <i className="pe-7s-science btn-icon-wrapper"> </i>
                                Dùng thử
                            </button> */}

                            {/* <MegaMenu /> */}
                        </div>
                        <div className="app-header-right">
                            <HeaderDots />
                            <UserBox />
                            {/* <HeaderRightDrawer /> */}
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
