## padolsey

procedurally generate padolsey patterns

![Alt text](padolsey.png "sample padolsey pattern")


### usage

```javascript

const padolsey = require('padolsey')


window.addEventListener('click', function() {
  document.body.style.background = `url(${padolsey()})`
})
```
