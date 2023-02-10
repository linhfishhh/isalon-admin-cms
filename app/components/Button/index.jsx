import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Tooltip,
  Button as MuiButton,
  IconButton as MuiIconButton,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as AgreeIcon,
  FileCopy as CopyIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  ListAlt as DetailIcon,
  Menu as MenuIcon,
  Reply as ReplyIcon,
  Sort as SortIcon,
} from '@material-ui/icons';
import {
  Power as SignOutIcon,
  TuneVertical as OptionIcon,
  FileExcelOutline as ExcelIcon,
} from 'mdi-material-ui';
import { injectIntl, intlShape } from 'react-intl';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import messages from './messages';

const NewButton = styled(MuiButton)(spacing);
const NewIconButton = styled(MuiIconButton)(spacing);

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

const optionsDefault = { showIcon: true };

const iconList = {
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  upload: CloudUploadIcon,
  save: SaveIcon,
  cancel: CancelIcon,
  agree: AgreeIcon,
  copy: CopyIcon,
  clean: ClearIcon,
  close: CloseIcon,
  detail: DetailIcon,
  signOut: SignOutIcon,
  menu: MenuIcon,
  option: OptionIcon,
  reply: ReplyIcon,
  excel: ExcelIcon,
  sort: SortIcon,
};

const NavLink = forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

function Button(props) {
  const {
    intl,
    name,
    icon,
    action,
    type,
    fontSize,
    options,
    href,
    ...ref
  } = props;

  const classes = useStyles();

  const fullOptions = { ...optionsDefault, ...options };

  const iconRender = () => {
    const Icon = iconList[icon];
    if (type === 'iconButton') {
      return <Icon fontSize={fontSize} />;
    }
    return (
      <>
        {fullOptions.showIcon && (
          <Icon fontSize={fontSize} className={classes.leftIcon} />
        )}
        {name || intl.formatMessage(messages[icon])}
      </>
    );
  };

  return (
    <>
      {type === 'iconButton' ? (
        <Tooltip title={name || intl.formatMessage(messages[icon])}>
          {href ? (
            <NewIconButton component={NavLink} to={href} {...ref}>
              {iconRender()}
            </NewIconButton>
          ) : (
            <NewIconButton onClick={action} {...ref}>
              {iconRender()}
            </NewIconButton>
          )}
        </Tooltip>
      ) : (
        <>
          {href ? (
            <NewButton
              mr={2}
              variant="contained"
              color="primary"
              component={NavLink}
              to={href}
              {...ref}
            >
              {iconRender()}
            </NewButton>
          ) : (
            <NewButton
              mr={2}
              variant="contained"
              color="primary"
              onClick={action}
              {...ref}
            >
              {iconRender()}
            </NewButton>
          )}
        </>
      )}
    </>
  );
}

Button.propTypes = {
  intl: intlShape,
  name: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.oneOf([
    'add',
    'edit',
    'delete',
    'upload',
    'save',
    'cancel',
    'agree',
    'copy',
    'clean',
    'close',
    'detail',
    'signOut',
    'menu',
    'option',
    'reply',
    'excel',
  ]),
  type: PropTypes.oneOf(['default', 'iconButton']),
  fontSize: PropTypes.oneOf(['default', 'small', 'large']),
  options: PropTypes.object,
  href: PropTypes.string,
};

export default injectIntl(Button);
