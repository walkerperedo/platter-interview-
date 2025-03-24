const container = document.querySelector('.container');
const content = document.querySelector('.content');
const scrollbar = document.querySelector('.scrollbar');
const thumb = document.querySelector('.thumb');

let isDragging = false;
let startX;
let scrollLeft;

const updateScrollbar = () => {
  const contentWidth = content.scrollWidth;
  const containerWidth = container.offsetWidth;

  // Calculate the width of the thumb based on the container width and content width
  const scrollbarWidth = containerWidth * (containerWidth / contentWidth);

  thumb.style.width = `${scrollbarWidth}px`;

  // Initialize the position of the thumb based on the scroll position
  const scrollPercentage = content.scrollLeft / (content.scrollWidth - container.offsetWidth);
  const thumbPosition = scrollPercentage * (scrollbar.offsetWidth - thumb.offsetWidth);
  thumb.style.left = `${thumbPosition}px`;
};

// Handle the dragging of the thumb
const handleMouseDown = (e) => {
  isDragging = true;
  startX = e.pageX - thumb.offsetLeft;
  scrollLeft = content.scrollLeft;
};

const handleMouseMove = (e) => {
  if (!isDragging) return;
  const x = e.pageX - startX;
  const scrollPercentage = (x / (scrollbar.offsetWidth - thumb.offsetWidth));
  content.scrollLeft = scrollPercentage * (content.scrollWidth - container.offsetWidth);
};

const handleMouseUp = () => {
  isDragging = false;
};

thumb.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Sync scroll position with thumb
content.addEventListener('scroll', () => {
  const scrollPercentage = content.scrollLeft / (content.scrollWidth - container.offsetWidth);
  const thumbPosition = scrollPercentage * (scrollbar.offsetWidth - thumb.offsetWidth);
  thumb.style.left = `${thumbPosition}px`;
});

// Update scrollbar size on window resize
window.addEventListener('resize', updateScrollbar);

// Handle mouse wheel scroll to move the content
container.addEventListener('wheel', (e) => {
  if (e.deltaY !== 0) {
    content.scrollLeft += e.deltaY;
  }
});

// Initialize the scrollbar size and position
updateScrollbar();
