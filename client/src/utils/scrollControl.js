let scrollPosition = 0;

export const lockScroll = () => {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
};

export const activeScroll = () => {
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("top");
  document.body.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
};
