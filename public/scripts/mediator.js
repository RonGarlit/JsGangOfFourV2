//==============================================
// mediator.js
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

// Create Participant
var Participant = function (name) {
    this.name = name;
    this.chatroom = null;
};

// Build out functionality on the prototype
Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};

// The Chatroom is our mediator of the Participants
var Chatroom = function () {
    var participants = {};
    return {
        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
        send: function (message, from, to) {
            if (to) {                       // single message
                to.receive(message, from);
            } else {                        // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};

//==============================================
// run_Mediator
//==============================================
function run_Mediator() {

    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");

    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);

    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);

    log.show();
}

//=============================================
// Mediator NameSpace 
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
JsGangOfFour.namespace("Classic").Mediator = (function () {

    // Create Participant
    var Participant = function (name) {
        this.name = name;
        this.chatroom = null;
    };

    // Build out functionality on the prototype
    Participant.prototype = {
        send: function (message, to) {
            this.chatroom.send(message, this, to);
        },
        receive: function (message, from) {
            log.add(from.name + " to " + this.name + ": " + message);
        }
    };

    // The Chatroom is our mediator of the Participants
    var Chatroom = function () {
        var participants = {};
        return {
            register: function (name) {
                var participant = new Participant(name);
                participants[participant.name] = participant;
                participant.chatroom = this;

                return participant;
            },
            send: function (message, from, to) {
                if (to) {                       // single message
                    to.receive(message, from);
                } else {                        // broadcast message
                    for (key in participants) {
                        if (participants[key] !== from) {
                            participants[key].receive(message, from);
                        }
                    }
                }
            }
        };
    };

    return {
        Chatroom: Chatroom
    }
})();

//==============================================
// run_OptimizedMediator
//==============================================
function run_OptimizedMediator() {

    var chatroom = new JsGangOfFour.Classic.Mediator.Chatroom();

    var yoko = chatroom.register("Yoko");
    var john = chatroom.register("John");
    var paul = chatroom.register("Paul");
    var ringo = chatroom.register("Ringo");

    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);

    log.show();
}



