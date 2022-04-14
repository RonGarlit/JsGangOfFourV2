
//=============================================
// Revealing Module Pattern
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
JsGangOfFour.namespace("Classic").Template = (function () {
    // Acts as our AbstractClass
    var datastore = {
        process: function () {
            this.connect();
            this.select();
            this.disconnect();
            return true;
        }
    };

    return { datastore: datastore };

})();

//==============================================
// Create the "Utils" namespace 
//==============================================
// Note that the Common module here is using 
// the revealing Module Pattern
//
// This Module pattern makes use of 
// immediate anonymous functions and closures.
//==============================================
JsGangOfFour.namespace("Utils").Common = (function () {

    //==============================================
    // Private Area
    //==============================================

    var inherit = function (proto) {
        var F = function () { };
        F.prototype = proto;
        return new F();
    };

    // log helper - This one is now hidden in our 
    // Common Module inside the Utils NameSpace
    var log = (function () {
        var log = "";
        return {
            add: function (msg) { log += msg + "\n"; },
            show: function () { alert(log); log = ""; }
        }
    })();

    return {

        //==============================================
        // Public Area
        //==============================================
        // Note I used the same name here for the public 
        // method but it is not required.
        //==============================================
        inherit: inherit,   // revealing method
        log: log            // revealing method
    };

})();

//=============================================
// run_RevealingModule()
//=============================================
function run_RevealingModule() {

    // Assign a few variable here with items 
    // from our modules these will run faster too 
    var utils = JsGangOfFour.Utils.Common;

    var store = JsGangOfFour.Classic.Template.datastore;
    // Setup MySql with the public inherit from Common module 
    var mySql = utils.inherit(store);

    // implement template steps
    mySql.connect = function () {
        utils.log.add("MySQL: connect step");
    };
    mySql.select = function () {
        utils.log.add("MySQL: select step");
    };
    mySql.disconnect = function () {
        utils.log.add("MySQL: disconnect step");
    };

    mySql.process();

    utils.log.show();
}