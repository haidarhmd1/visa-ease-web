export const useBadgeStatusProcessColor = () => {
  const badgeStatusProcessColor = (status: string | undefined) => {
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
      case 'PAID':
        return '#0077CC';
      case 'PAYMENT_PENDING':
        return '#FF9800';
      case 'COMPLETED':
        return '#0077CC';
      case 'READY':
        return '#4CAF50';
      default:
        return '#CCCCCC';
    }
  };

  return { badgeStatusProcessColor };
};
