import React, { Component, Fragment } from 'react';
import MetisMenu from 'react-metismenu';
import { withRouter } from 'react-router-dom';
import text from '../../utils/text';
import { ContentNotReport, FormBuilder, MainNav } from './NavItems';




class NavEditor extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <MetisMenu
                    content={MainNav}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                />
                {/* <h5 className="app-sidebar__heading">{text("THEME")}</h5>
                <MetisMenu
                    content={Theme}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                /> */}
                <h5 className="app-sidebar__heading">{text("CONTENT")}</h5>
                <MetisMenu
                    content={ContentNotReport}
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
                {/* <h5 className="app-sidebar__heading">{text("MEDIA")}</h5>
                <MetisMenu
                    content={MediaNotUser}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                /> */}
                {/* <h5 className="app-sidebar__heading">{text("SETTING")}</h5> */}
                {/* <MetisMenu
                    content={ConfigNotRole}
                    activeLinkFromLocation
                    className="vertical-nav-menu"
                    iconNamePrefix=""
                    classNameStateIcon="pe-7s-angle-down"
                /> */}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(NavEditor);