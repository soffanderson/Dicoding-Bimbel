const Tiger = require("./Tiger");
const Wolf = require("./Wolf");

const fighting = (tiger, Wolf) => {
    if (tiger.strength > wolf.strength) {
        tiger.growl();
        return;
    }

    if (wolf.strength > wolf.strength) {
        wolf.howl();
        return;
    }

    console.log("Tiger and Wold have same strength");
};

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);
