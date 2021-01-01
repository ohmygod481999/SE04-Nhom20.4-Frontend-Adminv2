import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
    MainNav,
    Theme,
    Media,
    Content,
    Config,
    FormBuilder,
    Booking,
} from "./NavItems";
// import { MainNav, CurdNav, Gallery, Repository, Content, Categories, Product, Setting, ThemeWeb, Users, Navigation, UserCategories, Email, LandingPage, ImageCategory, ProductCategories, Promotion } from './NavItems';
import text from "../../utils/text";

class VerticalNavExpiredTime extends Component {
    constructor(props) {
        super(props);
        this.pricing = [
            {
                icon: "pe-7s-home",
                label: "Pricing",
                to: "#/pricing",
            },
        ];
    }
    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">PRICING</h5>
                <MetisMenu
                    content={this.pricing}
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

export default withRouter(VerticalNavExpiredTime);
