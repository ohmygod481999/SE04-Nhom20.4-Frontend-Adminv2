import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import Common from '../../../utils/common'

function ModalCreateValueVacation({
  isOpen,
  toggle,
  dataModal,
  variations,
  setVariations,
}) {
  const { register, errors, handleSubmit, setValue } = useForm()
  const [valueDateTimePick, onChangeValueDateTimePick] = useState(new Date())

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (dataModal && Object.keys(dataModal).length > 0) {
      const { Price, OriginalPrice, FromDate, ToDate, ExpireDate } = dataModal
      setValue('price', Price)
      setValue('originalPrice', OriginalPrice)
      setStartDate(new Date(FromDate))
      setEndDate(new Date(ToDate))
      onChangeValueDateTimePick(new Date(ExpireDate))
    }
    return () => {}
  }, [dataModal])

  const handleEvent = (event, picker) => {
    setStartDate(picker.startDate.toDate())
    setEndDate(picker.endDate.toDate())
  }

  const onSubmitModal = (values) => {
    const { price, originalPrice } = values
    const idValue = Common.guid()
    const data = {
      Id: idValue,
      Sku: `${moment(startDate).format('DD/MM/YYYY')}-${moment(endDate).format(
        'DD/MM/YYYY'
      )}`,
      Price: price,
      OriginalPrice: originalPrice,
      FromDate: startDate,
      ToDate: endDate,
      ExpireDate: valueDateTimePick,
    }
    if (!dataModal) setVariations([data, ...variations])
    else {
      setVariations(
        variations.map((v) => {
          if (v.id === dataModal.id) {
            return data
          }
          return v
        })
      )
    }
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(null)}>
      <ModalHeader>{dataModal ? 'Edit' : null} Giá trị kì nghỉ</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Thời gian</Label>
          <br />
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onApply={handleEvent}
          >
            <input
              type="text"
              className="form-control"
              value={
                Common.formatDateTime(startDate, 'dd-mm-yyyy') +
                ' đến ' +
                Common.formatDateTime(endDate, 'dd-mm-yyyy')
              }
            />
          </DateRangePicker>
        </FormGroup>
        <FormGroup>
          <Label>
            Giá vốn (VNĐ)<span className="red">*</span>
          </Label>
          <input
            // onchange={setCostPrice}
            minLength="0"
            defaultValue="0"
            type="number"
            name="originalPrice"
            className="form-control"
            ref={register({ required: true })}
          />
          {errors.originalPrice && <span>Trường không được bỏ trống</span>}
        </FormGroup>
        <FormGroup>
          <Label>
            Giá (VNĐ) <span className="red">*</span>
          </Label>
          <input
            ref={register({ required: true })}
            // onchange={setPrice}
            minLength="0"
            defaultValue="0"
            type="number"
            name="price"
            className="form-control"
          />
          {errors.price && <span>Trường không được bỏ trống</span>}
        </FormGroup>
        <FormGroup>
          <Label>
            Thời gian hết hạn <span className="red">*</span>
          </Label>
          <DatePicker
            className="form-control"
            selected={valueDateTimePick}
            onChange={(date) => onChangeValueDateTimePick(date)}
            dateFormat="dd-MM-yyyy"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit(onSubmitModal)}>
          Lưu
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCreateValueVacation
