/*
Use sharing to support large numbers of fine-grained objects efficiently. 

The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently. Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.

Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects. (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).

An example of the Flyweight Pattern is within the JavaScript engine itself which maintains a list of immutable strings that are shared across the application.

Other examples include characters and line-styles in a word processor, or 'digit receivers' in a public switched telephone network application. You will find flyweights mostly in utility type applications such as word processors, graphics programs, and network apps; they are less often used in data-driven business type applications.

*/


//==============================================
// flyweight.js
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

//==============================================
// Flyweight 
// JavaScript does not support class-based 
// inheritance therefore the abstract classes.
// we must ensure this consistency ourselves
// that properties and methods match!!!
//----------------------------------------------
// Note here again in OOP we would define a interface
// or abstract classes.   
//==============================================

function Flyweight(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
}

// This is our FlyWeight Factory to manage the 
// various FlyWeight object types
var FlyWeightFactory = (function () {
    var flyweights = {};

    return {
        get: function (make, model, processor) {

            if (!flyweights[make + model]) {
                flyweights[make + model] =
                    new Flyweight(make, model, processor);
            }

            return flyweights[make + model];
        },
        getCount: function () {
            var count = 0;
            for (var f in flyweights) count++;
            return count;
        }
    }
})();

// Our computer collection object that manages our data
// which is a collection of FlyWeight objects stored in the 
// variable computers which is keep private via closure.
function ComputerCollection() {
    var computers = {};
    var count = 0;

    return {
        add: function (make, model, processor, memory, tag) {
            computers[tag] =
                new Computer(make, model, processor, memory, tag);
            count++;
        },
        get: function (tag) {
            return computers[tag];
        },
        getCount: function () {
            return count;
        }
    };
}
// This function utilizes the FlyWeightFactory function above 
// to load the FlyWeight objects into the collection
var Computer = function (make, model, processor, memory, tag) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;

    this.getMake = function () {
        return this.flyweight.make;
    }
}

//=============================================
// run_flyweight()
//=============================================
function run_flyweight() {
    // Create the collection maintained by the factory
    var computers = new ComputerCollection();
    // Add multiple computers to the collection 
    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");
    // Get the count of computers in the collection of FlyWeight objects
    log.add("Computers: " + computers.getCount());
    // Get the count of specific FlyWeight object types being monitored by the factory
    log.add("Flyweights: " + FlyWeightFactory.getCount());

    log.show();
}

//=============================================



//=============================================
// FlyWeight NameSpace 
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

//==============================================
// Create the "Classic" namespace with the
// AbstractFactory namespace which is also in
// the flyweight.js
//==============================================
JsGangOfFour.namespace("Classic").Flyweight = (function () {

    // prototype flyweights
    var Proto = function (id, make, model, processor) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.processor = processor;
    }
    var protoDell = new Proto(1, "Dell", "Studio XPS", "Intel");
    var protoHp = new Proto(2, "HP", "Envy", "Intel");

    var Computers = function (memory, tag) {
        this.memory = memory;
        this.tag = tag;
    };

    // This function utilizes is basically a Factory Pattern 
    // to load the FlyWeight objects into the collection
    function create(make, model, processor, memory, tag) {

        if (make === "Dell" && model === "Studio XPS") {
            Computers.prototype = protoDell;
        } else if (make === "HP" && model === "Envy") {
            Computers.prototype = protoHp;
        }

        return new Computers(memory, tag);
    }

    //==============================================
    // Our computer collection object that manages our data
    // which is a collection of FlyWeight objects stored in the 
    // variable computers which is keep private via closure.
    //==============================================
    // IMPORTANT:  Modern Revealing Module Pattern
    //==============================================
    // A Revealing Module named Flyweight returns (i.e. reveals) 
    // two items: create, which, in fact, is a Factory Method 
    // pattern, and ComputerCollection which is list of 
    // computers we are managing.
    var ComputersCollection = function () {
        var computers = {};
        var count = 0;

        return {
            add: function (computer) {
                computers[computer.tag] = computer;
                count++;
            },
            get: function (tag) {
                return computers[tag];
            },
            getCount: function () {
                return count;
            },
            getPrototypeCount: function () {
                var types = {};
                for (var tag in computers) types[computers[tag].id] = true;

                var count = 0;
                for (var t in types) count++;
                return count;
            }
        };
    }

    return {
        create: create,
        ComputersCollection: ComputersCollection
    };

})();

//==============================================
// run_OptimizedFlyWeight()
//==============================================
function run_OptimizedFlyWeight() {

    // A Revealing Module named Flyweight returns (i.e. reveals) 
    // two items: create, which, in fact, is a Factory Method 
    // pattern, and ComputerCollection which is list of 
    // computers we are managing.
    var flyweight = JsGangOfFour.Classic.Flyweight;

    var computers = new flyweight.ComputersCollection();

    computers.add(flyweight.create("Dell", "Studio XPS", "Intel", "5G", "Y755P"));
    computers.add(flyweight.create("Dell", "Studio XPS", "Intel", "6G", "X997T"));
    computers.add(flyweight.create("Dell", "Studio XPS", "Intel", "2G", "U8U80"));
    computers.add(flyweight.create("Dell", "Studio XPS", "Intel", "2G", "NT777"));
    computers.add(flyweight.create("Dell", "Studio XPS", "Intel", "2G", "0J88A"));
    computers.add(flyweight.create("HP", "Envy", "Intel", "4G", "CNU883701"));
    computers.add(flyweight.create("HP", "Envy", "Intel", "2G", "TXU003283"));

    log.add("Computers: " + computers.getCount());
    log.add("Prototypes: " + computers.getPrototypeCount());

    log.show();
}