# link-scrolling
This is a small vanilla javascript helper to add link scrolling to a site


## Function Usage
To use the function give it a classname (that is added to links), a duration for the animation and the height of the navigation in the case that it is fixed as below:

```javascript
linkScrolling('scroll', 600, 0);
```

The alternative is that you can include the auto-scroll.js file which will automatically add the scrolling ability to any links with the class of scroll on them

Note: the variables don't need to be set as there are defaults (which are the ones used in the example)

Another Note: This only works for links that link to an id on the page, an example element is below

```html
<a href="#top" class="scroll">Scroll to top</a>
```
