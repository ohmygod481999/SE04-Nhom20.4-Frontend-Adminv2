import React from 'react'
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation'
import Select from 'react-select/src/select'
import { Button } from 'reactstrap'

export default function FilterTable({ onSubmit, name }) {
  return (
    <React.Fragment>
      <AvForm inline onSubmit={onSubmit}>
        <AvGroup className="mb-2 mr-sm-2 mb-sm-3">
          <AvField
            type="text"
            name="keyword"
            placeholder={`Nhập tên ${name} ...`}
          />
          <div
            style={{
              marginLeft: 5,
              minWidth: '400px',
            }}
          >
            <Select
              isMulti
              name="category"
              options={this.state.optionsCategories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.onCategoriesChangeHandler}
            />
          </div>
        </AvGroup>
        <Button color="primary mb-sm-3">Tìm kiếm</Button>
      </AvForm>
    </React.Fragment>
  )
}
