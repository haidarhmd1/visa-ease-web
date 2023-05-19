import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useRefreshOnFocus = refetch => {
  const firstTimeReference = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeReference.current) {
        firstTimeReference.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
};
