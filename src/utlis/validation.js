import React from 'react'

export const FormFeedback = ({ value }) => (
  <small className="form-text text-danger">{value}</small>
)

const Validation = {
  // required : (value) => {
  //     if (isEmpty(value)) {
  //         return <FormFeedback value={"Trường này không được để trống"}/>;
  //     }
  // },
  // email : (value) => {
  //     if (!isEmail(value)) {
  //         return <FormFeedback value={"Email không hợp lệ"} />;
  //     }
  // },
  // max_256_characters : (value) => {
  //     if (!isLength(value, {max: 256})) {
  //         return <FormFeedback value={"Tối thiếu 256 ký tự"} />;
  //     }
  // },

  // notNull: function(str) {
  //     if (str === undefined || str.length == 0) return {
  //         status: true,
  //         message: "Khong dc null"
  //     }
  //     return {
  //         status: false,
  //         message: ""
  //     }
  // },
  // notNullAndMinSixChar: function(str) {
  //     if (str === undefined || str.length == 0) return {
  //         status: true,
  //         message: "Khong dc null"
  //     }
  //     if (str.length <= 6) return {
  //         status: true,
  //         message: "Nho hon 6 ky tu"
  //     }
  //     return {
  //         status: false,
  //         message: ""
  //     }
  // },
  notEmpty: {
    required: {
      value: true,
      errorMessage: 'Trường này không được để trống',
    },
  },
  notEmptyAndMax: (max) => ({
    required: {
      value: true,
      errorMessage: 'Trường này không được để trống',
    },
    maxLength: {
      value: max,
      errorMessage: `Trường này tối đa ${max} ký tự`,
    },
  }),
  notEmptyAndMax400: {
    required: {
      value: true,
      errorMessage: 'Trường này không được để trống',
    },
    maxLength: {
      value: 400,
      errorMessage: 'Trường này tối đa 400 ký tự',
    },
  },
  category: {
    required: {
      value: true,
      errorMessage: 'Phân loại không được để trống',
    },
    minLength: {
      value: 6,
      errorMessage: 'Phân loại tối thiểu 6 ký tự',
    },
    maxLength: {
      value: 256,
      errorMessage: 'Phân loại tối đa 256 ký tự',
    },
  },
  title: {
    required: {
      value: true,
      errorMessage: 'Tiêu đề không được để trống',
    },
    minLength: {
      value: 2,
      errorMessage: 'Tiêu đề tối thiểu 2 ký tự',
    },
    maxLength: {
      value: 256,
      errorMessage: 'Tiêu đề tối đa 256 ký tự',
    },
  },
  email: {
    required: {
      value: true,
      errorMessage: 'Email không được để trống',
    },
    email: {
      value: true,
      errorMessage: 'Sai định dạng email',
    },
  },
  name: {
    required: {
      value: true,
      errorMessage: 'Tên không được để trống',
    },
    pattern: {
      value: '^([^0-9]*)$',
      errorMessage: 'Tên chỉ bao gồm các chữ cái',
    },
    minLength: {
      value: 6,
      errorMessage: 'Tên tối thiểu 6 ký tự',
    },
    maxLength: {
      value: 256,
      errorMessage: 'Tên tối đa 256 ký tự',
    },
  },
  nameThings: {
    required: {
      value: true,
      errorMessage: 'Tên không được để trống',
    },
  },
  phoneNumber: {
    required: {
      value: true,
      errorMessage: 'Số điện thoại không được để trống',
    },
    pattern: {
      value: '^[0-9-+]{9,15}$',
      errorMessage: 'Số điện thoại không hợp lệ',
    },
  },
  age: {
    required: {
      value: true,
      errorMessage: 'Tuổi không được để trống',
    },
  },
  digital: {
    required: {
      value: true,
      errorMessage: 'Không được để trống',
    },
    number: {
      value: true,
      errorMessage: 'Nhập sai định dạng',
    },
    min: {
      value: 0,
      errorMessage: 'Nhập thấp nhất 0',
    },
  },
  force: {
    required: {
      value: true,
      errorMessage: 'Không được để trống',
    },
  },
}

export default Validation
