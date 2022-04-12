//==============================================
// template.js
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


var datastore = {
    process: function () {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
};

function inherit(proto) {
    var F = function () { };
    F.prototype = proto;
    return new F();
}

// log helper
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run_TemplateMethod() {

    var mySql = inherit(datastore);

    // implement template steps

    mySql.connect = function () {
        log.add("MySQL: connect step");
    };
    mySql.select = function () {
        log.add("MySQL: select step");
    };
    mySql.disconnect = function () {
        log.add("MySQL: disconnect step");
    };

    mySql.process();

    log.show();
}


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

JsGangOfFour.namespace("Classic").Template = (function () {
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

JsGangOfFour.namespace("Utils").Common = (function () {

    var inherit = function (proto) {
        var F = function () { };
        F.prototype = proto;
        return new F();
    };

    // log helper
    var log = (function () {
        var log = "";
        return {
            add: function (msg) { log += msg + "\n"; },
            show: function () { alert(log); log = ""; }
        }
    })();

    return {
        inherit: inherit,
        log: log
    };

})();

function run_OptimizedTemplateMethod() {

    var utils = JsGangOfFour.Utils.Common;

    var store = JsGangOfFour.Classic.Template.datastore;
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
