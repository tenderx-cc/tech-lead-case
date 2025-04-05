import { useEffect } from 'react';

export const useSetPageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title || 'Tengo';
  }, [title]);
};
