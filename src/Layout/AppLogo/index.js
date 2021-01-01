import React, { Fragment } from "react";
import { connect } from "react-redux";

import Hamburger from "react-hamburgers";

import AppMobileMenu from "../AppMobileMenu";
// import logo from '../../assets/images/logo-izzi-cms.png'

import {
    setEnableClosedSidebar,
    setEnableMobileMenu,
    setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false,
        };
    }

    toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
        setEnableClosedSidebar(!enableClosedSidebar);
    };

    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };
    render() {
        let { enableClosedSidebar } = this.props;

        console.log(this.props.merchantType)

        return (
            <Fragment>
                <div className="app-header__logo" data-tut="tour-izzi-learn">
                    {this.props.merchantType ===
                    Configuration.merchantType.elearning ? (
                        <div className="logo-src izzi-learn" />
                    ) : (
                        <div className="logo-src izzi-cms" />
                    )}

                    <div className="header__pane ml-auto">
                        <div onClick={this.toggleEnableClosedSidebar}>
                            <Hamburger
                                active={enableClosedSidebar}
                                type="elastic"
                                onClick={() =>
                                    this.setState({
                                        active: !this.state.active,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
                <AppMobileMenu />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    merchantType: state.System.merchantType,
});

const mapDispatchToProps = (dispatch) => ({
    setEnableClosedSidebar: (enable) =>
        dispatch(setEnableClosedSidebar(enable)),
    setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
    setEnableMobileMenuSmall: (enable) =>
        dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
