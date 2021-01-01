import Common from './common'

const multilingual = {
  LIST: {
    en: 'List',
    vi: 'Danh sách',
  },
  CREATE: {
    en: 'Create',
    vi: 'Tạo mới',
  },
  DASHBOARD: {
    en: 'Dashboard',
    vi: 'Trang chủ',
  },
  NEWFEED: {
    en: 'Newfeed',
    vi: 'Bảng tin',
  },
  ReadPrivilege: {
    en: 'Read Privilege',
    vi: 'Danh sách quyền đọc',
  },
  Pictures: {
    en: 'Pictures',
    vi: 'Ảnh',
  },
  Upload: {
    en: 'Upload',
    vi: 'Tải ảnh',
  },
  CustomerCare: {
    en: 'Customer Care',
    vi: 'Chăm sóc',
  },
  SendedEmail: {
    en: 'Sended Emails',
    vi: 'Danh sách email đã gửi',
  },
  ConfigAndConnection: {
    en: 'Config And Connections',
    vi: 'Cài đặt và kết nối',
  },
  THEME: {
    en: 'Themes',
    vi: 'Giao diện',
  },
  ConfigTheme: {
    en: 'Config Theme',
    vi: 'Cài đặt Theme',
  },
  SUCCESS: {
    en: 'Success',
    vi: 'Thành công',
  },
  ERROR: {
    en: 'Something wrong happen',
    vi: 'Thất bại',
  },
  FASTACCESS: {
    en: 'Fast Access',
    vi: 'Truy cập nhanh',
  },
  CONTENT: {
    en: 'Content',
    vi: 'Nội dung',
  },
  SETTING: {
    en: 'Settings',
    vi: 'Cài đặt và kết nối',
  },
  MEDIA: {
    en: 'Media',
    vi: 'Truyền thông',
  },
  PICK_LANGUAGE: {
    en: 'Pick Language',
    vi: 'Chọn ngôn ngữ mặc định',
  },
  LANGUAGE: {
    en: 'Language',
    vi: 'Ngôn ngữ',
  },
  VIETNAMESE: {
    en: 'Vietmamese',
    vi: 'Tiếng Việt',
  },
  ENGLISH: {
    en: 'English',
    vi: 'Tiếng Anh',
  },
  INSTALL: {
    en: 'Install',
    vi: 'Cài đặt',
  },
  INSTALL_LANGUAGE: {
    en: 'Install Language',
    vi: 'Tải ngôn ngữ',
  },
  EMPTY: {
    en: 'Empty',
    vi: 'Trống',
  },
  REWARD: {
    en: 'Reward',
    vi: 'Quà tặng',
  },
  RESOURCES: {
    en: 'Resources',
    vi: 'Học liệu',
  },
  BOOKING: {
    en: 'Booking',
    vi: 'Đặt Lịch',
  },
  ECOMMERCE: {
    en: 'ECOMMERCE',
    vi: 'Thương mại điện tử',
  },
  USER: {
    en: 'USER',
    vi: 'Quản lý tài khoản',
  },
}

function text(word, langId) {
  if (multilingual[word] === undefined)
    throw new Error(`Không có từ ${word} trong từ điển`)
  if (!langId) langId = Common.getCookie('cmsLanguage')
  if (langId === '838aef56-78bb-11e6-b5a6-00155d582814')
    return multilingual[word].vi
  return multilingual[word].en
}

export default text
