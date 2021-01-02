import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import Common from '../../../utils/common'
import { getData, postData } from '../../../utils/data'
import useFetchDataTable from '../../CommonComponent/CustomHooks/useFetchDataTable'
import Header from '../../CommonComponent/Header'
import ReactTableList from '../../CommonComponent/TableList/ReactTableList'

function ProductTableList(props) {
  const allLanguage = useSelector((state) => state.Partial.allLanguage)
  const [data, loading, pageCount, fetchData, totalCount] = useFetchDataTable(
    (options) =>
      getData.getProducts({
        type: props.type,
        ...options,
      })
  )

  const columns = [
    {
      Header: 'Tên',
      accessor: 'name',
      width: 200,
      Cell: (content) => <p className="text-break">{content.value}</p>,
    },
    {
      accessor: 'published',
      Header: 'Phát hành',
      Cell: (props) => (
        <div>
          {props.value ? (
            <div className="mb-2 mr-2 badge badge-success">Đã phát hành</div>
          ) : (
            <div className="mb-2 mr-2 badge badge-danger">Chưa phát hành</div>
          )}
        </div>
      ),
      resizable: false,
      width: 130,
    },
    {
      id: 'subDescription',
      Header: 'Trích dẫn',
      accessor: (d) => {
        if (d.subDescription.length > 50)
          return d.subDescription.substring(0, 49)
        return d.subDescription
      },
      resizable: false,
    },
    {
      id: 'categories',
      Header: 'Phân loại',
      accessor: (data) => {
        return _.reduce(
          data.categories,
          (categoriesString, category, i) => {
            if (i == 0) return category.name
            return (categoriesString += `, ${category.name}`)
          },
          ''
        )
        return _.get(data, 'categories[0].name')
      }, //"categories[0].name",
      // resizable: false,
    },
    {
      id: 'createdDate',
      Header: 'Ngày tạo',
      accessor: (d) => {
        const date = new Date(d.createdDate)
        return Common.formatDateTime(date, 'dd-mm-yyyy')
        // return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      },
      resizable: false,
      width: 130,
    },
    {
      Header: 'Thao tác',
      id: 'thao-tac',
      accessor: (d) => d,
      Cell: ({ value }) => (
        <div style={{ margin: 'auto' }}>
          <UncontrolledButtonDropdown className="mb-2 mr-2">
            <DropdownToggle tag="div">
              <button className="btn-icon btn-icon-only btn btn-link btn btn-link">
                <i className="pe-7s-note btn-icon-wrapper"></i>
              </button>
            </DropdownToggle>
            <DropdownMenu>
              {allLanguage.map((val, i) => (
                <DropdownItem
                  onClick={() =>
                    props.history.push(
                      `/${window.location.hash.split('/')[1]}/edit/${
                        value.id
                      }?languageId=${val.id}`
                    )
                  }
                >
                  {val.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      ),
      filterable: false,
      resizable: false,
      width: 100,
    },
  ]

  return (
    <React.Fragment>
      <Header
        title="Danh sách sản phẩm"
        description="Product list"
        iconClassName="pe-7s-cart"
        actionsComponent={
          <Link to={`create`}>
            <Button color="focus">Tạo mới</Button>
          </Link>
        }
      />

      <ReactTableList
        columnsSelection
        data={data}
        loading={loading}
        columns={columns}
        pageCount={pageCount}
        totalCount={totalCount}
        fetchData={fetchData}
        deleteCommand={(ids) =>
          postData.deleteItemCommand('Product', 'DeleteProductVersion01', ids)
        }
        changeStatusCommand={(changeStatuses) =>
          postData.changeStatusCommand(
            'Product',
            'ChangeStatusPublishProduct',
            changeStatuses
          )
        }
      />
    </React.Fragment>
  )
}

export default ProductTableList
