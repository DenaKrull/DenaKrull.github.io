window.pcs = window.pcs || {};
window.pcs.stopwatch = (function() {
    'use strict';
    const clock = $('#clock');


    function getDate() {
        let d = new Date();
        clock.append("current time: " + '<br>' + d.toLocaleTimeString());
    }
    
    function currentTime() {
        setInterval(() => {
            clock.empty();
            getDate();

        }, 1000);
    }

    function createClock() {
        getDate();
        currentTime();
    }

    return {
        createClock: createClock,

    };


}());