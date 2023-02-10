/*
 * ProductReviewList Messages
 *
 * This contains all the text for the ProductReviewList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductReviewList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'ProductReview list',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this review?',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add reply',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit reply',
  },
});
