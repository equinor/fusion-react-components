import { Icon } from '@equinor/eds-core-react';
import { fullscreen, fullscreen_exit } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';

Icon.add({
  fullscreen,
  fullscreen_exit,
});

export const FullscreenIcon = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleSetIsFullScreen() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleSetIsFullScreen);
    return () => document.removeEventListener('fullscreenchange', handleSetIsFullScreen);
  }, []);
  return <Icon name={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} />;
};
