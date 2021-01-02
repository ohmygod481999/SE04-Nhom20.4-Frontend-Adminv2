import moment from 'moment'
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import es from 'date-fns/locale/vn';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import Swal from 'sweetalert2'
import { getDebtOrders } from '../../Services/OrderService'
import {
  sendEmailDebt,
  updateInformationAndClosePayments,
} from '../../Services/PaymentService'
import Common from '../../utils/common'
import Configuration from '../../utils/configuration'

//import console = require("console");
// registerLocale('vn', es)

function ListDebt() {
  const merchant = useSelector((state) => state.System.merchant)
  var reconcileDate = 15

  if (
    !merchant.bookingRoomConfiguration &&
    merchant.bookingRoomConfiguration !== ''
  ) {
    var tempConfig = JSON.parse(merchant.bookingRoomConfiguration)
    reconcileDate = tempConfig.ReconcileDate
  }

  const { ToggleList } = ColumnToggle
  const [orders, setOrders] = useState()
  var currentDate = new Date()
  const [startDate, setStartDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), reconcileDate)
  )

  var year = currentDate.getFullYear()
  var month = currentDate.getMonth()
  if (startDate.getMonth() == 0) {
    year = year - 1
    month = month + 12
  } else {
    month = month - 1
  }
  const [option, setOption] = useState({
    search: '',
    allStatus: null,
    offset: 0,
    sort: 'createdDate',
    order: 'desc',
    limit: 10,
    from: Common.formatDateTimeMoment(
      new Date(year, month, reconcileDate, 0, 0, 0)
    ),
    to: Common.formatDateTimeMoment(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        reconcileDate,
        23,
        59,
        59
      )
    ),
  })

  // useEffect(() => {
  //     getDebtOrders(option).then((res) => {
  //         setOrders(res.debtorders.items)
  //     }
  //     );
  // }, []);

  useEffect(() => {
    getDebtOrders(option).then((res) => {
      setOrders(res.debtorders.items)
    })
  }, [option])

  useEffect(() => {
    var year1 = startDate.getFullYear()
    var month1 = startDate.getMonth()
    console.log(startDate)
    if (startDate.getMonth() == 0) {
      year1 = year1 - 1
      month1 = month1 + 11
    } else {
      month1 = month1 - 1
    }
    console.log(year1)
    console.log(month1)
    setOption({
      search: option.search,
      active: option.active,
      type: option.type,
      offset: option.offset,
      limit: option.limit,
      sort: option.sort,
      order: option.order,
      from: Common.formatDateTimeMoment(
        new Date(year1, month1, reconcileDate, 0, 0, 0)
      ),
      to: Common.formatDateTimeMoment(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          reconcileDate,
          23,
          59,
          59
        )
      ),
    })
  }, [startDate])

  var handleTableChange = (
    type,
    { page, sizePerPage, sort, order, searchText, filters }
  ) => {
    const offset = (page - 1) * sizePerPage

    var search = ''
    if (filters.code != undefined) {
      search = filters.code.filterVal
    }
    setOption({
      search: search,
      offset: offset,
      limit: sizePerPage,
      sort: sort,
      order: order,
      from: option.from,
      to: option.to,
    })
  }

  const onPaymentSubmit = (value) => {
    const data = {
      Id: Common.guid(),
      PaymentIds: paymentIds,
      ReferenceCode: value.referenceCode,
      Note: value.note,
      ModifiedDate: new Date(),
      ModifiedBy: Common.getCookie(Configuration.userId),
    }

    updateInformationAndClosePayments(data).then((res) => {
      if (res.data.Success) {
        getDebtOrders(option).then((res) => {
          setOrders(res.debtorders.items)
        })
        reset()
        setModalPayment(false)
      }
    })
  }
  const { handleSubmit, register, errors, reset } = useForm()

  const [modalPayment, setModalPayment] = useState(false)
  const [paymentIds, setPaymentIds] = useState(false)
  const [paymentCodes, setPaymentCodes] = useState()
  //const [modal, setModal] = useState(false);
  const toggleModalPayment = (row) => {
    if (row.payments == undefined) {
      setPaymentIds([row.id])
      setPaymentCodes(row.code)
    } else {
      console.log(row.payments)
      setPaymentIds(row.payments.map((e) => e.id))
      setPaymentCodes(row.payments.map((e) => e.code).toString())
    }
    setModalPayment(!modalPayment)
  }

  const sendEmail = (row) => {
    console.log(row)
    const data = {
      Id: Common.guid(),
      MerchantId: Common.getCookie('merchantId'),
      CustomerId: row.customerId,
      DebtDetails: row.grandTotal,
      PaymentPeriod: startDate.getMonth(),
      ModifiedDate: new Date(),
      ModifiedBy: Common.getCookie(Configuration.userId),
    }

    sendEmailDebt(data).then((res) => {
      if (res.data.Success) {
        Swal.fire('Gửi email thành công')
      }
    })
  }

  const columns = [
    {
      dataField: 'userName',
      text: 'Tên khách hàng',
      headerAlign: 'center',
      align: 'left',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
      footer: '',
    },
    {
      dataField: 'userEmail',
      text: 'Email',
      headerAlign: 'center',
      align: 'left',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
      footer: '',
    },
    {
      dataField: 'userMobile',
      text: 'Sđt',
      headerAlign: 'center',
      align: 'right',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
      footer: '',
    },
    {
      dataField: 'grandTotal',
      text: 'Công nợ',
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

  const subColumns = [
    {
      dataField: 'orderCode',
      text: 'Mã đơn hàng',
      headerAlign: 'center',
      align: 'center',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
    },
    {
      dataField: 'code',
      text: 'Mã thanh toán',
      headerAlign: 'center',
      align: 'center',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
    },
    {
      dataField: 'createdDate',
      text: 'Ngày tạo giao dịch',
      headerAlign: 'center',
      align: 'center',
      sort: true,
      formatter: (cell, row) => (
        <b> {moment(new Date(cell)).format('hh:mm DD-MM-YYYY')}</b>
      ),
    },
    {
      dataField: 'paymentMethodName',
      text: 'Pttt',
      headerAlign: 'center',
      align: 'center',
      sort: true,
      formatter: (cell, row) => <b>{cell}</b>,
    },
    {
      dataField: 'amount',
      text: 'Tổng tiền',
      align: 'right',
      formatter: (cell) => Common.formatMoney(cell, 0, 3),
      headerAlign: 'center',
      //filter: numberFilter()
    },
    {
      text: 'Chức năng',
      align: 'right',
      formatter: (cell, row) => (
        <Button color="primary mr-2" onClick={() => toggleModalPayment(row)}>
          Thanh toán
        </Button>
      ),

      headerAlign: 'center',
      //filter: numberFilter()
    },
  ]

  const expandRow = {
    renderer: (row) => (
      <Container>
        {/* <Row>
                    <Col>
                        <p>
                            Mã đơn: <b>{row.code}</b>
                        </p>
                        <p>
                            Tổng tiền:{" "}
                            <b>{Common.formatMoney(row.grandTotal, 0, 3)}</b>
                        </p>
                        <p>
                            Ngày tạo: {Common.formatDateTime(row.createdDate)}
                        </p>
                        <p>
                            {row.paymentMethodName}:{" "}
                            {Common.formatMoney(row.paymentAmount, 0, 3)}
                        </p>
                    </Col>
                    <Col>
                        <p>{row.note}</p>
                    </Col>
                </Row>*/}
        <h5>Chi tiết giao dịch</h5>
        <Row>
          <Col>
            <BootstrapTable
              keyField="id"
              wrapperClasses="table-responsive"
              data={row.payments}
              columns={subColumns}
              striped
              hover
              condensed
            />
          </Col>
        </Row>

        <div className="float-right">
          <Button color="danger mr-2" onClick={() => sendEmail(row)}>
            Gửi email thông báo công nợ
          </Button>

          <Button color="success mr-2" onClick={() => toggleModalPayment(row)}>
            Thanh toán toàn bộ
          </Button>
        </div>
      </Container>
    ),
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
              Danh sách công nợ
              <div className="page-title-subheading">
                Các đơn hàng công nợ và chi tiết
              </div>
            </div>
          </div>
          <div className="page-title-actions d-none d-lg-block"></div>
        </div>
      </div>
      <Card className="main-card mb-3">
        <CardBody>
          {/* Chọn thời gian 
                    <DateRangePicker startDate={this.state.option.from} endDate={this.state.option.to} onApply={this.handleEvent}>
                        <button>Từ {Common.formatDateTime(this.state.option.from.toLocaleString(), 'dd-mm-yyyy')} đến {Common.formatDateTime(this.state.option.to.toLocaleString(), 'dd-mm-yyyy')}</button>
                    </DateRangePicker> */}
          <DatePicker
            className="btn-pill btn-shadow mr-3 btn btn-info"
            //locale="vn"
            dateFormat="MM/yyyy"
            showMonthYearPicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <hr></hr>
          {orders != undefined ? (
            <ToolkitProvider
              keyField="customerId"
              columns={columns}
              search
              columnToggle
            >
              {(props) => (
                <div>
                  Lựa chọn cột hiển thị thông tin bảng:{' '}
                  <ToggleList {...props.columnToggleProps} />
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    wrapperClasses="table-responsive"
                    remote
                    keyField="customerId"
                    data={orders}
                    columns={columns}
                    //pagination={paginationFactory(options)}
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

      <Modal isOpen={modalPayment} toggle={toggleModalPayment}>
        <ModalHeader>
          <h5>
            <i className="pe-7s-cart"></i> #{paymentCodes}
          </h5>
        </ModalHeader>
        <form onSubmit={handleSubmit(onPaymentSubmit)}>
          <ModalBody>
            {/* {currentPayment != undefined && <input type="hidden" value={currentPayment.id} ref={register()} name="id" />} */}

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
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" className="mt-1 mr-2">
              Cập nhật
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default ListDebt
