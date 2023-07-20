export default function Magics (Alpine) {
  /**
   * console.log() magic
   */
  Alpine.magic('log', () => consoleBase(console.log));

  /**
   * console.info() magic
   */
  Alpine.magic('info', () => consoleBase(console.info));

  /**
   * console.warn() magic
   */
  Alpine.magic('warn', () => consoleBase(console.warn));

  /**
   * console.error() magic
   */
  Alpine.magic('error', () => consoleBase(console.error));

  /**
   * console.table() magic
   */
  Alpine.magic('table', () => consoleBase(console.table));

  /**
   * console.assert() magic
   */
  Alpine.magic('assert', () => consoleBase(console.assert, true));

  /**
   * console.group() magic
   */
  Alpine.magic('group', () => consoleBase(console.group));

  /**
   * console.groupEnd() magic
   */
  Alpine.magic('groupEnd', () => () => console.groupEnd());

  /**
   * console.clear() magic
   */
  Alpine.magic('clear', () => () => console.clear());

  /**
   * @param fn - console function to use
   * @param spread - if true, then we will use spread operator to log each item separately, useful for arrays and the assert function
   * @returns {(function(*, *): void)|*}
   */
  const consoleBase = (fn, spread = false) => {
    return (subject, clear) => {
      /**
       * if clear is true, then we need to clear console before logging
       */
      if (clear) {
        console.clear();
      }

      if (Array.isArray(subject) || spread) {
        /**
         * if subject contains array, then we need to log each item separately
         * @type {boolean}
         */
        const containsArray = subject.filter(item => Array.isArray(item)).length > 0;
        if (containsArray || spread) {
          fn(...subject);
          return;
        }
      }

      fn(subject);
    };
  };

  /**
   * get or set width of element
   */
  Alpine.magic('width', element => subject => {
    if (subject) {
      element.style.width = subject;
      return;
    }

    return element.getBoundingClientRect().width;
  });

  /**
   * get or set height of element
   */
  Alpine.magic('height', element => subject => {
    if (subject) {
      element.style.height = subject;
      return;
    }

    return element.getBoundingClientRect().height;
  });

  /**
   * get the elements offset from the top of the document
   */
  Alpine.magic('offset', element => () => {
    const rect = element.getBoundingClientRect();
    const documentElement = document.documentElement;
    const scrollY = window.pageYOffset || document.body.scrollTop;
    const scrollX = window.pageXOffset || document.body.scrollLeft;

    return {
      top: rect.top + scrollY - documentElement.clientTop,
      left: rect.left + scrollX - documentElement.clientLeft
    };
  });

  /**
   * check if the element has a specific class
   */
  Alpine.magic('hasClass', element => subject => {
    if (subject) {
      return element.classList.contains(subject);
    }

    return false
  });

  /**
   * trim the string
   */
  Alpine.magic('trim', () => subject => {
    if (subject && typeof subject === 'string') {
      return subject.trim();
    }

    return subject;
  });
}
