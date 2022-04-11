//==============================================
// Interpreter.js
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

// Create the iterator function
var Iterator = function (items) {
    this.index = 0;
    this.items = items;
}

// Build out the prototype with base functions
Iterator.prototype = {
    first: function () {
        this.reset();
        return this.next();
    },
    next: function () {
        return this.items[this.index++];
    },
    hasNext: function () {
        return this.index <= this.items.length;
    },
    reset: function () {
        this.index = 0;
    },
    each: function (callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}

//=============================================
// run_Iterator
//=============================================
function run_Iterator() {

    var items = ["one", 2, "circle", true, "Applepie"];
    var iter = new Iterator(items);

    // using for loop

    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        log.add(item);
    }

    log.add("");

    // using Iterator's each method

    iter.each(function (item) {
        log.add(item);
    });

    log.show();
}

//=============================================
// Iterator NameSpace 
//=============================================
// JavaScript does not support class-based 
// inheritance or abstract classes.
// we must ensure this consistency ourselves
// that properties and methods match!!!
//==============================================
// Create our namespace called "JsGangOfFour".
//
// This is based on the NameSpace Pattern and 
// Module Pattern. This block of code should 
// be at the top of separate files to better 
// manage codebase.
//
// More importantly creating a structure to 
// avoid name collisions globally under one varable
// called JsGangOfFour.
//==============================================
var JsGangOfFour = {
    namespace: function (name) {
        var parts = name.split(".");
        var ns = this;

        for (var i = 0, len = parts.length; i < len; i++) {
            ns[parts[i]] = ns[parts[i]] || {};
            ns = ns[parts[i]];
        }

        return ns;
    }
};

//=============================================
// Classic NameSpace 
//=============================================
JsGangOfFour.namespace("Classic").Iterator = (function () {

    // Create the iterator function
    var Iterator = function (items) {
        this.index = 0;
        this.items = items;
    }

    // Build out the prototype with base functions
    Iterator.prototype = {
        first: function () {
            this.reset();
            return this.next();
        },
        next: function () {
            return this.items[this.index++];
        },
        hasNext: function () {
            return this.index <= this.items.length;
        },
        reset: function () {
            this.index = 0;
        },
        each: function (callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        }
    }

    return {
        Iterator: Iterator
    }

})();

//=============================================
// run_OptimizedIterator
//=============================================
function run_OptimizedIterator() {

    var items = ["one", 2, "circle", true, "Applepie"];
    var iter = new JsGangOfFour.Classic.Iterator.Iterator(items);

    // using for loop

    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        log.add(item);
    }

    log.add("");

    // using Iterator's each method

    iter.each(function (item) {
        log.add(item);
    });

    log.show();
}
