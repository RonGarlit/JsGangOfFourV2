//==============================================
// memento.js
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

// our base object that will hold the data that 
// will turned into various momento object in JSON form.
var Person = function (name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
}

// Functionality that will be managing using the momento object
Person.prototype = {
    hydrate: function () {

        var memento = JSON.stringify(this);
        return memento;
    },
    dehydrate: function (memento) {

        var m = JSON.parse(memento);
        for (var prop in m) this[prop] = m[prop];
    }
}

var CareTaker = function () {

    this.mementos = {};

    this.add = function (key, memento) {
        this.mementos[key] = memento;
    },
        this.get = function (key) {
            return this.mementos[key];
        }
}

//=============================================
// run_Memento
//=============================================
function run_Memento() {

    var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
    var john = new Person("John Wang", "48th Street", "San Jose", "CA");

    var caretaker = new CareTaker();

    // save state

    caretaker.add(1, mike.hydrate());
    caretaker.add(2, john.hydrate());

    // mess up their names

    mike.name = "King Kong";
    john.name = "Superman";

    // restore original state

    mike.dehydrate(caretaker.get(1));
    john.dehydrate(caretaker.get(2));

    log.add(mike.name);
    log.add(john.name);

    log.show();
}


//=============================================
// Memento NameSpace 
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
JsGangOfFour.namespace("Classic").Memento = (function () {

    // Functionality that will be managing using the momento object
    var hydratable = {
        hydrate: function () {
            this.memento = JSON.stringify(this);
        },
        dehydrate: function () {

            if (this.memento) {
                var m = JSON.parse(this.memento);
                for (var prop in m) this[prop] = m[prop];

                this.memento = null;
            }
        },

        memento: null
    }

    var makeHydratable = function (obj) {
        for (var prop in hydratable) {
            obj[prop] = hydratable[prop];
        }
        return obj;
    };

    return {
        makeHydratable: makeHydratable
    }


})();

//=============================================
// run_OptimizedMemento
//=============================================
function run_OptimizedMemento() {

    // our base object that will hold the data that 
    // will turned into various momento object in JSON form.
    var Person = function (name, street, city, state) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
    }

    var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
    var john = new Person("John Wang", "48th Street", "San Jose", "CA");

    JsGangOfFour.Classic.Memento.makeHydratable(mike);
    JsGangOfFour.Classic.Memento.makeHydratable(john);

    // save state

    mike.hydrate();
    john.hydrate();

    // mess up their names

    mike.name = "King Kong";
    john.name = "Superman";

    // restore original state

    mike.dehydrate();
    john.dehydrate();

    log.add(mike.name);
    log.add(john.name);

    log.show();
}
