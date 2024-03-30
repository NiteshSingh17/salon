import dayjs from "dayjs";
export const CreateDaysRange = (start, end, range = 1, rangeType = "day") => {
  let ranges = [];
  let currentDate = dayjs(start);
  while (currentDate.isBefore(end) && !currentDate.isSame(end)) {
    ranges.push(currentDate);
    currentDate = currentDate.add(range, rangeType);
  }
  return ranges;
};

export const getTimeDate = (time) => {
  return dayjs(`2001/01/01 ${time}`, "YYYY/MM/DD HH:mm a");
};

export const getImageData = async (uri) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  return theBlob;
};

export const formDataAppendObject = (fd, obj, key) => {
  var i, k;
  for (i in obj) {
    k = key ? key + "[" + i + "]" : i;
    if (typeof obj[i] == "object") formDataAppendObject(fd, obj[i], k);
    else fd.append(k, obj[i]);
  }
};

export const GetTodayDate = () => {
  return new dayjs();
};

export const getTimeRange = (date) => {
  const startTime = dayjs(date ?? GetTodayDate())
    .set("h", 0)
    .set("m", 0)
    .set("s", 0);
  const endTime = dayjs(startTime).add(1, "day");
  const range = CreateDaysRange(startTime, endTime, 15, "minute");
  return range;
};

export const getImageMetaData = (image) => {
  return {
    uri: image,
    type: image.split(".").at(-1),
    name: image.slice(0, image.lastIndexOf(".")),
  };
};

export const isLocalImage = (imageURL) => {
  return (
    imageURL.startsWith("https://") === false &&
    imageURL.startsWith("http://") === false
  );
};
