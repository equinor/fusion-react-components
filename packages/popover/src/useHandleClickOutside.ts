import { useEffect, useRef } from 'react';

type HandleClickOutsideType = {
  ref: React.RefObject<HTMLSpanElement>;
};

export default function useHandleClickOutside(callback: (visibility: boolean) => void): HandleClickOutsideType {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLSpanElement)) {
        callback.apply(null, [false]);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [callback]);

  return { ref };
}
