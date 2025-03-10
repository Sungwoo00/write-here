export function getWidth(element: HTMLElement | null) {
  if (!element) return 0;
  return element.offsetWidth;
}

export function watchWidth(
  element: HTMLElement | null,
  onChange: (width: number) => void
) {
  if (!element) return () => {};

  const resizeObserver = new ResizeObserver(() => {
    const width = getWidth(element);
    onChange(width);
  });

  resizeObserver.observe(element);

  return () => resizeObserver.disconnect();
}
