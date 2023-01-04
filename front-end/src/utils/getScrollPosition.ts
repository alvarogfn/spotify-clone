function calculateScrollPosition(el: HTMLElement) {
  return (el.scrollTop * 100) / (el.scrollHeight - el.clientHeight);
}

export const getScrollPosition = {
  byEvent(e: Event) {
    const el = e.target as HTMLElement;
    return calculateScrollPosition(el);
  },
  byElement: calculateScrollPosition,
};
