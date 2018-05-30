export function scrollBottom() {
  if (typeof window === 'undefined') return;
  window.onscroll = function() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;
  
    console.log('offset = ' + offset);
    console.log('height = ' + height);
  
    if (offset === height) {
      console.log('At the bottom');
    }
  };
}