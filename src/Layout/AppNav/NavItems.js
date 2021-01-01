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

const Report = [
  {
    icon: 'pe-7s-photo',
    label: 'Báo cáo',
    content: [
      {
        label: 'Đơn hàng',
        to: '/#/report/order',
      },
      {
        label: 'Đơn hàng dạng pivottable',
        to: '/#/report/orderpivot',
      },
      {
        label: 'Đơn hàng affiliate pivottable',
        to: '/#/report/orderaffiliate',
      },
    ],
  },
]
export const Notification = [
  {
    icon: 'pe-7s-settings',
    label: 'Thông báo',
    content: [
      {
        icon: 'pe-7s-menu',
        label: text('LIST'),
        to: '#/setting-notification/list',
      },
      {
        icon: 'pe-7s-plugin',
        label: text('CREATE'),
        to: '#/setting-notification/create',
      },
    ],
  },
]
export const Booking = [
  {
    icon: 'pe-7s-photo',
    label: 'Phòng họp',
    content: [
      {
        label: 'Đặt phòng',
        to: '/#/room-booking/rooms',
      },
      {
        label: 'Phân loại phòng',
        to: '/#/room-booking/room-category',
      },
    ],
  },
  {
    icon: 'pe-7s-photo',
    label: 'Office',
    content: [
      {
        label: 'Đặt phòng',
        to: '/#/office-booking/book',
      },
      {
        label: 'Hợp đồng',
        to: '/#/contract/list',
      },
    ],
  },
  {
    icon: 'pe-7s-wallet',
    label: 'Danh sách công nợ',
    to: '/#/order/listdebt',
  },
  {
    icon: 'pe-7s-config',
    label: 'Cài đặt',
    to: '/#/room-booking/setting/config',
  },
]

export const BookingClinic = [
  {
    icon: 'pe-7s-photo',
    label: 'Đặt lịch phòng khám ',
    content: [
      {
        label: 'Danh sách đặt lịch',
        to: '/#/booking',
      },
      {
        label: 'Cấu hình khung giờ đặt',
        to: '/#/booking/config',
      },
    ],
  },
]

export const VideoGallery = [
  {
    icon: 'pe-7s-photo',
    label: 'Đặt Lịch',
    content: [
      {
        label: 'Danh sách đặt lịch',
        to: '/#/booking',
      },
      {
        label: 'Cấu hình khung giờ đặt',
        to: '/#/booking/config',
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
  // {
  //     icon: 'pe-7s-note',
  //     label: "Sách",
  //     content: [
  //         {
  //             label: 'Danh sách',
  //             to: '#/books/list',
  //         },
  //         {
  //             label: 'Tạo mới',
  //             to: "#/books/create",
  //         },
  //         {
  //             label: 'Chuyên mục',
  //             to: "/#/books/categories",
  //         },
  //         {
  //             label: 'Tạo mới chuyên mục',
  //             to: "/#/books/categories/create",
  //         },
  //     ]

  // },
  // {
  //     icon: 'pe-7s-note',
  //     label: "Slide",
  //     content: [
  //         {
  //             label: 'Danh sách',
  //             to: '#/slide/list',
  //         },
  //         {
  //             label: 'Tạo mới',
  //             to: "#/slide/create",
  //         },
  //         {
  //             label: 'Chuyên mục',
  //             to: "/#/slide/categories",
  //         },
  //         {
  //             label: 'Tạo mới chuyên mục',
  //             to: "/#/slide/categories/create",
  //         },
  //     ]

  // },
  // {
  //     icon: 'pe-7s-note',
  //     label: "Video",
  //     content: [
  //         {
  //             label: 'Danh sách',
  //             to: '#/video/list',
  //         },
  //         {
  //             label: 'Tạo mới',
  //             to: "#/video/create",
  //         },
  //         {
  //             label: 'Chuyên mục',
  //             to: "/#/video/categories",
  //         },
  //         {
  //             label: 'Tạo mới chuyên mục',
  //             to: "/#/video/categories/create",
  //         },
  //     ]

  // },
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

      // {
      //     label: 'Album',
      //     to: "/#/image-categories/list",
      // },
      // {
      //     label: 'Tạo mới album',
      //     to: "/#/image-categories/create",
      // },
    ],
  },
  // {
  //     icon: 'pe-7s-photo',
  //     label: "Quiz",
  //     content: [
  //         {
  //             label: 'Danh sách Quiz',
  //             to: '/#/quiz/list',
  //         },
  //         {
  //             label: 'Tạo mới Quiz',
  //             to: "/#/quiz/create",
  //         },

  //     ]
  // },
  // {
  //     icon: 'pe-7s-photo',
  //     label: "Báo cáo",
  //     content: [
  //         {
  //             label: 'Đơn hàng',
  //             to: '/#/report/order',
  //         },
  //         {
  //             label: 'Danh sách report',
  //             to: '/#/report/list',
  //         },
  //     ]
  // },
]
export const MainNav = [
  {
    icon: 'pe-7s-home',
    label: text('DASHBOARD'),
    to: '#/dashboards/home',
  },
]
export const FormBuilder = [
  {
    icon: 'pe-7s-home',
    label: 'Tạo form',
    to: '#/form-builder/create',
  },
  {
    icon: 'pe-7s-rocket',
    label: text('LIST'),
    to: '#/form-builder/list',
  }, //,
  // {
  //     icon: 'pe-7s-display1',
  //     label: "Báo cáo form",
  //     content: [
  //         {
  //             label: 'Danh sách',
  //             to: '#/report/list',
  //         },
  //         // {
  //         //     label: 'Danh sách',
  //         //     to: '#/report/list',
  //         // },

  //     ]

  // },
]
export const Elearning = [
  {
    icon: 'pe-7s-study',
    label: 'Khóa học',
    content: [
      {
        label: 'Danh sách khóa học',
        to: '/#/course/v2/list',
      },
      {
        label: 'Tạo mới khóa học',
        to: '/#/course/v2/create',
      },
      // {
      //     icon: "pe-7s-light",
      //     label: "Bài học",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "#/course/lesson/list",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "#/course/lesson/create",
      //         },
      //     ],
      // },
      // {
      //     icon: "pe-7s-light",
      //     label: "Phân loại khóa học",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "/#/course/categories",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "/#/course/categories/create",
      //         },
      //     ],
      // },

      // {
      //     icon: "pe-7s-light",
      //     label: "Sản phẩm khóa học",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "/#/course/list",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "/#/course/create",
      //         },
      //     ],
      // },
    ],
  },
  {
    label: 'Học liệu chia sẻ',
    icon: 'pe-7s-refresh-2',
    content: [
      {
        label: 'Danh sách',
        to: '/#/course/categories',
      },
      {
        label: 'Tạo mới',
        to: '/#/course/categories/create',
      },
      {
        label: 'Phân quyền',
        to: '/#/course/read-privilege',
      },
      // {
      //     icon: "pe-7s-light",
      //     label: "Bài học",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "#/course/lesson/list",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "#/course/lesson/create",
      //         },
      //     ],
      // },
      // {
      //     icon: "pe-7s-light",
      //     label: "Nhóm học liệu chia sẻ",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "/#/course/categories",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "/#/course/categories/create",
      //         },
      //     ],
      // },

      // {
      //     icon: "pe-7s-light",
      //     label: "Sản phẩm khóa học",
      //     content: [
      //         {
      //             label: "Danh sách",
      //             to: "/#/course/list",
      //         },
      //         {
      //             label: "Tạo mới",
      //             to: "/#/course/create",
      //         },
      //     ],
      // },
    ],
  },
  {
    icon: 'pe-7s-note',
    label: 'Thư viện sách',
    content: [
      {
        label: 'Danh sách',
        to: '#/books/list',
      },
      {
        label: 'Tạo mới',
        to: '#/books/create',
      },
      {
        label: 'Phân loại',
        to: '#/books/categories',
      },
      {
        label: 'Tạo mới phân loại',
        to: '#/books/categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-photo-gallery',
    label: 'Thư viện slide bài giảng',
    content: [
      {
        label: 'Danh sách',
        to: '#/slide/list',
      },
      {
        label: 'Tạo mới',
        to: '#/slide/create',
      },
    ],
  },
  {
    icon: 'video pe-7s-video',
    label: 'Thư viện video bài giảng',
    content: [
      {
        label: 'Danh sách',
        to: '/#/video-gallery/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/video-gallery/create',
      },
      {
        label: 'Danh sách video kèm nội dung',
        to: '/#/video/list',
      },
      {
        label: 'Tạo mới video kèm nội dung',
        to: '/#/video/create',
      },
    ],
  },
  {
    icon: 'video pe-7s-video',
    label: 'Thư viện video Quiz',
    content: [
      // {
      //     label: "Danh sách",
      //     to: "/#/video-gallery/list",
      // },
      {
        label: 'Tạo mới',
        to: '/#/quiz-video/create',
      },
    ],
  },
  {
    icon: 'pe-7s-note2',
    label: 'Thư viện câu hỏi, kiểm tra',
    content: [
      {
        label: 'Danh sách',
        to: '/#/quiz/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/quiz/create',
      },
      {
        label: 'Danh sách kết quả',
        to: '/#/quiz/result',
      },
    ],
  }, //,
  //...Report,
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
  // {
  //     // icon: 'pe-7s-safe',
  //     // label: "Evoucher",
  //     // content: [
  //     //     {
  //     //         label: 'Danh sách Evoucher',
  //     //         to: '/#/evoucher/list',
  //     //     },
  //     //     {
  //     //         label: 'Tạo mới',
  //     //         to: "/#/evoucher/create",
  //     //     },
  //     //     {
  //     //         label: 'Kích hoạt Evoucher',
  //     //         to: "/#/evoucher/useevoucher",

  //     //     }
  //     //     // ,
  //     //     // {
  //     //     //     label: 'Evoucher đã sử dụng',
  //     //     //     to: "/#/evoucher/evoucherused",
  //     //     // }
  //     //     // ,
  //     //     // {
  //     //     //     label: 'Mã Evoucher được xuất bởi đơn hàng',
  //     //     //     to: "/#/evoucher/evouchersold",
  //     //     // },
  //     //     // {
  //     //     //     label: 'Mã Evoucher được xuất bởi thành viên',
  //     //     //     to: "/#/evoucher/evoucherbymem",
  //     //     // },
  //     //     // {
  //     //     //     label: 'Gene code',
  //     //     //     to: "/#/evoucher/generate-code",
  //     //     // },
  //     // ]
  // },
  // {
  //     icon: 'pe-7s-gift',
  //     label: "Khuyến mại",
  //     content: [
  //         {
  //             label: 'Tạo mới khuyến mại',
  //             to: "/#/promotion/create",
  //         },
  //         {
  //             label: 'Danh sách khuyến mại',
  //             to: '/#/promotion/list',
  //         }
  //         // ,
  //         // {
  //         //     label: 'Nhận mã giảm giá về Email',
  //         //     to: '/#/promotion/gettomail',
  //         // },

  //         // {
  //         //     label: 'Email đã gửi',
  //         //     to: "/#/email/sended/list",
  //         // },
  //     ]
  // },
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

export const SettingElearning = [
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
  ...Notification,
  {
    icon: 'pe-7s-star',
    label: 'Khóa học nâng cao',
    content: [
      {
        label: 'Cài đặt',
        to: '/#/',
      },
      {
        label: 'Liên hệ',
        to: '/#/',
      },
    ],
  },
  {
    icon: 'pe-7s-star',
    label: 'Địa chỉ',
    content: [
      {
        label: 'Danh sách',
        to: '/#/address/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/address/create',
      },
      {
        label: 'Danh sách phân loại',
        to: '/#/address-categories/list',
      },
      {
        label: 'Tạo mới phân loại',
        to: '/#/address-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-star',
    label: 'Thuộc tính của đối tượng',
    content: [
      {
        label: 'Danh sách',
        to: '/#/attribute/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/attribute/create',
      },
    ],
  },
]
export const SettingVacation = [
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
  ...Notification,
  {
    icon: 'pe-7s-star',
    label: 'Thuộc tính của đối tượng',
    content: [
      {
        label: 'Danh sách',
        to: '/#/attribute/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/attribute/create',
      },
    ],
  },
]

export const SettingCoworking = [
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
  ...Notification,
  {
    icon: 'pe-7s-star',
    label: 'Địa chỉ',
    content: [
      {
        label: 'Danh sách',
        to: '/#/address/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/address/create',
      },
      {
        label: 'Danh sách phân loại',
        to: '/#/address-categories/list',
      },
      {
        label: 'Tạo mới phân loại',
        to: '/#/address-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-star',
    label: 'Thuộc tính của đối tượng',
    content: [
      {
        label: 'Danh sách',
        to: '/#/attribute/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/attribute/create',
      },
    ],
  },
]

export const ElearningUserGuide = [
  {
    icon: 'pe-7s-help2',
    label: 'Hướng dẫn sử dụng',
    to: '/#/',
  },
  {
    icon: 'pe-7s-bookmarks',
    label: 'Khóa học mẫu',
    to: '/#/',
  },
  {
    icon: 'pe-7s-albums',
    label: 'Website mẫu',
    to: '/#/',
  },
  {
    icon: 'pe-7s-help1',
    label: 'Hỏi đáp',
    to: '/#/',
  },
]

export const SupportElearning = [
  {
    icon: 'pe-7s-headphones',
    label: 'Trợ giúp',
    to: '/#/',
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

export const Quiz = [
  {
    icon: 'pe-7s-photo-gallery',
    label: 'Quiz',
    to: '#/quiz/create',
  },
]

export const UserCategories = [
  {
    icon: 'pe-7s-albums',
    label: text('LIST'),
    to: '#/user-categories/list',
  },
  {
    icon: 'pe-7s-plus',
    label: text('CREATE'),
    to: '#/user-categories/create',
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

export const CurdNav = [
  {
    icon: 'pe-7s-display2',
    label: text('LIST'),
    to: '#/dashboards',
  },
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/dashboards',
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

export const Repository = [
  {
    icon: 'pe-7s-light',
    label: text('LIST'),
    to: '#/dashboards',
  },
  {
    icon: 'pe-7s-light',
    label: text('CREATE'),
    to: '#/dashboards',
  },
  {
    icon: 'pe-7s-light',
    label: 'Sản Phẩm Trong Kho',
    to: '#/dashboards',
  },
  {
    icon: 'pe-7s-light',
    label: 'danh sách phiếu',
    content: [
      {
        label: 'phiếu nhập',
        to: '#/dashboards',
      },
      {
        label: 'phiếu xuất',
        to: '#/dashboards',
      },
    ],
  },
  {
    icon: 'pe-7s-light',
    label: 'sản phẩm cần nhập kho',
    to: '#/dashboards',
  },
]

export const ThemeWeb = [
  {
    icon: 'pe-7s-display2',
    label: 'Theme Web',
    content: [
      {
        label: 'Danh sách',
        to: '#/theme-web/list',
      },
      {
        label: 'Tạo mới',
        to: '#/theme-web/create',
      },
      {
        label: 'Phân loại',
        to: '#/theme-web/categories/list',
      },
    ],
  },
  {
    icon: 'pe-7s-display2',
    label: 'Sections',
    content: [
      {
        label: 'Danh sách',
        to: '#/theme-web/list-section',
      },
      {
        label: 'Tạo mới',
        to: '#/theme-web/section/create',
      },
      {
        label: 'Phân loại',
        to: '#/theme-web/section/categories/list',
      },
    ],
  },
  {
    icon: 'pe-7s-display2',
    label: 'Theme template',
    content: [
      {
        label: 'Danh sách',
        to: '/#/theme-template/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/theme-template/create',
      },
      {
        label: 'Phân loại',
        to: '#/theme-template/categories/list',
      },
    ],
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

export const LandingPage = [
  {
    icon: 'pe-7s-photo-gallery',
    label: text('LIST'),
    to: '#/landing-page/list',
  },
  {
    icon: 'pe-7s-note',
    label: text('CREATE'),
    to: '#/landing-page/create',
  },
]
export const Email = [
  {
    icon: 'pe-7s-note2',
    label: text('LIST'),
    to: '#/email/list',
  },
  {
    icon: 'pe-7s-mail',
    label: text('SendedEmail'),
    to: '#/email/sended/list',
  },
  {
    icon: 'pe-7s-mail',
    label: text('CREATE'),
    to: '#/email/create',
  },
]

export const ReportElearning = [
  {
    icon: 'pe-7s-graph3',
    label: 'Báo cáo doanh thu',
    to: '/#/report/order',
  },
  {
    icon: 'pe-7s-id',
    label: 'Báo cáo học viên',
    to: '/#/',
  },
  {
    icon: 'pe-7s-display1',
    label: 'Báo cáo khóa học',
    to: '/#/',
  },
]

export const ReportCoworking = [
  {
    icon: 'pe-7s-graph3',
    label: 'Báo cáo doanh thu',
    to: '/#/report/order',
  },
]

export const Evoucher = [
  // ...Media,
  {
    icon: 'pe-7s-shopbag',
    label: 'Sản phẩm',
    content: [
      {
        label: 'Danh sách',
        to: '#/product/list',
      },
      {
        label: 'Phân loại',
        to: '#/product-categories/list',
      },
    ],
  },
  {
    icon: 'pe-7s-safe',
    label: 'E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/evoucher/create',
      },
      {
        label: 'Kích hoạt',
        to: '/#/evoucher/useevoucher',
      },
    ],
  },
  {
    icon: 'pe-7s-cart',
    label: 'Sản phẩm E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product-evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product-evoucher/create',
      },
    ],
  },
  {
    icon: 'pe-7s-plane',
    label: 'Sản phẩm kỳ nghỉ',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product/vacation/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product/vacation/create',
      },
    ],
  },
  {
    icon: 'pe-7s-plane',
    label: 'Sản phẩm thành viên',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product-member/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product-member/create',
      },
      {
        label: 'Danh sách hạng',
        to: '/#/member-categories/list',
      },
      {
        label: 'Tạo mới hạng',
        to: '/#/member-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-study',
    label: 'Sản phẩm khóa học',
    content: [
      {
        label: 'Danh sách',
        to: '/#/course/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/course/create',
      },
    ],
  },
  {
    icon: 'pe-7s-gift',
    label: 'Khuyến mại',
    content: [
      {
        label: 'Tạo mới khuyến mại',
        to: '/#/promotion/create',
      },
      {
        label: 'Danh sách khuyến mại',
        to: '/#/promotion/list',
      },
      // {
      //     label: "Nhận mã giảm giá về Email",
      //     to: "/#/promotion/gettomail",
      // },

      // {
      //     label: 'Email đã gửi',
      //     to: "/#/email/sended/list",
      // },
    ],
  },

  ...Order,
  // {
  //     icon: "pe-7s-settings",
  //     label: "Affiliate",
  //     to: "/#/report/setting",
  // },
]
export const Promotion = [
  {
    icon: 'pe-7s-note2',
    label: text('LIST'),
    to: '#/promotion/list',
  },
  {
    icon: 'pe-7s-mail',
    label: text('CREATE'),
    to: '#/promotion/create',
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
export const Ecommerce = [...Evoucher]

export const EcommerceCoworking = [
  {
    icon: 'pe-7s-shopbag',
    label: 'Sản phẩm',
    content: [
      {
        label: 'Danh sách',
        to: '#/product/list',
      },
      {
        label: 'Phân loại',
        to: '#/product-categories/list',
      },
    ],
  },
  {
    icon: 'pe-7s-safe',
    label: 'E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/evoucher/create',
      },
      {
        label: 'Kích hoạt',
        to: '/#/evoucher/useevoucher',
      },
    ],
  },
  {
    icon: 'pe-7s-cart',
    label: 'Sản phẩm E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product-evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product-evoucher/create',
      },
    ],
  },
  {
    icon: 'pe-7s-gift',
    label: 'Khuyến mại',
    content: [
      {
        label: 'Tạo mới khuyến mại',
        to: '/#/promotion/create',
      },
      {
        label: 'Danh sách khuyến mại',
        to: '/#/promotion/list',
      },
      // {
      //     label: "Nhận mã giảm giá về Email",
      //     to: "/#/promotion/gettomail",
      // },

      // {
      //     label: 'Email đã gửi',
      //     to: "/#/email/sended/list",
      // },
    ],
  },

  ...Order,
]
export const EcommerceVacation = [
  {
    icon: 'pe-7s-map-marker',
    label: 'Địa chỉ khách sạn',
    content: [
      {
        label: 'Danh sách',
        to: '/#/address/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/address/create',
      },
      {
        label: 'Danh sách phân loại',
        to: '/#/address-categories/list',
      },
      {
        label: 'Tạo mới phân loại',
        to: '/#/address-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-plane',
    label: 'Sản phẩm kỳ nghỉ',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product/vacation/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product/vacation/create',
      },
    ],
  },
  {
    icon: 'pe-7s-diamond',
    label: 'Sản phẩm thành viên',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product-member/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product-member/create',
      },
      {
        label: 'Danh sách hạng',
        to: '/#/member-categories/list',
      },
      {
        label: 'Tạo mới hạng',
        to: '/#/member-categories/create',
      },
    ],
  },
  {
    icon: 'pe-7s-shopbag',
    label: 'Sản phẩm',
    content: [
      {
        label: 'Danh sách',
        to: '#/product/list',
      },
      {
        label: 'Phân loại',
        to: '#/product-categories/list',
      },
    ],
  },
  {
    icon: 'pe-7s-safe',
    label: 'E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/evoucher/create',
      },
      {
        label: 'Kích hoạt',
        to: '/#/evoucher/useevoucher',
      },
    ],
  },
  {
    icon: 'pe-7s-cart',
    label: 'Sản phẩm E-Voucher',
    content: [
      {
        label: 'Danh sách',
        to: '/#/product-evoucher/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/product-evoucher/create',
      },
    ],
  },
  {
    icon: 'pe-7s-gift',
    label: 'Khuyến mại',
    content: [
      {
        label: 'Tạo mới khuyến mại',
        to: '/#/promotion/create',
      },
      {
        label: 'Danh sách khuyến mại',
        to: '/#/promotion/list',
      },
      // {
      //     label: "Nhận mã giảm giá về Email",
      //     to: "/#/promotion/gettomail",
      // },

      // {
      //     label: 'Email đã gửi',
      //     to: "/#/email/sended/list",
      // },
    ],
  },

  ...Order,
]

export const CustomerRelationshipManagement = [
  {
    icon: 'pe-7s-map-marker',
    label: 'Bảng Kanban',
    content: [
      {
        label: 'Danh sách',
        to: '/#/crm/kanban/list',
      },
      {
        label: 'Tạo mới',
        to: '/#/crm/kanban/create',
      },
    ],
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
