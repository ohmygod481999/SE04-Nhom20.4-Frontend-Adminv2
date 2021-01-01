import React, { Component, Fragment } from "react";
import MetisMenu from "react-metismenu";
import { withRouter } from "react-router-dom";
import text from "../../utils/text";
import {
  Booking, Config, Content,
















  FormBuilder, MainNav,
















  Media,
  Theme, ThemeWeb
} from "./NavItems";



class Nav extends Component {
    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">{text("FASTACCESS")}</h5>
                <MetisMenu
                    content={MainNav}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />                
                <h5 className="app-sidebar__heading">{text("THEME")}</h5>
                <MetisMenu
                    content={Theme}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">{text("CONTENT")}</h5>
                <MetisMenu
                    content={Content}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">{text("MEDIA")}</h5>
                <MetisMenu
                    content={Media}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">{text("BOOKING")}</h5>
                <MetisMenu
                    content={Booking}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">{"Form"}</h5>
                <MetisMenu
                    content={FormBuilder}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">{text("SETTING")}</h5>
                <MetisMenu
                    content={Config}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                <h5 className="app-sidebar__heading">Theme Web</h5>
                <MetisMenu content={ThemeWeb} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                {/* <h5 className="app-sidebar__heading">Sản Phẩm</h5>
                <MetisMenu content={Products} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />                */}
                {/* <h5 className="app-sidebar__heading">Nhóm thành viên</h5>
                <MetisMenu content={UserCategories} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Thành viên</h5>
                <MetisMenu content={Users} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Sản phẩm</h5>
                <MetisMenu content={Product} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Nhóm sản phẩm</h5>
                <MetisMenu content={ProductCategories} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">E-mail</h5>
                <MetisMenu content={Email} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Điều hướng</h5>
                <MetisMenu content={Navigation} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Landing Page</h5>
                <MetisMenu content={LandingPage} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Theme Web</h5>
                <MetisMenu content={ThemeWeb} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Cài đặt</h5>
                <MetisMenu content={Setting} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" /> */}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);
