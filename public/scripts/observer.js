//==============================================
// Observer.js
//==============================================
// log helper
// Used to add() to var log
// then display in alert box
// via show() method
//==============================================
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

// Create the Click observer
function Click() {
    this.handlers = [];  // observers
}

// Add the functionality needed
Click.prototype = {
    subscribe: function (fn) {
        this.handlers.push(fn);
    },

    unsubscribe: function (fn) {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function (o, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach(function (item) {
            item.call(scope, o);
        });
    }
}

//=============================================
// run_Observer()
//=============================================
function run_Observer() {

    var clickHandler = function (item) {
        log.add("fired: " + item);
    };

    var click = new Click();

    click.subscribe(clickHandler);
    click.fire('event #1');

    click.unsubscribe(clickHandler);
    click.fire('event #2');

    click.subscribe(clickHandler);
    click.fire('event #3');

    log.show();
}



//=============================================
// run_OptimizedObserver()
//=============================================
function run_OptimizedObserver() {

    var div = jQuery("#div");

    // attach three event handlers
    div.on("poke", function () { log.add("poke handler 1"); });
    div.on("poke", function () { log.add("poke handler 2"); });
    div.on("poke", function () { log.add("poke handler 3"); });

    // trigger event
    div.trigger('poke');

    log.add('The example is good.  BUT will not work as we are going to pollute this app with JQuery.  :-)');
    log.show();

    // detach event handlers
    div.off("poke");

}
