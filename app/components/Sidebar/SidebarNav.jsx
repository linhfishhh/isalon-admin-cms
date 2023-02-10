import React, { useState, forwardRef } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';
import './perfect-scrollbar.css';
import { withRouter } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import history from 'utils/history';
import {
  CategoryText,
  LinkText,
  Link,
  Category,
  CategoryIconLess,
  CategoryIconMore,
  Scrollbar,
  List,
  Items,
} from './styles';
import messages from './messages';

const SidebarCategory = props => {
  const { name, icon: Icon, isOpen, isCollapsible, ...rest } = props;
  return (
    <Category {...rest}>
      <Icon />
      <CategoryText>{name}</CategoryText>
      {isCollapsible && (isOpen ? <CategoryIconMore /> : <CategoryIconLess />)}
    </Category>
  );
};
SidebarCategory.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.any,
  isOpen: PropTypes.bool,
  isCollapsible: PropTypes.bool,
};

const onClick = (event, path) => {
  if (history.location.pathname === path) {
    event.preventDefault();
  }
};

const NavLink = forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const SidebarLink = ({ name, to }) => (
  <Link
    button
    dense
    component={NavLink}
    to={to}
    onClick={event => {
      onClick(event, to);
    }}
    activeClassName="active"
  >
    <LinkText>{name}</LinkText>
  </Link>
);
SidebarLink.propTypes = {
  name: PropTypes.string,
  to: PropTypes.any,
};

const SidebarNav = props => {
  const { categories, match, intl } = props;

  const categoryPath = match.url.split('/')[2];
  const collapseStatus = categories.map(
    category =>
      (category.childKey && category.childKey.includes(categoryPath)) ||
      category.open,
  );
  const [collapse, setCollapse] = useState(collapseStatus);

  const toggle = index => {
    const newCollapse = collapse.map(() => false);
    newCollapse[index] = !collapse[index];
    setCollapse(newCollapse);
  };

  return (
    <Scrollbar>
      <List disablePadding>
        <Items>
          {categories.map((category, index) => {
            const showChild = category.children
              ? !isEmpty(category.children.find(item => !item.deep))
              : false;
            return showChild ? (
              <React.Fragment key={category.id}>
                <SidebarCategory
                  isOpen={collapse[index]}
                  isCollapsible
                  name={intl.formatMessage(messages[category.id])}
                  icon={category.icon}
                  button
                  onClick={() => toggle(index)}
                />
                <Collapse in={collapse[index]} timeout="auto" unmountOnExit>
                  {category.children.map(
                    route =>
                      !route.deep && (
                        <SidebarLink
                          key={route.id}
                          name={intl.formatMessage(messages[route.id])}
                          to={route.path}
                          icon={route.icon}
                        />
                      ),
                  )}
                </Collapse>
              </React.Fragment>
            ) : (
              <SidebarCategory
                key={category.id}
                isCollapsible={false}
                name={intl.formatMessage(messages[category.id])}
                to={category.path}
                activeClassName="active"
                component={NavLink}
                icon={category.icon}
              />
            );
          })}
        </Items>
      </List>
    </Scrollbar>
  );
};

SidebarNav.propTypes = {
  categories: PropTypes.array.isRequired,
  match: PropTypes.any,
  intl: intlShape,
};

export default injectIntl(withRouter(SidebarNav));
