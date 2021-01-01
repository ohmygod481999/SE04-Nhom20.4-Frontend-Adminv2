import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
    MainNav,

    Content,
    Media,
    Theme,
    Config,
    Evoucher,
    Booking,
    Elearning,
    FormBuilder,
} from "./NavItems";
import text from "../../utils/text";



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
                <h5 className="app-sidebar__heading">{text("REWARD")}</h5>
                <MetisMenu
                    content={Evoucher}
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



            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);
