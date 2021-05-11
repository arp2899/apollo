export const getApproxTimeInNumber = (time) => {
  return parseFloat(time.slice(0, time.length - 1));
};

export const getTimeInFormat = (minutes, seconds) => {
  return `${minutes> 9 ? minutes: "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
};
export const getUrlPath = (path) => {
  return path;
};

