import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import { MainNav, CurdNav, Gallery, Repository,Content, Articles, Categories, Product, Setting, ThemeWeb, Users, Navigation, UserCategories, Email, LandingPage, ImageCategory, ProductCategories, Evoucher, Promotion } from './NavItems';
// import { MainNav, CurdNav, Gallery, Repository, Content, Categories, Product, Setting, ThemeWeb, Users, Navigation, UserCategories, Email, LandingPage, ImageCategory, ProductCategories, Promotion } from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Dashboard</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Chuyên mục</h5>
                <MetisMenu content={Categories} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Bài viết</h5>
                <MetisMenu content={Content} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Thư viện</h5>
                <MetisMenu content={Gallery} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Album ảnh</h5>
                <MetisMenu content={ImageCategory} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                {/* <h5 className="app-sidebar__heading">Sản Phẩm</h5>
                <MetisMenu content={Products} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />                */}
                <h5 className="app-sidebar__heading">Nhóm thành viên</h5>
                <MetisMenu content={UserCategories} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Thành viên</h5>
                <MetisMenu content={Users} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Sản phẩm</h5>
                <MetisMenu content={Product} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Nhóm sản phẩm</h5>
                <MetisMenu content={ProductCategories} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">E-mail</h5>
                <MetisMenu content={Email} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Evoucher</h5>
                <MetisMenu content={Evoucher} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Điều hướng</h5>
                <MetisMenu content={Navigation} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Landing Page</h5>
                <MetisMenu content={LandingPage} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Theme Web</h5>
                <MetisMenu content={ThemeWeb} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Cài đặt</h5>
                <MetisMenu content={Setting} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);