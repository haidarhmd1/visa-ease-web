export const badgeProcess = status => {
  switch (status) {
    case 'NOT_STARTED':
      return '#CCCCCC';
    case 'IN_PROGRESS':
      return '#0077CC';
    case 'CANCELLED':
      return '#FF0000';
    case 'PENDING':
      return '#FFC107';
    case 'NOT_PAID':
      return '#FFB6C1';
    // eslint-disable-next-line sonarjs/no-duplicated-branches
    case 'PAID':
      return '#0077CC';
    case 'PAYMENT_PENDING':
      return '#FF9800';
    // eslint-disable-next-line sonarjs/no-duplicated-branches
    case 'COMPLETED':
      return '#0077CC';
    case 'READY':
      return '#4CAF50';

    // eslint-disable-next-line sonarjs/no-duplicated-branches
    default:
      return '#CCCCCC';
  }
};
