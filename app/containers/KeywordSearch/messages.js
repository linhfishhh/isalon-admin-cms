/*
 * Keyword search Messages
 *
 * This contains all the text for the Keyword search container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.KeywordSearch';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Keyword search',
  },
  hotKeyword: {
    id: `${scope}.hotKeyword`,
    defaultMessage: 'Keyword search name',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add keyword search',
  },
  list: {
    id: `${scope}.list`,
    defaultMessage: 'Keyword search List',
  },
  topKeywordSearchList: {
    id: `${scope}.topKeywordSearchList`,
    defaultMessage: 'Top keyword search List',
  },
  hotKeywordIsRequired: {
    id: `${scope}.hotKeywordIsRequired`,
    defaultMessage: 'Please enter keyword search name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this keyword search?',
  },
});
