import 'bootstrap-daterangepicker/daterangepicker.css'
import React, { Fragment, useEffect, useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, {
  Comparator,
  textFilter,
} from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, {
  ColumnToggle,
  CSVExport,
} from 'react-bootstrap-table2-toolkit'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row,
} from 'reactstrap'
import Swal from 'sweetalert2'
import {
  getOrdersAction,
  processDeliveryAction,
  rejectOrder,
} from '../../reducers/Order'
import { reject } from '../../Services/OrderService'
import Common from '../../utils/common'
import Configuration from '../../utils/configuration'

function Order() {
  const { ToggleList } = ColumnToggle
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Hiển thị {from} đến {to} trên {size} kết quả.
    </span>
  )
  var currentDate = new Date()
  var from = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000)

  const [option, getPage] = useState({
    search: '',
    allStatus: null,
    offset: 0,
    sort: 'createdDate',
    order: 'desc',
    limit: 10,
    from: from,
    to: currentDate,
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrdersAction(option))
  }, [option])
  const order = useSelector((state) => state.Order.orders)

  option.totalSize = order.totalCount
  option.showTotal = true
  option.paginationTotalRenderer = customTotal
  option.sizePerPageList = [
    {
      text: '10',
      value: 10,
    },
    {
      text: '50',
      value: 50,
    },
    {
      text: '100',
      value: 100,
    },
    {
      text: 'Tất cả',
      value: order.totalCount,
    },
  ]

  var handleSort = (sort, order) => {
    option.sort = sort
    option.order = order
  }
  var handleTableChange = (
    type,
    { page, sizePerPage, sort, order, searchText, filters }
  ) => {
    const offset = (page - 1) * sizePerPage

    var allStatus = null

    if (filters.allStatus != undefined) {
      allStatus = filters.allStatus.filterVal
    }
    var search = ''
    if (filters.code != undefined) {
      search = filters.code.filterVal
    }
    getPage({
      keyword: search,
      allStatus: allStatus,
      offset: offset,
      limit: sizePerPage,
      sort: option.sort,
      order: option.order,
      from: option.from,
      to: option.to,
    })
  }

  const orderLineColumns = [
    {
      dataField: 'targetName',
      text: 'Tên',
      headerAlign: 'center',
      align: 'left',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
    },
    {
      dataField: 'originalPrice',
      text: 'Giá',
      align: 'right',
      formatter: (cell) => Common.formatMoney(cell, 0, 3),
      headerAlign: 'center',
      //filter: numberFilter()
    },

    {
      dataField: 'price',
      text: 'Giá thực tế',
      align: 'right',
      formatter: (cell) => Common.formatMoney(cell, 0, 3),
      headerAlign: 'center',
      //filter: numberFilter()
    },
    {
      dataField: 'quantity',
      text: 'Sl',
      align: 'right',
      headerAlign: 'center',
      //filter: numberFilter()
    },
    {
      dataField: 'total',
      text: 'Tổng tiền',
      align: 'right',
      formatter: (cell) => Common.formatMoney(cell, 0, 3),
      headerAlign: 'center',
      //filter: numberFilter()
    },
  ]
  const renderActions = (row) => {
    return (
      <div className="float-right">
        {(Configuration.statusOrder.PROCESS & row.allStatus) ==
          Configuration.statusOrder.PROCESS && (
          <Fragment>
            {row.paymentAllStatus != null &&
              row.paymentAllStatus ==
                Configuration.statusPayment.PROCESS +
                  Configuration.statusPayment.DEFAULT && (
                <Button
                  color="primary mr-2"
                  onClick={() => toggleModalPayment(row)}
                >
                  Cập nhật thanh toán
                </Button>
              )}

            {row.paymentAllStatus == null ? (
              row.delivery != null && row.delivery.allStatus == 1 ? (
                <Button
                  color="primary mr-2"
                  onClick={() => toggleModalLogistic(row)}
                >
                  Tiến hành giao hàng
                </Button>
              ) : (
                <Fragment>
                  <Button
                    color="primary mr-2"
                    onClick={() => toggleModalLogistic(row)}
                  >
                    Giao hàng thành công
                  </Button>
                  <Button
                    color="danger mr-2"
                    onClick={() => toggleModalLogistic(row)}
                  >
                    Giao hàng thất bại
                  </Button>
                </Fragment>
              )
            ) : (
              row.paymentAllStatus ==
                Configuration.statusPayment.PROCESS +
                  Configuration.statusPayment.DEFAULT &&
              (row.delivery != null && row.delivery.allStatus == 1 ? (
                <Button
                  color="primary mr-2"
                  onClick={() => toggleModalLogistic(row)}
                >
                  Tiến hành giao hàng
                </Button>
              ) : (
                <Fragment>
                  <Button
                    color="primary mr-2"
                    onClick={() => toggleModalLogistic(row)}
                  >
                    Giao hàng thành công
                  </Button>
                  <Button
                    color="danger mr-2"
                    onClick={() => toggleModalLogistic(row)}
                  >
                    Giao hàng thất bại
                  </Button>
                </Fragment>
              ))
            )}

            <Button
              className="btn-icon btn btn-danger"
              color="danger"
              onClick={() =>
                reject(row.id)
                  .then((response) => {
                    if (response.data.Success) {
                      Swal.fire('Thành công', response.data.Message, 'success')
                      dispatch(rejectOrder(row.id))
                    } else Swal.fire('Thất bại', response.data.Message, 'error')
                  })
                  .catch((err) => {
                    Swal.fire('Thất bại', err + '', 'error')
                  })
                  .finally(() => {})
              }
            >
              <i className="lnr-lighter pe-7s-trash"> </i>
              Hủy đơn
            </Button>
          </Fragment>
        )}
      </div>
    )
  }
  const expandRow = {
    renderer: (row) => (
      <Container>
        <h5>
          <i className="pe-7s-cart"></i> #{row.code} |{' '}
          {Common.formatDateTime(row.createdDate)}
        </h5>
        <hr></hr>
        <Row>
          <Col>
            <p>
              Mã đơn: <b>{row.code}</b>
            </p>
            <p>
              Tổng tiền: <b>{Common.formatMoney(row.grandTotal, 0, 3)}</b>
            </p>
            <p>Ngày tạo: {Common.formatDateTime(row.createdDate)}</p>
            <p>
              {row.paymentMethodName}:{' '}
              {Common.formatMoney(row.paymentAmount, 0, 3)}[
              {Common.getPaymentStatus(row.paymentAllStatus)}]
            </p>

            <p>
              Ghi chú đơn hàng: <b>{row.note}</b>
            </p>
          </Col>
          <Col>
            <p>
              Tên: <b>{row.userName}</b>
            </p>
            <p>
              Sđt: <b>{row.userMobile}</b>
            </p>
            <p>
              Email: <b>{row.userEmail}</b>
            </p>
            {row.delivery != null && (
              <Fragment>
                <p>Địa chỉ giao hàng: {row.delivery.addressDetail}</p>

                <p>Khách hàng ghi chú: {row.delivery.note}</p>
                <p>Người giao hàng ghi chú: {row.delivery.supplierNote}</p>
              </Fragment>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable
              keyField="id"
              wrapperClasses="table-responsive"
              data={row.orderLines}
              columns={orderLineColumns}
              striped
              hover
              condensed
            />
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Tạm tính:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {Common.formatMoney(row.subTotal, 0, 3)}
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Giảm khuyến mãi:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {Common.formatMoney(row.promotionAmount, 0, 3)}
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Giảm mã giảm giá:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {Common.formatMoney(row.giftCodeAmount, 0, 3)}
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Tổng đơn:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {Common.formatMoney(row.grandTotal, 0, 3)}
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 4, offset: 8 }}>
            <hr></hr>
          </Col>
        </Row>
        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Phí giao hàng:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {row.delivery != null
              ? Common.formatMoney(row.delivery.amount, 0, 3)
              : '0đ'}
          </Col>
        </Row>

        <Row className="font-weight-bold">
          <Col md={{ size: 2, offset: 8 }}>Tổng cần thanh toán:</Col>
          <Col md={{ size: 2 }} className="text-md-right">
            {row.delivery != null
              ? Common.formatMoney(row.delivery.amount + row.grandTotal, 0, 3)
              : Common.formatMoney(row.grandTotal, 0, 3)}
          </Col>
        </Row>
        <hr></hr>
        {renderActions(row)}
      </Container>
    ),
  }
  const columns = [
    {
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'center' }
      },
      dataField: 'code',
      text: 'Mã đơn hàng',
      headerAlign: 'center',
      align: 'center',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
      onSort: handleSort,
      filter: textFilter({
        //delay: 1000, // default is 500ms
        comparator: Comparator.LIKE,
        placeholder: 'Mã đơn hàng',
      }),
      footer: '',
    },
    {
      headerStyle: (colum, colIndex) => {
        return { width: '1000px', textAlign: 'center' }
      },
      dataField: 'allStatus',
      text: 'Quá trình đơn hàng',
      align: 'center',
      formatter: (cell, row) => {
        console.log(row)
        var paymentDisplay = ''
        var paymentMethodName = ''

        if (row.payments.length > 0) {
          paymentMethodName = row.paymentMethodName
          if ((33554432 & row.paymentAllStatus) == 33554432) {
            paymentDisplay = 'success'
          } else if ((1048576 & row.paymentAllStatus) == 1048576) {
            paymentDisplay = 'danger'
          } else if ((32768 & row.paymentAllStatus) == 32768) {
            paymentDisplay = 'danger'
          } else if ((row.paymentAllStatus & 32) == 32) {
            paymentDisplay = 'warning'
          } else if ((row.paymentAllStatus & 1) == 1) {
            paymentDisplay = 'light'
          }
        }

        var deliveryDisplay = ''
        if (row.delivery != null) {
          if ((1048576 & row.delivery.allStatus) == 1048576) {
            deliveryDisplay = 'success'
          } else if ((32768 & row.delivery.allStatus) == 32768) {
            deliveryDisplay = 'danger'
          } else if ((1024 & row.delivery.allStatus) == 1024) {
            deliveryDisplay = 'default'
          } else if ((row.delivery.allStatus & 32) == 32) {
            deliveryDisplay = 'warning'
          } else if ((row.delivery.allStatus & 1) == 1) {
            deliveryDisplay = 'light'
          }
        }

        var deliveryDisplay = ''
        if (row.delivery != null) {
          if ((1048576 & row.delivery.allStatus) == 1048576) {
            deliveryDisplay = 'success'
          } else if ((32768 & row.delivery.allStatus) == 32768) {
            deliveryDisplay = 'danger'
          } else if ((1024 & row.delivery.allStatus) == 1024) {
            deliveryDisplay = 'default'
          } else if ((row.delivery.allStatus & 32) == 32) {
            deliveryDisplay = 'warning'
          } else if ((row.delivery.allStatus & 1) == 1) {
            deliveryDisplay = 'light'
          }
        }

        var orderDisplay = ''

        if ((1048576 & row.allStatus) == 1048576) {
          console.log('============' + row.allStatus)
          orderDisplay = 'success'
        } else if ((32768 & row.allStatus) == 32768) {
          orderDisplay = 'danger'
        } else if ((row.allStatus & 32) == 32) {
          orderDisplay = 'warning'
        } else if ((row.allStatus & 1) == 1) {
          orderDisplay = 'light'
        }

        return (
          <Progress multi>
            <Progress bar value="10" color="success">
              Mới tạo
            </Progress>
            {paymentDisplay != '' ? (
              <Progress
                bar
                color={paymentDisplay}
                animated={paymentDisplay == 'warning'}
                value="30"
              >
                Quá trình thanh toán {paymentMethodName}
              </Progress>
            ) : (
              <Progress bar color="dark" value="30">
                Quá trình thanh toán (Không có)
              </Progress>
            )}

            {deliveryDisplay != '' ? (
              <Progress
                bar
                color={deliveryDisplay}
                animated={deliveryDisplay == 'warning'}
                className={deliveryDisplay == 'light' && 'text-secondary'}
                value="30"
              >
                Quá trình giao vận{' '}
                {row.delivery.trackingCode != null &&
                  'Mã track: ' + row.delivery.trackingCode}
              </Progress>
            ) : (
              <Progress bar color="dark" value="30">
                Quá trình giao vận (Không có)
              </Progress>
            )}
            {orderDisplay == 'success' ? (
              <Progress bar value="30" color="success">
                {' '}
                Hoàn thành
              </Progress>
            ) : (
              <Progress bar value="30" color="light" className="text-secondary">
                {' '}
                Hoàn thành
              </Progress>
            )}
          </Progress>
        )
      },

      width: '1000',
      footer: '',
    },
    {
      dataField: 'createdDate',
      text: 'Ngày tạo',
      align: 'center',
      headerAlign: (column, colIndex) => 'center',
      formatter: (cell, row) => Common.formatDateTime(cell, 'dd-mm-yyyy hh:mm'),
      sort: true,
      onSort: handleSort,
      footer: '',
    },
    {
      dataField: 'orderLineArrStr',
      text: 'Sản phẩm',
      align: 'right',
      formatter: (cell, row) => row.orderLines.length,
      headerAlign: (column, colIndex) => 'center',
      footer: '',
      //footer: columnData => Common.formatNumber(columnData.reduce((acc, item) => acc + item, 0), 0, 3) // console.log(columnData)
    },
    {
      dataField: 'grandTotal',
      text: 'Tổng tiền',
      align: 'right',
      formatter: (cell) => Common.formatMoney(cell, 0, 3),
      headerAlign: 'center',
      footerAlign: 'right',
      footer: (columnData) =>
        Common.formatMoney(
          columnData.reduce((acc, item) => acc + item, 0),
          0,
          3
        ), // console.log(columnData)
      //filter: numberFilter()
    },
  ]

  const handleEvent = (event, picker) => {
    getPage({
      search: option.search,
      active: option.active,
      type: option.type,
      offset: option.offset,
      limit: option.limit,
      sort: option.sort,
      order: option.order,
      from: picker.startDate.toDate(),
      to: picker.endDate.toDate(),
    })
  }
  const { ExportCSVButton } = CSVExport
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = (value) => {
    var body = {
      Id: currentOrder.delivery.id,
      TrackingCode: value.trackingCode,
      Amount: value.amount,
      ModifiedDate: Common.formatDateTime(new Date()),
      ModifiedBy: Common.getCookie(Configuration.userId),
    }
    dispatch(processDeliveryAction(body, currentOrder.id))
    toggleModalLogistic()
  }

  const [modalLogistic, setModalLogistic] = useState(false)
  const [currentOrder, setCurrentOrder] = useState()
  //const [modal, setModal] = useState(false);
  const toggleModalLogistic = (row) => {
    console.log(row)
    setModalLogistic(!modalLogistic)
    setCurrentOrder(row)
  }

  const onPaymentSubmit = (value) => {
    if (value.status == '1') {
      //dispatch(suc)
    }
    toggleModalPayment()
  }

  const [modalPayment, setModalPayment] = useState(false)

  //const [modal, setModal] = useState(false);
  const toggleModalPayment = (row) => {
    setModalPayment(!modalPayment)
    setCurrentOrder(row)
  }

  return (
    <div>
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-display1 icon-gradient bg-malibu-beach"></i>
            </div>
            <div>
              Danh sách đơn hàng
              <div className="page-title-subheading">
                Các đơn hàng có trong hệ thống
              </div>
            </div>
          </div>
          <div className="page-title-actions d-none d-lg-block"></div>
        </div>
      </div>
      <Card className="main-card mb-3">
        <CardBody>
          <Form>
            <FormGroup check inline>
              <Label check>
                <DateRangePicker
                  startDate={option.from}
                  endDate={option.to}
                  onApply={handleEvent}
                >
                  <button className="btn-pill btn-shadow mr-3 btn btn-info">
                    Dữ liệu từ ngày{' '}
                    {Common.formatDateTime(option.from, 'dd-mm-yyyy')} đến{' '}
                    {Common.formatDateTime(option.to, 'dd-mm-yyyy')}
                  </button>
                </DateRangePicker>
              </Label>
            </FormGroup>
          </Form>
          <div className="divider" />
          {order != null && order.items ? (
            <ToolkitProvider
              keyField="id"
              columns={columns}
              data={order.items}
              search
              columnToggle
              exportCSV={{
                fileName: 'LuongDonHang.csv',
                //separator: ',',
                //ignoreHeader: false,

                noAutoBOM: true,
                blobType: 'text/csv;charset=utf-8',
              }}
            >
              {(props) => (
                <div>
                  <ExportCSVButton
                    className="btn btn-primary mr-2"
                    {...props.csvProps}
                  >
                    Export CSV
                  </ExportCSVButton>
                  <ToggleList {...props.columnToggleProps} />
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    wrapperClasses="table-responsive"
                    remote
                    keyField="id"
                    data={order.items}
                    columns={columns}
                    pagination={paginationFactory(option)}
                    onTableChange={handleTableChange}
                    striped
                    hover
                    condensed
                    filter={filterFactory()}
                    expandRow={expandRow}
                  />
                </div>
              )}
            </ToolkitProvider>
          ) : (
            <h3 className="kt-portlet__head-title">
              Hiện chưa có đơn hàng nào
            </h3>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={modalLogistic} toggle={toggleModalLogistic}>
        <ModalHeader>
          {currentOrder != undefined && (
            <h5>
              <i className="pe-7s-cart"></i> #{currentOrder.code} |{' '}
              {Common.formatDateTime(currentOrder.createdDate)}
            </h5>
          )}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>Mã giao vận</Label>
              <input
                className="form-control"
                type="text"
                ref={register({
                  required: 'Cần nhập mã vận đơn',
                })}
                name="trackingCode"
              />
              {errors.trackingCode && (
                <b style={{ color: 'red' }}>{errors.trackingCode.message}</b>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Phí giao vận</Label>
              <input
                className="form-control"
                type="number"
                ref={register({
                  required: 'Cần nhập phí ship',
                })}
                name="amount"
              />
              {errors.amount && (
                <b style={{ color: 'red' }}>{errors.amount.message}</b>
              )}
            </FormGroup>
            <Button color="primary" className="mt-1">
              Cập nhật
            </Button>
            {/* <LoadingButton
                            color="primary"
                            className="mt-1"
                            loading={isLoading}                            
                        >Cập nhật</LoadingButton> */}
          </form>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="link" onClick={() => toggleModalGetCode()}>Đóng</Button> */}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalPayment} toggle={toggleModalPayment}>
        <ModalHeader>
          {currentOrder != undefined && (
            <h5>
              <i className="pe-7s-cart"></i> #{currentOrder.code} |{' '}
              {Common.formatDateTime(currentOrder.createdDate)}
            </h5>
          )}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onPaymentSubmit)}>
            <FormGroup>
              <Label>Trạng thái</Label>
              <select
                className="form-control"
                name="status"
                ref={register({
                  required: 'Cần lựa chọn trạng thái',
                })}
              >
                <option value="" disabled selected hidden>
                  Lựa chọn trạng thái
                </option>
                <option value="1">Hoàn thành</option>
                <option value="0">Thất bại</option>
              </select>
              {errors.status && (
                <b style={{ color: 'red' }}>{errors.status.message}</b>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Mã tham chiếu</Label>
              <input
                className="form-control"
                type="text"
                ref={register({
                  required: 'Cần nhập mã tham chiếu',
                })}
                name="referenceCode"
              />
              {errors.referenceCode && (
                <b style={{ color: 'red' }}>{errors.referenceCode.message}</b>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Ghi chú</Label>
              <textarea
                className="form-control"
                type="text"
                ref={register({
                  required: 'Cần nhập ghi chú',
                })}
                name="note"
              />
              {errors.note && (
                <b style={{ color: 'red' }}>{errors.note.message}</b>
              )}
            </FormGroup>
            <Button type="submit" color="primary" className="mt-1 mr-2">
              Cập nhật
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  )
}

export default Order
