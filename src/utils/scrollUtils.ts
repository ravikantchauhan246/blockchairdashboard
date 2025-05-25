/**
 * Utility functions for scroll behavior
 */

/**
 * Smoothly scrolls to the top of the page
 * Handles different browser behaviors and provides fallbacks
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  try {
    // Modern browsers
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior
    });
  } catch (error) {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
};

/**
 * Smoothly scrolls to a specific element
 * @param elementId - The ID of the element to scroll to
 * @param behavior - The scroll behavior ('smooth' or 'auto')
 */
export const scrollToElement = (elementId: string, behavior: ScrollBehavior = 'smooth'): void => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: behavior,
        block: 'start',
        inline: 'nearest'
      });
    }
  } catch (error) {
    console.warn(`Could not scroll to element with ID: ${elementId}`);
  }
};

/**
 * Debounced scroll to top function to prevent excessive calls
 * @param delay - Delay in milliseconds (default: 100ms)
 */
export const debouncedScrollToTop = (() => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (delay: number = 100) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      scrollToTop();
      timeoutId = null;
    }, delay);
  };
})();
