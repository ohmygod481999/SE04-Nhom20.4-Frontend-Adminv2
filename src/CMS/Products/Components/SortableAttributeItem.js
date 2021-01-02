import React from 'react'
import Ionicon from 'react-ionicons'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import { CustomInput, Input, ListGroupItem } from 'reactstrap'
import Configuration from '../../../utils/configuration'
import EditableElement from '../../CommonComponent/EditableElement'
import ModalImage from '../../CommonComponent/ImagePartial2/ModalImage'

const SortableAttributeItem = SortableElement(
  ({ value, setValues, values }) => {
    // const courseType = useSelector((state) => {
    //     return state.Course.type;
    // });

    // const dispatch = useDispatch();

    const DragHander = sortableHandle(() => (
      <div
        size="sm"
        className="btn-icon btn-icon-only"
        color="light"
        id={'PopoverCustomT-1'}
        style={{
          cursor: 'move',
        }}
        // onClick={this.togglePop1}
      >
        <Ionicon color="#484d52" icon="ios-keypad-outline" />
      </div>
      // <Button className="border-0 btn-transition" outline color="success">
      //     <FontAwesomeIcon icon={faCheck} />
      // </Button>
    ))

    return (
      <ListGroupItem style={{ zIndex: 30 }}>
        <div className="todo-indicator bg-info" />
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left mr-2">
              <CustomInput
                className="checkboxValues"
                type="checkbox"
                id={value.id}
                label="&nbsp;"
              />
            </div>
            <div className="widget-content-left mr-3">
              <div className="widget-content-left">
                <ModalImage
                  ToggleButton={(props) => (
                    <img
                      style={{ cursor: 'pointer' }}
                      width={42}
                      className="rounded"
                      src={
                        value.imagePath
                          ? Configuration.image_url + value.imagePath
                          : Configuration.defaultImg
                      }
                      alt=""
                      {...props}
                    />
                  )}
                  pickOne
                  onChange={(image) => {
                    setValues(
                      values.map((val) => {
                        if (val.id === value.id) {
                          return {
                            ...val,
                            imagePath: image[0].path,
                          }
                        }
                        return val
                      })
                    )
                    // return console.log(image);
                  }}
                />
              </div>
            </div>
            <div className="widget-content-left">
              <div className="widget-heading">
                <EditableElement text={value.value} type="input">
                  <Input
                    type="text"
                    name="duration"
                    value={value.value}
                    onChange={(e) => {
                      setValues(
                        values.map((val) => {
                          if (val.id === value.id) {
                            return {
                              ...val,
                              value: e.target.value,
                            }
                          }
                          return val
                        })
                      )
                    }}
                  />
                </EditableElement>
              </div>
              <div className="widget-subheading">
                {/* A short description here */}
              </div>
            </div>
            <div className="widget-content-right">
              <DragHander />
            </div>
          </div>
        </div>
      </ListGroupItem>
    )
  }
)
export default SortableAttributeItem
