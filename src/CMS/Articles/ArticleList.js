import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Badge,
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

function ArticleList({ type, categoryType, ...props }) {
  const allLanguage = useSelector((state) => state.Partial.allLanguage)
  let editLink = ''
  switch (type.type) {
    case Configuration.articleType.ARTICLE.type:
      editLink = `articles`
      break
    case Configuration.articleType.BOOK.type:
      editLink = `books`
      break
    case Configuration.articleType.SLIDE.type:
      editLink = `slide`
      break
    case Configuration.articleType.VIDEO.type:
      editLink = `video`
      break
    default:
      editLink = `articles`
      break
  }

  const [
    data,
    loading,
    pageCount,
    fetchData,
    totalCount,
  ] = useFetchDataTable((options) =>
    getData.getArticles({ type: type.type, ...options })
  )

  const columns = [
    {
      Header: 'Tên',
      accessor: 'name',
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
      id: 'categories',
      Header: 'Danh mục',
      filterable: false,
      sortable: false,
      accessor: (data) => {
        return (
          <div
            className="text-break"
            style={{
              overflow: 'hidden',
            }}
          >
            {data.categories.length > 0
              ? data.categories.map((category, index) => (
                  <Badge
                    key={index}
                    className="mr-2"
                    color="primary"
                    title={category.name}
                  >
                    {category.name.length > 15
                      ? category.name.substring(0, 10) + '...'
                      : category.name}
                  </Badge>
                ))
              : 'N/A'}
          </div>
        )
      },
    },
    {
      Header: 'Ngày cập nhật',
      accessor: 'modifiedDate',
      Cell: ({ value }) => (
        <i>{moment(new Date(value)).format('DD-MM-YYYY')}</i>
      ),
    },
    {
      Header: 'Hành động',
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
          </UncontrolledButtonDropdown>
        )
      },
    },
  ]

  return (
    <div>
      <Header
        title={`Danh mục ${type.name}`}
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
          postData.deleteItemCommand('Article', 'DeleteArticlesVersion01', ids)
        }
        changeStatusCommand={(changeStatuses) =>
          postData.changeStatusCommand(
            'Article',
            'ChangeStatusPublishArticle',
            changeStatuses
          )
        }
        categoryType={categoryType}
      />
    </div>
  )
}

ArticleList.propTypes = {}

export default ArticleList
