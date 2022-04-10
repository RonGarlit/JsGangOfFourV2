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


var Context = function (input) {
    this.input = input;
    this.output = 0;
}

Context.prototype = {
    startsWith: function (str) {
        return this.input.substr(0, str.length) === str;
    }
}

var Expression = function (name, one, four, five, nine, multiplier) {
    this.name = name;
    this.one = one;
    this.four = four;
    this.five = five;
    this.nine = nine;
    this.multiplier = multiplier;
}

Expression.prototype = {
    interpret: function (context) {
        if (context.input.length == 0) {
            return;
        }
        else if (context.startsWith(this.nine)) {
            context.output += (9 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.four)) {
            context.output += (4 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.five)) {
            context.output += (5 * this.multiplier);
            context.input = context.input.substr(1);
        }

        while (context.startsWith(this.one)) {
            context.output += (1 * this.multiplier);
            context.input = context.input.substr(1);
        }
    }
}

//=============================================
// run_Interpreter
//=============================================
function run_Interpreter() {

    var roman = "MCMXXVIII"
    var context = new Context(roman);
    var tree = [];

    tree.push(new Expression("thousand", "M", " ", " ", " ", 1000));
    tree.push(new Expression("hundred", "C", "CD", "D", "CM", 100));
    tree.push(new Expression("ten", "X", "XL", "L", "XC", 10));
    tree.push(new Expression("one", "I", "IV", "V", "IX", 1));

    for (var i = 0, len = tree.length; i < len; i++) {
        tree[i].interpret(context);
    }

    alert(roman + " = " + context.output);
}

//=============================================
// Interpreter NameSpace 
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
JsGangOfFour.namespace("Classic").Interpreter = (function () {

    var Context = function (input) {
        this.input = input;
        this.output = 0;
    }

    Context.prototype = {
        startsWith: function (str) {
            return this.input.substr(0, str.length) === str;
        }
    }

    var Expression = function (name, one, four, five, nine, multiplier) {
        this.name = name;
        this.one = one;
        this.four = four;
        this.five = five;
        this.nine = nine;
        this.multiplier = multiplier;
    }

    Expression.prototype = {
        interpret: function (context) {
            if (context.input.length == 0) {
                return;
            }
            else if (context.startsWith(this.nine)) {
                context.output += (9 * this.multiplier);
                context.input = context.input.substr(2);
            }
            else if (context.startsWith(this.four)) {
                context.output += (4 * this.multiplier);
                context.input = context.input.substr(2);
            }
            else if (context.startsWith(this.five)) {
                context.output += (5 * this.multiplier);
                context.input = context.input.substr(1);
            }

            while (context.startsWith(this.one)) {
                context.output += (1 * this.multiplier);
                context.input = context.input.substr(1);
            }
        }
    }

    function evaluate(roman) {

        var tree = [];
        var context = new Context(roman);

        tree.push(new Expression("thousand", "M", " ", " ", " ", 1000));
        tree.push(new Expression("hundred", "C", "CD", "D", "CM", 100));
        tree.push(new Expression("ten", "X", "XL", "L", "XC", 10));
        tree.push(new Expression("one", "I", "IV", "V", "IX", 1));

        for (var i = 0, len = tree.length; i < len; i++) {
            tree[i].interpret(context);
        }

        return context.output;
    }

    return {
        evaluate: evaluate
    };

})();

//==============================================
// run_OptimizedInterpreter
//==============================================
function run_OptimizedInterpreter() {

    var roman = "MCMXXVIII"
    var result = JsGangOfFour.Classic.Interpreter.evaluate(roman);

    alert(roman + " = " + result);
}
