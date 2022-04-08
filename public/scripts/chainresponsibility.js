//==============================================
// chainresponsibility.js
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

// Request is created 
var Request = function (amount) {
    this.amount = amount;

    log.add("Requested: $" + amount + "\n");
}
// The get method is added to the pototype
Request.prototype = {
    get: function (bill) {
        var count = Math.floor(this.amount / bill);
        this.amount -= count * bill;

        log.add("Dispense " + count + " $" + bill + " bills");

        return this;
    }
}

//=============================================
// run_chain()
//=============================================
function run_Chain() {

    // the Request is created with the amount requested
    var request = new Request(378);
    // Next, a series of get calls are chained together, each one 
    // handling a particular denomination. The request object is 
    // passed through the chain by returning this in the get method.
    request.get(100).get(50).get(20).get(10).get(5).get(1);

    log.show();
}

//=============================================
// Chain NameSpace 
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
JsGangOfFour.namespace("Classic").Chain = (function () {
    // Request is created 
    var Request = function (amount) {
        this.amount = amount;

        log.add("Requested: $" + amount + "\n");
    }
    // The get method is added to the pototype
    Request.prototype = {
        get: function (bill) {
            var count = Math.floor(this.amount / bill);
            this.amount -= count * bill;

            log.add("Dispense " + count + " $" + bill + " bills");

            return this;
        }
    }

    return {
        Request: Request
    }
})();


//=============================================
// run_OptimizedChain()
//=============================================
function run_OptimizedChain() {

    var chain = JsGangOfFour.Classic.Chain;
    // the Request is created with the amount requested
    var request = new chain.Request(378);
    // Next, a series of get calls are chained together, each one 
    // handling a particular denomination. The request object is 
    // passed through the chain by returning this in the get method.
    request.get(100).get(50).get(20).get(10).get(5).get(1);

    log.show();
}