const getDateTime = (date) => {
  if (!(date instanceof Date)) {
    return "Invalid date";
  }

  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds === 0) {
    return "now";
  }

  let interval = seconds / 31536000;
  if (interval > 1) {
    const years = Math.floor(interval);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    const months = Math.floor(interval);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  interval = seconds / 604800;
  if (interval > 1) {
    const weeks = Math.floor(interval);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
    const days = Math.floor(interval);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  interval = seconds / 3600;
  if (interval > 1) {
    const hours = Math.floor(interval);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  interval = seconds / 60;
  if (interval > 1) {
    const minutes = Math.floor(interval);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const sec = Math.floor(seconds);
  return `${sec} second${sec > 1 ? "s" : ""} ago`;
};

export { getDateTime };
