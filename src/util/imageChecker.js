import { DELAY_FOR_MIMICKING } from "../constants";

const _images = {};

const imageChecker = (url, cache = false) => {
  return new Promise((resolve, reject) => {
    if (_images[url]) return resolve(_images[url]);

    const image = new Image();
    image.src = url;

    image.onload = () => {
      const data = {url, width: image.width, height: image.height};
      if (cache) _images[url] = data;

      // @TEMP: mimic image response
      setTimeout(() => {
        resolve(data);
      }, DELAY_FOR_MIMICKING);
      // return resolve(data);
    };

    image.onerror = (err) => {
      return reject(err);
    }
  });
};

export default imageChecker;