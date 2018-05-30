### Lazy load
I :clap: how [Medium](https://medium.com) arranged progressive image loading, so I tried something similar here.
Because API doesn't contain placeholder variant or some kind of the small size thumbnail, I've created two new fields on the item (while performing [normalization](https://github.com/marija-marinkovic-m/React-Challenge---Part-2/blob/84b56957d56cbe301b66f8d59ab308ef2bdd5d06/src/core/api/normalizers.js#L48-L49), it is important for these images to have the same ratio as originals.  
Checker utility function tries to fetch the source provided and resolves/rejects the result, for the sake of presentation I added this [delay](https://github.com/marija-marinkovic-m/React-Challenge---Part-2/blob/84b56957d56cbe301b66f8d59ab308ef2bdd5d06/src/util/imageChecker.js#L16-L19) so you don't miss the beauty of package :ribbon: and blurred entrance.

The [img component](https://github.com/marija-marinkovic-m/React-Challenge---Part-2/blob/master/src/components/ImgPreload.js) does the validation by implementing checker function and passing results using this fresh, simple technique for sharing code between React components [Render Props](https://reactjs.org/docs/render-props.html).

### Styled components
Why? Here's this famous image for reference.
![styled](https://cdn-images-1.medium.com/max/1000/1*yBxZo9LNEjRaL7eKUBqRSA.png)


### Load more
I thought it would be interesting to produce some kind of the infinite load illusion (so that again Image components can shine in all of their glory, with that blurriness and charm). I achieved this by relying on App component's internal state. Upon receiving success response from API, App uses its' `loadedData` param as a bucket small chunks of items to be displayed, and then it listens for scroll/resize events to decide whether it should catch more items to the bucket. Here, again I added a [delay](https://github.com/marija-marinkovic-m/React-Challenge---Part-2/blob/84b56957d56cbe301b66f8d59ab308ef2bdd5d06/src/App.js#L82-L94) for the illusion to be complete.

### Sorting
SortBy magic lives in this few simple lines, everything else is pure cosmetics: 
```javascript
function sortBy(field, reverse, primer) {

  const key = primer ?
    function (x) { return primer(x[field]) } :
    function (x) { return x[field] };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    // eslint-disable-next-line
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}

export default sortBy;
```

### Other libraries
As you can see, I avoid using additional modules/libraries, if I don't have to. Here I've used `currency-symbol-map` for convenience, and fetch polyfill from caution.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).