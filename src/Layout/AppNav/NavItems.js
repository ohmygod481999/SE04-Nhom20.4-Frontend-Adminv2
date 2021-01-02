import text from '../../utils/text'

export const Admin = [
  {
    icon: 'pe-7s-shopbag',
    label: 'Gói merchant',
    to: '#/product-mechant/list',
  },
  {
    icon: 'pe-7s-network',
    label: 'Danh sách merchant',
    to: '#/merchant/list',
  },
]

const Order = [
  {
    icon: 'pe-7s-play',
    label: 'Đơn hàng',
    content: [
      {
        label: 'Danh sách đơn hàng',
        to: '/#/report/order',
      },
      {
        label: 'Luồng đơn hàng',
        to: '/#/order/list',
      },
      {
        label: 'Đơn hàng dạng pivottable',
        to: '/#/report/orderpivot',
      },
    ],
  },
]


export const Content = [
  {
    icon: 'pe-7s-note',
    label: 'Bài viết',
    content: [
      {
        label: 'Danh sách bài viết',
        to: '#/articles/list',
      },
      {
        label: 'Tạo mới bài viết',
        to: '#/articles/create',
      },
      {
        label: 'Danh sách chuyên mục',
        to: '/#/articles/categories/list',
      },
      {
        label: 'Tạo mới chuyên mục',
        to: '/#/articles/categories/create',
      },
      {
        label: 'Quyền đọc chuyên mục',
        to: '/#/articles/read-privilege',
      },
    ],
  },
  
  {
    icon: 'pe-7s-cart',
    label: 'Sản phẩm',
    content: [
      {
        label: 'Danh sách sản phẩm',
        to: '/#/product/list',
      },
      {
        label: 'Tạo mới sản phẩm',
        to: '/#/product/create',
      },
      {
        label: 'Danh mục',
        to: '/#/product-categories/list',
      },
      {
        label: 'Tạo mới danh mục',
        to: '/#/product-categories/create',
      },
      {
        icon: 'pe-7s-light',
        label: 'Thuộc tính sản phẩm',
        content: [
          {
            label: 'Danh sách',
            to: '#/attribute/list',
          },
          {
            label: 'Tạo mới',
            to: '#/attribute/create',
          },
        ],
      },
    ],
  },
  {
    icon: 'pe-7s-photo',
    label: 'Thư viện ảnh',
    content: [
      {
        label: 'Thư viện',
        to: '/#/gallery/list',
      },
      {
        label: 'Tải lên',
        to: '/#/gallery/upload',
      },
      {
        label: 'Album',
        to: '/#/image-categories/list',
      },
      {
        label: 'Tạo mới album',
        to: '/#/image-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-photo',
    label: 'Thư viện video',
    content: [
      {
        label: 'Thư viện',
        to: '/#/video-gallery/list',
      },
      {
        label: 'Tải lên',
        to: '/#/video-gallery/create',
      },
      {
        label: 'Danh sách',
        to: '#/video/list',
      },
      {
        label: 'Tạo mới',
        to: '#/video/create',
      },

    ],
  },
]
export const MainNav = [
  {
    icon: 'pe-7s-home',
    label: text('DASHBOARD'),
    to: '#/dashboards/home',
  },
]

export const ContentNotReport = [
  {
    icon: 'pe-7s-note',
    label: 'Bài viết',
    content: [
      {
        label: 'Danh sách bài viết',
        to: '#/articles/list',
      },
      {
        label: 'Tạo mới bài viết',
        to: '#/articles/create',
      },
      {
        label: 'Danh sách chuyên mục',
        to: '/#/Categories/list',
      },
      {
        label: 'Tạo mới chuyên mục',
        to: '/#/Categories/create',
      },
      {
        label: 'Quyền đọc chuyên mục',
        to: '/#/articles/read-privilege',
      },
    ],
  },
  {
    icon: 'pe-7s-cart',
    label: 'Sản phẩm',
    content: [
      {
        label: 'Danh sách sản phẩm',
        to: '/#/product/list',
      },
      {
        label: 'Tạo mới sản phẩm',
        to: '/#/product/create',
      },
      {
        label: 'Danh mục',
        to: '/#/product-categories/list',
      },
      {
        label: 'Tạo mới danh mục',
        to: '/#/product-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-photo',
    label: 'Thư viện ảnh',
    content: [
      {
        label: 'Thư viện',
        to: '/#/gallery/list',
      },
      {
        label: 'Tải lên',
        to: '/#/gallery/upload',
      },
      {
        label: 'Album',
        to: '/#/image-categories/list',
      },
      {
        label: 'Tạo mới album',
        to: '/#/image-categories/create',
      },
    ],
  },
]

export const Media = [
  {
    icon: 'pe-7s-users',
    label: 'Thành viên',
    content: [
      {
        label: 'Danh sách thành viên',
        to: '/#/user/list',
      },
      {
        label: 'Tạo mới thành viên',
        to: '/#/user/create',
      },
      {
        label: 'Nhóm thành viên',
        to: '/#/user-categories/list',
      },
      {
        label: 'Tạo mới nhóm',
        to: '/#/user-categories/create',
      },
      {
        label: 'Chăm sóc',
        to: '/#/user/kanban',
      },
    ],
  },
  {
    icon: 'pe-7s-mail',
    label: 'Email',
    content: [
      {
        label: 'Danh sách Email',
        to: '/#/email/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/email/create',
      },
      // {
      //     label: 'Email mẫu',
      //     to: "/#/email/list",
      // },
      {
        label: 'Email đã gửi',
        to: '/#/email/sended/list',
      },
    ],
  },
]
export const MediaNotUser = [
  {
    icon: 'pe-7s-mail',
    label: 'Email',
    content: [
      {
        label: 'Danh sách Email',
        to: '/#/email/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/email/create',
      },
      // {
      //     label: 'Email mẫu',
      //     to: "/#/email/list",
      // },
      {
        label: 'Email đã gửi',
        to: '/#/email/sended/list',
      },
    ],
  },
  {
    icon: 'pe-7s-mail',
    label: 'Evoucher',
    content: [
      {
        label: 'Danh sách Evoucher',
        to: '/#/evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/evoucher/create',
      },
      {
        label: 'Kích hoạt Evoucher',
        to: '/#/evoucher/useevoucher',
      },
      // {
      //     label: 'Gene code',
      //     to: "/#/evoucher/generate-code",
      // },
    ],
  },
]

export const Web = [
  {
    icon: 'pe-7s-paint-bucket',
    label: 'Giao diện',
    content: [
      {
        label: 'Thư viện giao diện',
        to: '/#/settings/theme',
      },
      {
        label: 'Tùy chỉnh giao diện',
        to: '/#/theme',
      },
    ],
  },
  {
    icon: 'pe-7s-photo-gallery',
    label: 'Trang',
    content: [
      {
        label: 'Danh sách',
        to: '/#/landing-page/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/landing-page/create',
      },
    ],
  },
  {
    icon: 'pe-7s-menu',
    label: 'Thanh điều hướng',
    to: '/#/navigation/list',
  },
  {
    icon: 'pe-7s-note',
    label: 'Bài viết',
    content: [
      {
        label: 'Danh sách',
        to: '#/articles/list',
      },
      {
        label: 'Tạo mới',
        to: '#/articles/create',
      },
      {
        label: 'Chuyên mục',
        to: '/#/Categories/list',
      },
      {
        label: 'Tạo mới chuyên mục',
        to: '/#/Categories/create',
      },
      {
        label: 'Quyền đọc chuyên mục',
        to: '/#/articles/read-privilege',
      },
    ],
  },
  {
    icon: 'pe-7s-photo',
    label: 'Thư viện ảnh',
    content: [
      {
        label: 'Danh sách',
        to: '/#/gallery/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/gallery/upload',
      },
      {
        label: 'Thư mục',
        to: '/#/image-categories/list',
      },
      {
        label: 'Tạo mới thư mục',
        to: '/#/image-categories/create',
      },
    ],
  },
]

export const Marketing = [
  {
    icon: 'pe-7s-link',
    label: 'Tiếp thị liên kết',
    content: [
      {
        label: 'Cài đặt',
        to: '/#/report/setting',
      },
      {
        label: 'Báo cáo',
        to: '/#/report/orderaffiliate',
      },
      {
        label: 'Liên hệ',
        to: '/#/',
      },
    ],
  },
  {
    icon: 'pe-7s-mail',
    label: 'Email',
    content: [
      {
        icon: 'pe-7s-mail-open',
        label: text('LIST'),
        to: '#/email/list',
      },
      {
        icon: 'pe-7s-mail-open-file',
        label: text('SendedEmail'),
        to: '#/email/sended/list',
      },
      {
        icon: 'pe-7s-mail',
        label: text('CREATE'),
        to: '#/email/create',
      },
    ],
  },
  {
    icon: 'pe-7s-note2',
    label: 'Biểu mẫu',
    content: [
      {
        icon: 'pe-7s-rocket',
        label: text('LIST'),
        to: '#/form-builder/list',
      },
      {
        icon: 'pe-7s-home',
        label: 'Tạo mới',
        to: '#/form-builder/create',
      },
    ],
  },
  {
    icon: 'pe-7s-map-marker',
    label: 'Sự kiện',
    content: [
      {
        label: 'Danh sách',
        to: '/#/events/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/events/create',
      },
    ],
  },
]

export const Theme = [
  {
    icon: 'pe-7s-photo-gallery',
    label: 'Trang',
    content: [
      {
        label: 'Danh sách',
        to: '/#/landing-page/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/landing-page/create',
      },
      {
        label: 'Chỉnh sửa trực tiếp',
        to: '/#/theme',
      },
    ],
  },
  {
    icon: 'pe-7s-menu',
    label: 'Thanh điều hướng',
    content: [
      {
        label: 'Danh sách',
        to: '/#/navigation/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/navigation/create',
      },
    ],
  },
  {
    icon: 'pe-7s-display1',
    label: 'Thư viện giao diện',
    to: '/#/settings/theme',
    // content: [
    //     {
    //         label: 'Danh sách',
    //         to: "/#/email/create",
    //     },
    //     {
    //         label: 'Tạo mới',
    //         to: "/#/email/list",
    //     },
    //     {
    //         label: 'Cài đặt',
    //         to: "/#/email/sended/list",
    //     },
    // ]
  },
]

export const Config = [
  {
    icon: 'pe-7s-config',
    label: 'Cài đặt chung',
    to: '/#/settings/config-merchant',
  },
  {
    icon: 'pe-7s-share',
    label: 'Kết nối',
    to: '/#/settings/service-connectivites',
  },
  {
    icon: 'pe-7s-browser',
    label: 'Cài đặt trang học viên',
    to: '/#/settings/config-elearning',
  },
  {
    icon: 'pe-7s-browser',
    label: 'Cài đặt thuộc tính',
    to: '/#/attribute/list',
  },
  ...Notification,
  {
    icon: 'pe-7s-star',
    label: 'Rating',
    content: [
      {
        label: 'Danh sách',
        to: '/#/rating/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/rating/create',
      },
    ],
  },
]


export const ConfigNotRole = [
  {
    icon: 'pe-7s-config',
    label: 'Cài đặt chung',
    to: '/#/settings/config-merchant',
  },
  {
    icon: 'pe-7s-share',
    label: 'Kết nối',
    to: '/#/settings/service-connectivites',
  },
]

export const Articles = [
  {
    icon: 'pe-7s-photo-gallery',
    label: text('LIST'),
    to: '#/articles/list',
  },
  {
    icon: 'pe-7s-note',
    label: text('CREATE'),
    to: '#/articles/create',
  },
  {
    icon: 'pe-7s-note',
    label: text('ReadPrivilege'),
    to: '#/articles/read-privilege',
  },
]


export const Categories = [
  {
    icon: 'pe-7s-display2',
    label: text('LIST'),
    to: '#/Categories/list',
  },
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/Categories/create',
  },
]

export const Products = [
  {
    icon: 'pe-7s-display2',
    label: text('LIST'),
    to: '#/Products/list',
  },
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/Products/create',
  },
]


export const Gallery = [
  {
    icon: 'pe-7s-graph2',
    label: text('Pictures'),
    to: '#/gallery/list',
  },
  {
    icon: 'pe-7s-light',
    label: text('Upload'),
    to: '#/gallery/upload',
  },
]

export const ImageCategory = [
  {
    icon: 'pe-7s-graph2',
    label: text('LIST'),
    to: '#/image-categories/list',
  },
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/image-categories/create',
  },
]


export const Setting = [
  {
    icon: 'pe-7s-settings',
    label: text('ConfigAndConnection'),
    to: '#/settings/config-merchant',
  },
  {
    icon: 'pe-7s-paper-plane',
    label: text('THEME'),
    to: '#/settings/theme',
  },
  {
    icon: 'pe-7s-news-paper',
    label: text('ConfigTheme'),
    to: '#/theme',
    // id: "configTheme"
  },
]

export const Users = [
  {
    icon: 'pe-7s-user',
    label: 'Danh sách tài khoản',
    to: '#/user/list',
  },
  {
    icon: 'pe-7s-add-user',
    label: 'Tạo mới tài khoản',
    to: '#/user/create',
  },
  {
    icon: 'pe-7s-users',
    label: 'Phân loại',
    to: '#/user-categories/list',
  },
  {
    icon: 'pe-7s-add-user',
    label: 'Tạo mới phân loại',
    to: '#/user-categories/create',
  },
  // {
  //     icon: "pe-7s-next-2",
  //     label: text("CustomerCare"),
  //     to: "#/user/kanban",
  // },
]

export const Navigation = [
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/navigation/create',
  },
  {
    icon: 'pe-7s-light',
    label: text('LIST'),
    to: '#/navigation/list',
    // id: "configTheme"
  },
]

export const Product = [
  {
    icon: 'pe-7s-menu',
    label: text('LIST'),
    to: '#/product/list',
  },
  {
    icon: 'pe-7s-plugin',
    label: text('CREATE'),
    to: '#/product/create',
  },
]

export const ProductCategories = [
  {
    icon: 'pe-7s-menu',
    label: text('LIST'),
    to: '#/product-categories/list',
  },
  {
    icon: 'pe-7s-plugin',
    label: text('CREATE'),
    to: '#/product-categories/create',
  },
]


// export const Report = [
//     {
//         icon: 'pe-7s-photo',
//         label: "Báo cáo",
//         content: [
//             {
//                 label: 'Đơn hàng',
//                 to: '/#/report/order',
//             },
//             {
//                 label: 'Danh sách report',
//                 to: '/#/report/list',
//             },
//         ]
//     },
// ]

// export const WidgetsNav = [
//     {
//         icon: 'pe-7s-graph2',
//         label: 'Chart Boxes',
//         content: [
//             {
//                 label: 'Variation 1',
//                 to: '#/widgets/chart-boxes',
//             },
//             {
//                 label: 'Variation 2',
//                 to: '#/widgets/chart-boxes-2',
//             },
//             {
//                 label: 'Variation 3',
//                 to: '#/widgets/chart-boxes-3',
//             },
//         ]
//     },
//     {
//         icon: 'pe-7s-id',
//         label: 'Profile Boxes',
//         to: '#/widgets/profile-boxes',
//     },
//     {
//         icon: 'pe-7s-display1',
//         label: 'Content Boxes',
//         to: '#/widgets/content-boxes',
//     },
// ];
// export const ChartsNav = [
//     {
//         icon: 'pe-7s-graph2',
//         label: 'ChartJS',
//         to: '#/charts/chartjs',
//     },
//     {
//         icon: 'pe-7s-graph',
//         label: 'Apex Charts',
//         to: '#/charts/apexcharts',
//     },
//     {
//         icon: 'pe-7s-gleam',
//         label: 'Gauges',
//         to: '#/charts/gauges',
//     },
//     {
//         icon: 'pe-7s-graph1',
//         label: 'Chart Sparklines 1',
//         to: '#/charts/sparklines-1',
//     },
//     {
//         icon: 'pe-7s-edit',
//         label: 'Chart Sparklines 2',
//         to: '#/charts/sparklines-2',
//     },
// ];
