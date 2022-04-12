//==============================================
// state.js
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

var TrafficLight = function () {

    var count = 0;
    var currentState = new Red(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;

        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
}

// State Object
var Red = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Red --> for 1 minute");
        light.change(new Green(light));
    }
};
// State Object
var Yellow = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};
// State Object
var Green = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};

//==============================================
// run_State()
//==============================================
function run_State() {

    var light = new TrafficLight();
    light.start();

    log.show();
}

//=============================================
// State NameSpace 
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
JsGangOfFour.namespace("Classic").State = (function () {
    var TrafficLight = function () {
        // State Object
        var Red = function () {
            this.go = function () {
                log.add("Red --> for 1 minute");
                change(new Green());
            }
        };
        // State Object
        var Yellow = function () {
            this.go = function () {
                log.add("Yellow --> for 10 seconds");
                change(new Red());
            }
        };
        // State Object
        var Green = function () {
            this.go = function () {
                log.add("Green --> for 1 minute");
                change(new Yellow());
            }
        };

        var count = 0;
        var currentState = new Red(this);

        var change = function (state) {
            // limits number of changes
            if (count++ >= 10) return;

            currentState = state;
            currentState.go();
        };

        this.start = function () {
            currentState.go();
        };
    }

    return {
        TrafficLight: TrafficLight
    };

})();

//==============================================
// run_OptimizedState()
//==============================================
function run_OptimizedState() {

    var light = new JsGangOfFour.Classic.State.TrafficLight();
    light.start();

    log.show();
}

