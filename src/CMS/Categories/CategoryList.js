import moment from 'moment'
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
import Configuration from '../../utils/configuration'
import { getData, postData } from '../../utils/data'
import useFetchDataTable from '../CommonComponent/CustomHooks/useFetchDataTable'
import Header from '../CommonComponent/Header'
import ReactTableList from '../CommonComponent/TableList/ReactTableList'

function CategoryList({ type, parentId, actions, ...props }) {
  const allLanguage = useSelector((state) => state.Partial.allLanguage)
  let editLink = ''
  switch (type) {
    case Configuration.categoryTypes.MEMBERSHIP:
      editLink = `member-categories`
      break
    case Configuration.categoryTypes.ADDRESS:
      editLink = `address-categories`
      break
    case Configuration.categoryTypes.MENU:
      editLink = `navigation`
      break
    case Configuration.categoryTypes.CUSTOMER:
      editLink = `user-categories`
      break
    case Configuration.categoryTypes.IMAGE:
      editLink = `image-categories`
      break
    case Configuration.categoryTypes.PRODUCT:
      editLink = `product-categories`
      break
    case Configuration.categoryTypes.BOOK:
      editLink = `books/categories`
      break
    case Configuration.categoryTypes.COURSE:
      editLink = `course/categories`
      break
    case Configuration.categoryTypes.ARTICLE:
      editLink = `articles/categories`
      break
    case Configuration.categoryTypes.ROOM_BOOKING:
      editLink = `room-booking/room-category`
      break
    case Configuration.categoryTypes.KANBAN:
      editLink = `crm/kanban`
      break
    case Configuration.categoryTypes.ADDRESS:
      editLink = `address/category`
      break
    default:
      editLink = `Categories`
  }

  const [
    data,
    loading,
    pageCount,
    fetchData,
    totalCount,
  ] = useFetchDataTable((options) =>
    getData.getCategories({ type: type, parentId: parentId, ...options })
  )

  const columns = [
    {
      Header: 'Tên',
      accessor: 'pathName',
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
      Header: 'Ngày cập nhật',
      accessor: 'modifiedDate',
      Cell: ({ value }) => (
        <i>{moment(new Date(value)).format('DD-MM-YYYY')}</i>
      ),
    },
    {
      Header: 'Action',
      accessor: (a) => a,
      Cell: ({ value }) => {
        return (
          <UncontrolledButtonDropdown>
            <DropdownToggle tag="div">
              <button
                title="Sửa"
                className="btn-icon btn-icon-only btn btn-link btn btn-link"
              >
                <i className="pe-7s-note btn-icon-wrapper"></i>
              </button>
            </DropdownToggle>
            <DropdownMenu>
              {allLanguage.map((val, i) => (
                <Link to={`/${editLink}/edit/${value.id}?languageId=${val.id}`}>
                  <DropdownItem>{val.name}</DropdownItem>
                </Link>
              ))}
            </DropdownMenu>
            {actions ? actions.map((Action) => <Action id={value.id} />) : null}
          </UncontrolledButtonDropdown>
        )
      },
    },
  ]

  return (
    <div>
      <Header
        title={`Danh sách phân loại`}
        iconClassName="pe-7s-cart"
        actionsComponent={
          <Link to={`/${editLink}/create`}>
            <Button color="focus">Tạo mới</Button>
          </Link>
        }
      />
      <ReactTableList
        columnsSelection
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        totalCount={totalCount}
        deleteCommand={(ids) =>
          postData.deleteItemCommand('Category', 'DeleteCategories', ids)
        }
        changeStatusCommand={(changeStatuses) =>
          postData.changeStatusCommand(
            'Category',
            'ChangeStatusPublishCategories',
            changeStatuses
          )
        }
      />
    </div>
  )
}

CategoryList.propTypes = {}

export default CategoryList
