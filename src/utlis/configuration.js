import Common from "./common";
import text from "./text";

const Configuration = {
    googleMapApiKey: "AIzaSyCotFeTTdmEzjeVdx1_eAI4-mkfy73jgd8",
    merchantLocal: "",
    url_api: "",
    merchantCode: "merchantCode",
    languageCode: "langauageCode",
    userCookie: "tokenId",
    userId: "userId",
    merchantId: "merchantId",
    tokenLanguage: "cmsLanguage",
    tokenNewMerchant: "newMerchant",
    url_graphQl: "",
    languageVi: "838aef56-78bb-11e6-b5a6-00155d582814",
    image_url: "",
    image_upload_url: "",
    MAX_FILE_SIZE: 512000,
    //MAX_FILE_SIZE_BOOK: 4194304, //4MB
    MAX_FILE_SIZE_BOOK: 104857600, //4MB
    sampleUserExcelLink:
        "",
    domain: ".labo.io",
    https: "https://",
    helpDeskMerchantId: "74d84561-4925-4b13-9e5c-0137bea8afcd",
    libraryMerchantId: "ebd5cacf-c5f5-4ad2-975d-7ed5a21f45de",
    defaultImg:
        "",
    iframePreview: "https://" + Common.getCookie("merchantCode") + ".labo.io",
    linkNav: {
        categories: function({ id, name }) {
            return `/danh-sach-bai-viet/${id}/${Common.rewriteUrl(name)}`;
        },
        articles: function({ id, name }) {
            return `/bai-viet/${id}/${Common.rewriteUrl(name)}`;
        },
    },
    merchantPackageType: {
        MerchantPackageCms: 256,
        MerchantPackageElearn: 1024,
    },
    courseType: {
        DEFAULT: {
            value: 1,
            name: "Mặc định",
        },
        SEQUENCE: {
            value: 64,
            name: "Tuần tự",
        },
        TIME_TABLE: {
            value: 4,
            name: "Điều kiện thời gian",
        },
        CONDITION_QUIZ: {
            value: 16,
            name: "Điều kiện kiểm tra",
        },
    },
    statusContract: {
        CREATED: 1,
        PROCESS: 32,
        TIMEOUT: 256,
        CUSTOMER_CONFIRM: 1024,
        MERCHANT_CONFIRM: 4096,
        FAILED: 32768,
        CLOSED: 1048576,
    },
    statusOrder: {
        SUCCESS: 1048576,
        FAIL: 32768,
        PROCESS: 32,
        DEFAULT: 1,
    },
    statusDelivery: {
        SUCCESS: 1048576,
        FAIL: 32768,
        TIMEOUT: 1024,
        PROCESS: 32,
        DEFAULT: 1,
    },
    statusPayment: {
        REFUNDED: 1073741824,
        SUCCESS: 33554432,
        FAIL: 1048576,
        TIMEOUT: 32768,
        PROCESS: 32,
        DEFAULT: 1,
    },
    typeActionForm: {
        emailResult: 1,
        subscribeToAList: Math.pow(2, 2),
        rawData: Math.pow(2, 4),
        emailReturn: Math.pow(2, 6),
        useEvoucher: Math.pow(2, 8),
        smsReturn: Math.pow(2, 10),
    },
    typeOnSubmit: {
        ShowThankYou: 1,
        OpenUrl: Math.pow(2, 5),
    },

    categoryTypes: {
        ADDRESS: 1,
        ARTICLE: 2,
        PRODUCT: 3,
        CUSTOMER: 4,
        BOOK: 8,
        CART: 10,
        HOME_PAGE: 32,
        IMAGE: 64,
        TEMPLATE: 128,
        MENU: 256,
        COURSE: 512,
        ORDER: 1024,
        ROOM_BOOKING: 2048,
        TAGS: 32768,
        THEME_WEB: 4096,
        THEME_WEB_SECTION: 16384,
        THEME_WEB_TEMPLATE: 8192,
        MEMBERSHIP: 131072,
        KANBAN: 262144,
    },
    FileTypes: {
        UNDEFINED: 1,
        BOOK: 4,
        VIDEO: 16,
    },
    UserTypes: {
        DEFAULT: Math.pow(2, 0),
        MOD: Math.pow(2, 15),
        ADMIN: Math.pow(2, 20),
    },
    StorageTypes: {
        OWNER: 1,
        YOUTUBE: 4,
        VIMEO: 16,
    },
    ProductTypes: {
        Undefined: 0,
        None: 1,
        EVoucher: 8,
        Course: 32,
        MerchantPackage: 256,
        RoomBooking: 2048,
        OfficeBooking: 4096,
        Vacation: 16384,
        Card: 32768,
    },
    // articleType: {
    //   ARTICLE: {
    //     type: 0,
    //     categoryType: 2,
    //     commandCreate: "CreateArticleVersion01",
    //     commandUpdate: "UpdateInformationArticleVersion01"
    //   },
    //   BOOK: {
    //     type: 5,
    //     categoryType: 8,
    //     // categoryType: 8,
    //     commandCreate: "CreateBookArticle",
    //     commandUpdate: "UpdateInformationBookArticle"
    //   },
    //   SLIDE: {
    //     type: 7,
    //     categoryType: 512,// Configuration.categoryTypes.COURSE,
    //     // categoryType: 16,
    //     commandCreate: "CreateSlideArticle",
    //     commandUpdate: "UpdateInformationSlideArticle"
    //   },
    //   VIDEO: {
    //     type: 32,
    //     categoryType: 512,// Configuration.categoryTypes.COURSE,
    //     // categoryType: 18,
    //     commandCreate: "CreateVideoArticle",
    //     commandUpdate: "UpdateInformationVideoArticle"
    //   },
    // },
    pages: function({ id, name }) {
        return `/pages/${id}/${Common.rewriteUrl(name)}`;
    },

    articleType: {
        ARTICLE: {
            type: 0,
            categoryType: 2,
            commandCreate: "CreateArticleVersion01",
            commandUpdate: "UpdateInformationArticleVersion01",
            name: "Bài viết",
        },
        BOOK: {
            type: 5,
            categoryType: 8,
            // categoryType: 8,
            commandCreate: "CreateBookArticle",
            commandUpdate: "UpdateInformationBookArticle",
            name: "Sách",
        },
        SLIDE: {
            type: 7,
            categoryType: 512, // Configuration.categoryTypes.COURSE,
            // categoryType: 16,
            commandCreate: "CreateSlideArticle",
            commandUpdate: "UpdateInformationSlideArticle",
            name: "Slide",
        },
        VIDEO: {
            type: 32,
            categoryType: 512, // Configuration.categoryTypes.COURSE,
            // categoryType: 18,
            commandCreate: "CreateVideoArticle",
            commandUpdate: "UpdateInformationVideoArticle",
            name: "Video",
        },
        ProductTypes: {
            Undefined: 0,
            None: 1,
            EVoucher: 8,
            Course: 32,
            MerchantPackage: 256,
            RoomBooking: 2048,
            OfficeBooking: 4096,
            Vacation: 16384,
        },
        THEME_WEB_TEMPLATE: {
            type: 8192,
            categoryType: 8192,
            name: "Template theme",
            // commandCreate: "CreateVideoArticle",
            // commandUpdate: "UpdateInformationVideoArticle",
        },
    },
    stateVideo: {
        UNSTARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
        VIDEO_CUED: 5,
    },
    answerType: {
        trueFalse: {
            type: Math.pow(2, 0),
            name: "True/False",
        },
        multiChoice: {
            type: Math.pow(2, 1),
            name: "Multiple Choice",
        },
        multiAnswer: {
            type: Math.pow(2, 2),
            name: "Multiple Answer",
        },
        shortAnswer: {
            type: Math.pow(2, 3),
            name: "Short Answer",
        },
        fillInTheBank: {
            type: Math.pow(2, 4),
            name: "Fill in the Blanks",
        },
    },
    questionType: [
        { type: Math.pow(2, 0), value: "trueFalse", text: "True/False" },
        { type: Math.pow(2, 1), value: "multiChoice", text: "Multiple Choice" },
        { type: Math.pow(2, 2), value: "multiAnswer", text: "Multiple Answer" },
        { type: Math.pow(2, 3), value: "shortAnswer", text: "Short Answer" },
        {
            type: Math.pow(2, 4),
            value: "fillInTheBank",
            text: "Fill in the Blanks",
        },
        { type: Math.pow(2, 5), value: "matching", text: "Matching" },
    ],
    // questionType: {
    //     TF: "trueFalse",
    //     MC: "multiChoice",
    //     MA: "multiAnswer",
    //     SA: "shortAnswer",
    //     FIB: "fillInTheBank",
    //     Matching: "matching",
    // },
    merchantType: {
        normal: 1,
        full: 32,
        reward: 128,
        elearning: 512,
        content: 1024,
        admin: 2048,
        vacation: 4096,
        coworking: 8192,
    },
    editorConfiguration: {
        allowedContent: true,
        // extraPlugins: "language"
    },
    allLanguage: [
        {
            label: text("VIETNAMESE"),
            value: "838aef56-78bb-11e6-b5a6-00155d582814",
        },
        {
            label: text("ENGLISH"),
            value: "e3509252-c42d-4ae5-9779-d4805a687a8e",
        },
    ],
    scriptUrlCke: "https://static.foodizzi.com/Templates/ckeditor/ckeditor.js",

    sectionsType: {
        HEADER: Math.pow(2, 0),
        SIDE_BAR_LEFT: Math.pow(2, 2),
        SIDE_BAR_RIGHT: Math.pow(2, 4),
        FOOTER: Math.pow(2, 6),
        BODY_HOME: Math.pow(2, 8),
        BODY_ARTICLES: Math.pow(2, 10),
        BODY_ARTICLE: Math.pow(2, 12),
        BODY_PRODUCTS: Math.pow(2, 14),
        BODY_PRODUCT: Math.pow(2, 16),
        BODY_PAGE: Math.pow(2, 18),
    },
    userType: {
        DEFAULT: Math.pow(2, 0),
        // STAFF: Math.pow(2, 5),
        AUTHOR: Math.pow(2, 6),
        EDITOR: Math.pow(2, 8),
        // MOD: Math.pow(2, 15),
        ADMIN: Math.pow(2, 20),
    },
    routerEditor: [
        "categories",
        "product-categories",
        "product",
        "articles",
        "gallery",
        "image-categories",
        "product-categories",
    ],
    toast_information: {
        LOAD_DATA_SUCCESS: function(numRow, cate) {
            if (cate == undefined) cate = "";
            if (numRow == undefined) numRow = "";
            return `Tải thành công ${numRow} bản ghi ${cate} từ máy chủ`;
        },
        SUCCESS: "Thành công",
        LOAD_DATA_ERROR: "Tải dữ liệu không thành công",
        ERROR: function(error) {
            return `Có lỗi xảy ra: ${error + ""}`;
        },
        CHANGE_STATUS_SUCCESS: "Đổi trạng thái thành công",
    },
};

export default Configuration;
