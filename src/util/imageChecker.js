const _images = {};

const imageChecker = (url, cache = true) => {
  return new Promise((resolve, reject) => {
    if (_images[url]) return resolve(_images[url]);

    const image = new Image();
    image.src = url;

    image.onload = () => {
      const data = {url, width: image.width, height: image.height};
      if (cache) _images[url] = data;

      return resolve(data);
    };

    image.onerror = (err) => {
      return reject(err);
    }
  });
};

export default imageChecker;