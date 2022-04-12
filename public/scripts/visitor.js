//==============================================
// visitor.js
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

// Employee Object
var Employee = function (name, salary, vacation) {

    var self = this;

    // Accept method to allow visitor new 
    // functionality on the this object
    this.accept = function (visitor) {
        visitor.visit(self);
    };
    this.getName = function () {
        return name;
    };
    this.getSalary = function () {
        return salary;
    };
    this.setSalary = function (sal) {
        salary = sal;
    };
    this.getVacation = function () {
        return vacation;
    };
    this.setVacation = function (vac) {
        vacation = vac;
    };
};

// Visitor method
var ExtraSalary = function () {
    this.visit = function (emp) {
        emp.setSalary(emp.getSalary() * 1.1);
    };
};

// Visitor method
var ExtraVacation = function () {
    this.visit = function (emp) {
        emp.setVacation(emp.getVacation() + 2);
    };
};

//==============================================
// run_Visitor()
//==============================================
function run_Visitor() {
    
    // Employee Object Array
    var employees = [
        new Employee("John", 10000, 10),
        new Employee("Mary", 20000, 21),
        new Employee("Boss", 250000, 51)
    ];

    var visitorSalary = new ExtraSalary();
    var visitorVacation = new ExtraVacation();

    for (var i = 0, len = employees.length; i < len; i++) {

        var emp = employees[i];

        emp.accept(visitorSalary);
        emp.accept(visitorVacation);

        log.add(emp.getName() + ": $" + emp.getSalary() +
            " and " + emp.getVacation() + " vacation days");
    }

    log.show();
}

//=============================================
// Visitor NameSpace 
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
JsGangOfFour.namespace("Classic").Visitor = (function () {

    // Employee Object
    var Employee = function (name, salary, vacation) {
       
        this.getName = function () { return name; };
        this.setName = function (value) { name = value; };
        
        this.getSalary = function () { return salary; };
        this.setSalary = function (value) { salary = value; };
        
        this.getVacation = function () { return vacation; };
        this.setVacation = function (value) { vacation = value; }
    };

    return { Employee: Employee };

})();

//==============================================
// run_OptimizedVisitor()
//==============================================
function run_OptimizedVisitor() {

    var visitor = JsGangOfFour.Classic.Visitor;

    // Employee Object Array
    var employees = [
        new visitor.Employee("John", 10000, 10),
        new visitor.Employee("Mary", 20000, 21),
        new visitor.Employee("Boss", 250000, 51)
    ];

    // Visitor method
    var extraSalary = function () {
        this.setSalary(this.getSalary() * 1.1)
    };

    // Visitor method
    var extraVacation = function () {
        this.setVacation(this.getVacation() + 2)
    };

    for (var i = 0, len = employees.length; i < len; i++) {

        var emp = employees[i];

        // APPLY 'visitor' functions
        // We could have added these to the Visitor module, 
        // but this better demonstrates that you can 
        // arbitrarily create and apply functions to any object.
        // See: https://www.w3schools.com/JS/js_function_apply.asp
        extraSalary.apply(emp);
        extraVacation.apply(emp);

        log.add(emp.getName() + ": $" + emp.getSalary() +
            " and " + emp.getVacation() + " vacation days");
    }

    log.show();
}
