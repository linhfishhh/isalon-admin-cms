import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { Grid, GridListTile, GridListTileBar } from '@material-ui/core';
import Button from 'components/Button';
import { FileImageOutline } from 'mdi-material-ui';
import { FormattedMessage } from 'react-intl';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import messages from './messages';
import {
  useStyles,
  InputFile,
  Label,
  DraggableWrapper,
  DraggableItem,
  ImageStyle,
} from './styles';

const ImagesUpload = props => {
  const { id, multiple, images, width, height, onChangeImage, type } = props;

  const containerRef = useRef();
  const classes = useStyles();

  const [didLayout, setDidLayout] = useState(false);
  const [widthWrapper, setWidthWrapper] = useState(0);
  const [imageRemove, setImageRemove] = useState([]);

  useEffect(
    () => () => {
      setDidLayout(false);
      setImageRemove([]);
    },
    [],
  );

  const onDidChangeImage = imageList => {
    onChangeImage(imageList);
  };

  useLayoutEffect(() => {
    if (!didLayout && containerRef.current) {
      const fullWidth = containerRef.current.offsetWidth;
      setWidthWrapper(multiple ? fullWidth - width : fullWidth);
      setDidLayout(true);
    }
  });

  const removeImage = (e, indexRemove) => {
    e.preventDefault();
    const removed = images.splice(indexRemove, 1)[0];
    if (removed.imageId) {
      imageRemove.push(removed);
      setImageRemove([...imageRemove]);
    }
    onDidChangeImage(images);
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const items = reorder(result.source.index, result.destination.index);
    onDidChangeImage(items);
  };

  const reorder = (startIndex, endIndex) => {
    const result = Array.from(images);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onChange = e => {
    e.preventDefault();
    const { files } = e.target;
    const numberImage = images.length;
    const imagesSelect = Array.from(files).map((file, index) => ({
      file,
      imageSource: URL.createObjectURL(file),
      new: true,
      imageIndex: numberImage + index + 1,
    }));
    const newList = images.concat(imagesSelect);
    onDidChangeImage(newList);
  };

  const imputWrapper = {
    width,
    height,
  };

  const rederItem = (image, index) => (
    <GridListTile component="div" className={classes.title}>
      <ImageStyle src={image.imageSource} alt="uploaded" />
      <GridListTileBar
        titlePosition="top"
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <Button
            icon="clean"
            type="iconButton"
            onClick={e => removeImage(e, index)}
          />
        }
      />
    </GridListTile>
  );

  return (
    <Grid container ref={containerRef}>
      {(multiple || !images.length) && (
        <Grid container item style={imputWrapper} alignItems="center">
          <InputFile
            type="file"
            id={id}
            onChange={e => onChange(e)}
            multiple={multiple}
            accept=".png,.jpg,.jpeg"
          />
          {type === 'icon' ? (
            <Label htmlFor={id}>
              <figure>
                <FileImageOutline className={classes.icon} />
              </figure>
              <FormattedMessage {...messages.chooseImage} />
            </Label>
          ) : (
            <Button
              icon="upload"
              onClick={() => document.getElementById(id).click()}
            />
          )}
        </Grid>
      )}
      <Grid item xs>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {provided => (
              <DraggableWrapper
                width={widthWrapper}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {images.map((item, index) => (
                  <Draggable
                    key={item.imageIndex}
                    draggableId={item.imageIndex}
                    index={index}
                    isDragDisabled={!multiple}
                  >
                    {providedItem => (
                      <DraggableItem
                        width={width}
                        height={height}
                        ref={providedItem.innerRef}
                        {...providedItem.draggableProps}
                        {...providedItem.dragHandleProps}
                      >
                        {rederItem(item, index)}
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DraggableWrapper>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};

ImagesUpload.defaultProps = {
  id: 'input-file',
  multiple: false,
  images: [],
  width: 150,
  height: 150,
  onChangeImage: () => {},
  type: 'icon',
};

ImagesUpload.propTypes = {
  id: PropTypes.string,
  multiple: PropTypes.bool,
  images: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  onChangeImage: PropTypes.func,
  type: PropTypes.oneOf(['icon', 'button']),
};

export default memo(ImagesUpload);
