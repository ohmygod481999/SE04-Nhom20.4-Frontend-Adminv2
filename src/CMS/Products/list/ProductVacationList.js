import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Common from '../../../utils/common'
import Configuration from '../../../utils/configuration'
import { getData, postData } from '../../../utils/data'
import useFetchDataTable from '../../CommonComponent/CustomHooks/useFetchDataTable'
import Header from '../../CommonComponent/Header'
import ReactTableList from '../../CommonComponent/TableList/ReactTableList'

const columns = [
  {
    Header: 'Tên',
    accessor: (a) => a,
    Cell: ({ value }) => (
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left mr-3">
            <div className="widget-content-left">
              <img
                width={52}
                className=""
                src={
                  value.images[0]
                    ? Configuration.image_url + value.images[0].path
                    : 'https://www.lamonde.com/pub/media/catalog/product/cache/685532b812a9ca3e96146f29b9ba1f41/l_/l_psp12dc242.jpg'
                }
                alt=""
              />
            </div>
          </div>
          <div className="widget-content-left flex2">
            <div className="widget-heading">{value.name}</div>
            <div className="widget-subheading opacity-10">
              <span className="pr-2">
                SKU: <i className="">{value.sku}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    Header: 'Trạng thái',
    accessor: 'published',
    Cell: (props) => (
      <div>
        {props.value ? (
          <div className="mb-2 mr-2 badge badge-success">Đã phát hành</div>
        ) : (
          <div className="mb-2 mr-2 badge badge-danger">Chưa phát hành</div>
        )}
      </div>
    ),
  },
  {
    Header: 'Giá',
    accessor: 'price',
    Cell: ({ value }) => {
      return (
        <div>
          {Common.formatNumber(value, 0)}
          <sup>đ</sup>
        </div>
      )
    },
  },
  {
    Header: 'Danh mục',
    accessor: 'categories',
    Cell: ({ value }) => {
      return (
        <div>
          {value.length > 0 ? value.map((val) => val.name).join(', ') : 'N/A'}
        </div>
      )
    },
  },
  {
    Header: 'Ngày cập nhật',
    accessor: 'modifiedDate',
    Cell: ({ value }) => (
      <i>{moment(new Date(value)).format('HH:mm, DD-MM-YYYY')}</i>
    ),
  },
  {
    Header: 'Action',
    accessor: (a) => a,
    Cell: ({ value }) => (
      <Link
        to={`/product/vacation/edit/${value.id}?languageId=${Configuration.languageVi}`}
      >
        <button className="btn-icon btn-icon-only btn btn-link btn btn-link">
          <i className="pe-7s-note btn-icon-wrapper"></i>
        </button>
      </Link>
    ),
  },
]

function ProductVacationList(props) {
  const [data, loading, pageCount, fetchData, totalCount] = useFetchDataTable(
    (options) =>
      getData.getProducts({
        type: Configuration.ProductTypes.Vacation,
        ...options,
      })
  )

  return (
    <div>
      <Header
        title="Danh sách sản phẩm"
        description="Product list"
        iconClassName="pe-7s-cart"
        actionsComponent={
          <Link to="/product/vacation/create">
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
        categoryType={Configuration.categoryTypes.PRODUCT}
      />
    </div>
  )
}

ProductVacationList.propTypes = {}

export default ProductVacationList
