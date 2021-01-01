import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment, Component, useEffect } from "react";
import Loader from "react-loaders";
import HelpDesk from "../HelpDesk/index";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import Common from "../../utils/common";
import Configuration from "../../utils/configuration";
import { updateInformationDateUser } from "../../reducers/Partial";
import SweetAlert from "sweetalert-react/lib/SweetAlert";
import Evoucher from "../../CMS/E-voucher/Evoucher";
import Promotion from "../../CMS/Promotion";
import ThemeOptions from "../ThemeOptions";
// import Report from "../../CMS/Reports";
import Pin from "../../CMS/CommonComponent/Pin";
import Rating from "../../CMS/Rating";
import ThemeTemplate from "../../CMS/ThemeTemplate";
import { getMerchant } from "../../Services/MerchantService";
import moment from "moment";
import OfficeBooking from "../../CMS/OfficeBooking";
import ProductMember from "../../CMS/ProductMember";
import UserPoint from "../../CMS/UserPoint";
import Schedule from "../../CMS/Schedule";
import Crm from "../../CMS/Crm";

const Dashboards = lazy(() => import("../../CMS/Dashboards"));
const DashboardTheme = lazy(() => import("../../ThemeConfig/Dashboards"));
//const Components = lazy(() => import("../../DemoPages/Components"));
const Login = lazy(() => import("../../CMS/UserPages/index"));
const Articles = lazy(() => import("../../CMS/Articles/Articles"));
const Books = lazy(() => import("../../CMS/Books"));
const Events = lazy(() => import("../../CMS/Events/Index"));
const Slide = lazy(() => import("../../CMS/Slide"));
const Video = lazy(() => import("../../CMS/Video"));
const FormBuilder = lazy(() => import("../../CMS/FormBuilder"));
const Report = lazy(() => import("../../CMS/Report/Report"));
const Order = lazy(() => import("../../CMS/Order/Index"));
const Categories = lazy(() => import("../../CMS/Categories"));
const Products = lazy(() => import("../../CMS/Products"));
const Settings = lazy(() => import("../../CMS/Settings/Settings"));
const ThemeWeb = lazy(() => import("../../CMS/ThemeWeb/ThemeWeb"));
const User = lazy(() => import("../../CMS/User/user"));
const Navigation = lazy(() => import("../../CMS/Navigation/index"));
const Email = lazy(() => import("../../CMS/Emails/Email"));
const UserCategories = lazy(() => import("../../CMS/UserCategories/index"));
const MemberCategories = lazy(() => import("../../CMS/MemberCategories/index"));
const AddressCategories = lazy(() => import("../../CMS/AddressCategories/index"));
const LandingPage = lazy(() => import("../../CMS/LandingPages/index"));
const Gallery = lazy(() => import("../../CMS/Gallery/index"));
const ImageCategories = lazy(() => import("../../CMS/ImageCategories/index"));
const Storage = lazy(() => import("../../CMS/Storage"));
const Quiz = lazy(() => import("../../CMS/Quiz"));
const QuizVideo = lazy(() => import("../../CMS/QuizVideo"));
const Course = lazy(() => import("../../CMS/Courses"));
const Booking = lazy(() => import("../../CMS/Booking"));
// const RoomBooking = lazy(() => import("../../CMS/RoomBooking"));
const ProductEvoucher = lazy(() => import("../../CMS/ProductEvoucher"));
const VideoGallery = lazy(() => import("../../CMS/VideoGallery"));
const Address = lazy(() => import("../../CMS/Address"));
const Attribute = lazy(() => import("../../CMS/Attribute"));
const ProductCategories = lazy(() =>
    import("../../CMS/ProductCategories/index")
);
const SettingNotification = lazy(() =>
    import("../../CMS/SettingNotification/SettingNotification")
);
const ProductMerchant = lazy(() => import("../../CMS/Admin/ProductMerchant"));
const Merchant = lazy(() => import("../../CMS/Admin/Merchant"));
const ExpiredMerchant = lazy(() => import("../../CMS/ExpiredMerchant/Price"));
const Contract = lazy(() => import("../../CMS/Contract"));

const TextLoading = (
    <div className="loader-container">
        <div className="loader-container-inner">
            <div className="text-center">
                <Loader type="ball-pulse-rise" />
            </div>
            <h6 className="mt-5">
                Please wait while we load all the Components examples
            </h6>
        </div>
    </div>
);
function PrivateRoute({ component: Component, authed, expiredTime, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authed === true) {
                    if (expiredTime) {
                        if (moment().isAfter(moment(expiredTime))) {
                            return <Redirect to="/pricing" />;
                        }
                    }
                    return <Component {...props} />;
                } else if (Common.getCookie(Configuration.userCookie) === "") {
                    return <Redirect to={"/login"} />;
                } else {
                    return <Redirect to={"/dashboards/home"} />;
                }
            }}
        />
    );
}

export const AppContext = React.createContext();

class AppProvider extends React.Component {
    state = {
        show: false,
        message: "",
        responesMessage: "",
        type: "success",
    };

    alert = {
        success: (title = "", message = "") => {
            this.setState({
                show: true,
                type: "success",
                message: title,
                responesMessage: message,
            });
        },
        error: (title = " ", message = "") => {
            this.setState({
                show: true,
                type: "error",
                message: title,
                responesMessage: message,
            });
        },
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    alert: this.alert,
                }}
            >
                {this.props.children}

                <SweetAlert
                    title={this.state.message}
                    confirmButtonColor=""
                    show={this.state.show}
                    text={this.state.responesMessage}
                    type={this.state.type}
                    onConfirm={() => {
                        // if (this.props.redirectPath) window.location.replace(props.redirectPath)
                        this.setState({
                            ...this.state,
                            show: false,
                        });
                    }}
                />
            </AppContext.Provider>
        );
    }
}

class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            authed: false,
            dataUser: {},
        };
    }

    componentDidMount() {}

    checkAuthentication(userType) {
        let tempType = userType.AllType;
        const userAllType = 1081633;

        if (Common.getCookie(Configuration.userCookie) !== "") {
            // check dang nhap
            if (
                (Configuration.userType.ADMIN & tempType) ===
                Configuration.userType.ADMIN
            ) {
                return true;
            } else if (tempType === userAllType) {
                return true;
            } else if (tempType === Configuration.userType.EDITOR) {
                let parentRouter = window.location.hash.split("/")[1];
                if (Configuration.routerEditor.includes(parentRouter)) {
                    return true;
                }
                return false;
            }
            return false;
        } else {
            return false;
        }
    }
    render() {
        let userType = this.props.infomationDataUser;
        console.log(userType);
        return (
            <AppProvider>
                <Fragment>
                    {Common.getCookie(Configuration.userCookie) !== "" ? (
                        // <HelpDesk />
                        <ThemeOptions />
                    ) : (
                        ""
                    )}

                    {/* Login */}
                    <Suspense fallback={TextLoading}>
                        <Route path="/login" component={Login} />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        <Route path="/pricing" component={ExpiredMerchant} />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        <Route path="/booking" component={Booking} />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        <Route
                            path="/setting-notification"
                            component={SettingNotification}
                        />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        <Route path="/form-builder" component={FormBuilder} />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        <Route
                            path="/product-evoucher"
                            component={ProductEvoucher}
                        />
                    </Suspense>

                    {/* User */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/user"
                            component={User}
                        />
                    </Suspense>

                    {/* Room Booking */}
                    {/* <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/room-booking"
                            component={RoomBooking}
                        />
                    </Suspense>
 */}
                    {/* User */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/attribute"
                            component={Attribute}
                        />
                    </Suspense>
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/address"
                            component={Address}
                        />
                    </Suspense>
                    {/* User */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/theme-template"
                            component={ThemeTemplate}
                        />
                    </Suspense>

                    {/* Video gallery */}
                    <Suspense
                        fallback={
                            <div className="loader-container">
                                <div className="loader-container-inner">
                                    <div className="text-center">
                                        <Loader type="ball-pulse-rise" />
                                    </div>
                                    <h6 className="mt-5">
                                        Please wait while we load all the
                                        Components examples
                                    </h6>
                                </div>
                            </div>
                        }
                    >
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/video-gallery"
                            component={VideoGallery}
                        />
                    </Suspense>

                    {/* Video gallery */}
                    <Suspense
                        fallback={
                            <div className="loader-container">
                                <div className="loader-container-inner">
                                    <div className="text-center">
                                        <Loader type="ball-pulse-rise" />
                                    </div>
                                    <h6 className="mt-5">
                                        Please wait while we load all the
                                        Components examples
                                    </h6>
                                </div>
                            </div>
                        }
                    >
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/rating"
                            component={Rating}
                        />
                    </Suspense>

                    {/* Books */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/books"
                            component={Books}
                        />
                    </Suspense>
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/course"
                            component={Course}
                        />
                    </Suspense>
                    {/* Slide */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/slide"
                            component={Slide}
                        />
                    </Suspense>

                    {/* VIDEO */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/video"
                            component={Video}
                        />
                    </Suspense>

                    {/* Navigation */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/navigation"
                            component={Navigation}
                        />
                    </Suspense>
                    {/* Quizz */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/quiz"
                            component={Quiz}
                        />
                    </Suspense>
                    {/* Quizz */}

                    {/* QuizVideo */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/quiz-video"
                            component={QuizVideo}
                        />
                    </Suspense>
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/events"
                            component={Events}
                        />
                    </Suspense>
                    {/* Report */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/navigation" component={Navigation} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/report"
                            component={Report}
                        />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/navigation" component={Navigation} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/order"
                            component={Order}
                        />
                    </Suspense>

                    {/* Email */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/email" component={Email} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/email"
                            component={Email}
                        />
                    </Suspense>

                    {/* Email */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/user-categories"
                            component={UserCategories}
                        />
                    </Suspense>
                         <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/member-categories"
                            component={MemberCategories}
                        />
                    </Suspense>

                    {/* categories */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/categories"
                            component={Categories}
                        />
                    </Suspense>

                    {/* theme */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/theme"
                            component={DashboardTheme}
                        />
                    </Suspense>

                    {/* Products */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/product"
                            component={Products}
                        />
                    </Suspense>

                    {/* Articles */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/articles" component={Articles} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            path="/articles"
                            component={Articles}
                        />
                    </Suspense>

                    {/* Gallery */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/gallery" component={Gallery} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/gallery"
                            component={Gallery}
                        />
                    </Suspense>

                    {/* Storage  */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/gallery" component={Gallery} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/storerage"
                            component={Storage}
                        />
                    </Suspense>

                    {/* Image Categories */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/image-categories" component={ImageCategories} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/image-categories"
                            component={ImageCategories}
                        />
                    </Suspense>
                       <Suspense fallback={TextLoading}>
                        {/* <Route path="/image-categories" component={ImageCategories} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/address-categories"
                            component={AddressCategories}
                        />
                    </Suspense>


                    {/* Product Categories */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/product-categories" component={ProductCategories} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/product-categories"
                            component={ProductCategories}
                        />
                    </Suspense>

                    {/* Components */}

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/components" component={Components} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/components"
                            //component={Components}
                        />
                    </Suspense>

                    {/* Dashboards */}

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/dashboards" component={Dashboards} /> */}

                        <PrivateRoute
                            authed={
                                Common.getCookie(Configuration.userCookie) !==
                                ""
                                    ? true
                                    : false
                            }
                            expiredTime={this.props.expiredTime}
                            path="/dashboards"
                            component={Dashboards}
                        />
                    </Suspense>

                    {/* Theme web */}

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/theme-web" component={ThemeWeb} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/theme-web"
                            component={ThemeWeb}
                        />
                    </Suspense>

                    {/* Setting */}

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/settings" component={Settings} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/settings"
                            component={Settings}
                        />
                    </Suspense>

                    {/* Promotion */}

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/settings" component={Settings} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/evoucher"
                            component={Evoucher}
                        />
                    </Suspense>

                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/settings" component={Settings} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/promotion"
                            component={Promotion}
                        />
                    </Suspense>

                    {/* Landing Page */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/landing-page"
                            component={LandingPage}
                        />
                    </Suspense>

                    {/* ProductMerchant */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/product-mechant"
                            component={ProductMerchant}
                        />
                    </Suspense>

                    {/* Merchant */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/merchant"
                            component={Merchant}
                        />
                    </Suspense>

                    {/* Contract */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/contract"
                            component={Contract}
                        />
                    </Suspense>

                    {/* Office Booking */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/office-booking"
                            component={OfficeBooking}
                        />
                    </Suspense>

                    {/* Product Member */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/product-member"
                            component={ProductMember}
                        />
                    </Suspense>

                    {/* User Point */}
                    <Suspense fallback={TextLoading}>
                        {/* <Route path="/landing-page" component={LandingPage} /> */}
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/user-point"
                            component={UserPoint}
                        />
                    </Suspense>

                    {/* Schedule */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/schedule"
                            component={Schedule}
                        />
                    </Suspense>

                    {/* Crm */}
                    <Suspense fallback={TextLoading}>
                        <PrivateRoute
                            authed={this.checkAuthentication(userType)}
                            expiredTime={this.props.expiredTime}
                            path="/crm"
                            component={Crm}
                        />
                    </Suspense>

                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/login" />}
                    />
                    <ToastContainer position="bottom-center" />
                </Fragment>
            </AppProvider>
        );
    }
}
function mapStateToProps(state) {
    return {
        authed: state.Partial.authed,
        infomationDataUser: state.Partial.infomationDataUser,
        expiredTime: state.System.expiredTime,
    };
}
const mapDispatchToProps = {
    updateInformationDateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
