//==============================================
// strategy.js
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

// Create the Shipping object
var Shipping = function () {
    this.company = "";
};
// Add functionality to the shipping object
Shipping.prototype = {

    setStrategy: function (company) {
        this.company = company;
    },
    calculate: function (package) {
        return this.company.calculate(package);
    }
};

// Strategy Object
var UPS = function () {
    this.calculate = function (package) {

        // calculations...

        return "$45.95";
    }
};

// Strategy Object
var USPS = function () {
    this.calculate = function (package) {

        // calculations...

        return "$39.40";
    }
};

// Strategy Object
var Fedex = function () {
    this.calculate = function (package) {

        // calculations...

        return "$43.20";
    }
};

//=============================================
// run_Strategy()
//=============================================
function run_Strategy() {

    var package = { from: "76712", to: "10012", weigth: "lkg" };

    // the 3 strategies

    var ups = new UPS();
    var usps = new USPS();
    var fedex = new Fedex();

    var shipping = new Shipping();
    shipping.setStrategy(ups);
    log.add("UPS Strategy: " + shipping.calculate(package));

    shipping.setStrategy(usps);
    log.add("USPS Strategy: " + shipping.calculate(package));

    shipping.setStrategy(fedex);
    log.add("Fedex Strategy: " + shipping.calculate(package));

    log.show();
}


//=============================================
// Strategy NameSpace 
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
// Create the "Classic" namespace 
//==============================================
JsGangOfFour.namespace("Classic").Strategy = (function () {
    // Create the Shipping object 
    var Shipping = function () {
        var company = "";

        this.setStrategy = function (name) {
            if (name === "UPS") {
                company = new UPS();
            } else if (name === "USPS") {
                company = new USPS();
            } else if (name === "Fedex") {
                company = new Fedex();
            }
        };

        this.calculate = function (package) {
            return company.calculate(package);
        }
    };

    // Strategy Object
    var UPS = function () {
        this.calculate = function (package) {

            // calculations...

            return "$45.95";
        }
    };

    // Strategy Object
    var USPS = function () {
        this.calculate = function (package) {

            // calculations...

            return "$39.40";
        }
    };

    // Strategy Object
    var Fedex = function () {
        this.calculate = function (package) {

            // calculations...

            return "$43.20";
        }
    };

    return { Shipping: Shipping };

})();

//=============================================
// run_OptimizedStrategy()
//=============================================
function run_OptimizedStrategy() {

    var shipping = new JsGangOfFour.Classic.Strategy.Shipping();

    var package = { from: "76712", to: "10012", weigth: "lkg" };

    // the 3 strategies
    shipping.setStrategy("UPS");
    log.add("UPS Strategy: " + shipping.calculate(package));

    shipping.setStrategy("USPS");
    log.add("USPS Strategy: " + shipping.calculate(package));

    shipping.setStrategy("Fedex");
    log.add("Fedex Strategy: " + shipping.calculate(package));

    log.show();
}
