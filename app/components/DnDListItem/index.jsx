/**
 *
 * DnDListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragVertical } from 'mdi-material-ui';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
  marginTop: 5,
  border: '1px dashed rgb(235,235,235)',
});

function DnDListItem(props) {
  const { items, renderChild, onOrderChange } = props;

  const onDragEnd = result => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }
    const newOrderList = reorder(
      items,
      result.source.index,
      result.destination.index,
    );
    if (onOrderChange) {
      onOrderChange(newOrderList);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <List
            component="div"
            // {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id || index}
                draggableId={`item-${item.id || index}`}
                index={index}
              >
                {(providedItem, snapshotItem) => (
                  <ListItem
                    dense
                    component="div"
                    ref={providedItem.innerRef}
                    {...providedItem.draggableProps}
                    {...providedItem.dragHandleProps}
                    style={getItemStyle(
                      snapshotItem.isDragging,
                      providedItem.draggableProps.style,
                    )}
                  >
                    <DragVertical />
                    {renderChild(item, index)}
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DnDListItem.defaultProps = {
  items: [],
};

DnDListItem.propTypes = {
  items: PropTypes.array,
  renderChild: PropTypes.func,
  onOrderChange: PropTypes.func,
};

export default DnDListItem;
