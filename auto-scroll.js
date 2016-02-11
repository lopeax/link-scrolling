// Scroll links
(function(classie, duration, navHeight){
    // Default navHeight, change if fixed nav
    if(typeof navHeight != 'number' || navHeight <= 0){
        navHeight = 0;
    }

    // Duration of the animation
    if(typeof duration != 'number' || duration <= 0){
        duration = 600;
    }

    // The class of the link to scroll
    if(typeof classie != 'string' || classie == ''){
        classie = 'scroll';
    }

    // Do everything on dom load
    document.addEventListener('DOMContentLoaded', function() {
        'use strict'

        // Click event with ios support
        var clicked;
        if(navigator.userAgent.match(/iPad/i)) {
            clicked = 'touchstart';
        } else {
            clicked = 'click';
        }

        // Element to hook the scroll to // TODO make this a default variable
        var links = document.querySelectorAll('a.' + classie);

        // Top of the page
        var root;
        if(/firefox|trident/i.test(navigator.userAgent)) {
            root = document.documentElement;
        } else {
            root = document.body;
        }

        // The timing function
        var easeInOutCubic = function(t, b, c, d) {
            if ((t/=d/2) < 1){
                return c/2*t*t*t + b;
            } else {
                return c/2*((t-=2)*t*t + 2) + b;
            }
        }

        // Loop through all the links
        for (var i = 0, len = links.length; i < len; i++) {

            // Add a click event to each of the links
            links.item(i).addEventListener(clicked, function(e) {

                // The start time
                var startTime;

                // The start position
                var startPos = root.scrollTop;

                // The end position
                var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top - navHeight;

                // Maximum scroll distance
                var maxScroll = root.scrollHeight - window.innerHeight;

                // Where to scroll to
                var scrollEndValue;
                if(startPos + endPos < maxScroll){
                    scrollEndValue = endPos;
                } else {
                    scrollEndValue = maxScroll - startPos;
                }

                // Do the scroll
                var scroll = function(timestamp) {

                    // Set the start time to be the timestamp,
                    // if it is not already set yet
                    startTime = startTime || timestamp;

                    // Set the elapsed time to be the current
                    // timestamp minus the start time
                    var elapsed = timestamp - startTime;

                    // Set the animation
                    var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);

                    // Do the animation
                    root.scrollTop = progress;

                    // Animate the animation
                    if(elapsed < duration){
                        requestAnimationFrame(scroll);
                    }
                }

                // Use request animation frame to do the animation
                requestAnimationFrame(scroll);

                // Stop the link from propagating
                e.preventDefault();
            });
        }
    });
})();
