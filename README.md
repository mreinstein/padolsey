## padolsey

procedurally generate padolsey patterns

![Alt text](padolsey.png "sample padolsey pattern")


### es modules usage

```javascript
import padolsey from 'padolsey'


window.addEventListener('click', function () {
  document.body.style.background = `url(${padolsey()})`
})
```
