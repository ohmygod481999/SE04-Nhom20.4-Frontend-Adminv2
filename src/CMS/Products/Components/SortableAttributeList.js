import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { ListGroup } from 'reactstrap'
import SortableAttributeItem from './SortableAttributeItem'

const SortableAttributeList = SortableContainer(({ items, setValues }) => {
  return (
    <ListGroup id="listValues" className="todo-list-wrapper" flush>
      {items && items.length > 0 ? (
        items.map((value, index) => (
          <SortableAttributeItem
            key={`item-${value.id}`}
            index={index}
            value={{ ...value, index: index }}
            setValues={setValues}
            values={items}
          />
        ))
      ) : (
        <td colSpan="6" className="text-center">
          <i>Chưa có giá trị nào</i>
        </td>
      )}
    </ListGroup>
  )
})

export default SortableAttributeList
