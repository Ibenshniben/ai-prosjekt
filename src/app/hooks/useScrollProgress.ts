import { useEffect } from 'react';

export function useScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.overflow-x-auto');
      if (!scrollContainer) return;

      const totalScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;
      const progress = (currentScroll / totalScroll) * 100;

      const progressBar = document.querySelector('.progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    const scrollContainer = document.querySelector('.overflow-x-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
} 