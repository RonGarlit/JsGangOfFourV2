//==============================================
// command.js
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

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var Command = function (execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

// Create the Add command object
var AddCommand = function (value) {
    return new Command(add, sub, value);
};

// Create the Subtraction command object
var SubCommand = function (value) {
    return new Command(sub, add, value);
};

// Create the Multiplication command object
var MulCommand = function (value) {
    return new Command(mul, div, value);
};

// Create the Divide command object
var DivCommand = function (value) {
    return new Command(div, mul, value);
};

// Calculator 
var Calculator = function () {
    var current = 0;
    var commands = [];

    function action(command) {
        var name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return {
        execute: function (command) {

            current = command.execute(current, command.value);
            commands.push(command);

            log.add(action(command) + ": " + command.value);
        },
        undo: function () {
            var command = commands.pop();
            current = command.undo(current, command.value);

            log.add("Undo " + action(command) + ": " + command.value);
        },
        getCurrentValue: function () {
            return current;
        }
    }
}

//==============================================
// run_Calculator
//==============================================
function run_Calculator() {

    var calculator = new Calculator();

    // issue commands
    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    calculator.execute(new MulCommand(6));
    calculator.execute(new DivCommand(2));

    // reverse last two commands
    calculator.undo();
    calculator.undo();

    log.add("\nValue: " + calculator.getCurrentValue());

    log.show();
}


//=============================================
// Command NameSpace 
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
JsGangOfFour.namespace("Classic").Command = (function () {

    function add(x, y) { return x + y; }
    function sub(x, y) { return x - y; }
    function mul(x, y) { return x * y; }
    function div(x, y) { return x / y; }

    var Command = function (execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    }

    return {

        // Create the Add command object
        AddCommand: function (value) {
            return new Command(add, sub, value);
        },
        // Create the Subtraction command object
        SubCommand: function (value) {
            return new Command(sub, add, value);
        },
        // Create the Multiplication command object
        MulCommand: function (value) {
            return new Command(mul, div, value);
        },
        // Create the Divide command object
        DivCommand: function (value) {
            return new Command(div, mul, value);
        },

        Calculator: function () {
            var current = 0;
            var commands = [];

            function action(command) {
                var name = command.execute.toString().substr(9, 3);
                return name.charAt(0).toUpperCase() + name.slice(1);
            }

            return {
                execute: function (command) {

                    current = command.execute(current, command.value);
                    commands.push(command);

                    log.add(action(command) + ": " + command.value);
                },
                undo: function () {
                    var command = commands.pop();
                    current = command.undo(current, command.value);

                    log.add("Undo " + action(command) + ": " + command.value);
                },
                getCurrentValue: function () {
                    return current;
                }
            }
        }
    };

})();

//==============================================
// run_OptimizedCalculator 
//==============================================
function run_OptimizedCalculator() {

    var command = JsGangOfFour.Classic.Command;

    var calculator = new command.Calculator();

    // issue commands
    calculator.execute(new command.AddCommand(100));
    calculator.execute(new command.SubCommand(24));
    calculator.execute(new command.MulCommand(6));
    calculator.execute(new command.DivCommand(2));

    // reverse last two commands
    calculator.undo();
    calculator.undo();

    log.add("\nValue: " + calculator.getCurrentValue());

    log.show();
}

