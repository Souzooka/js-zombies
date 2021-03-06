'use strict';
class Validator {
  constructor() {

  }

  isNumber(value) {
    if (typeof value === 'number') {
      return true;
    }
    throw new TypeError('Cannot assign type ' + typeof value + ' to variable. Variable must be a number.');
  }

  isString(value) {
    if (typeof value === 'string') {
      return true;
    }
    throw new TypeError('Cannot assign type ' + typeof value + ' to variable. Variable must be a string.');
  }

  isBoolean(value) {
    if (typeof value === 'boolean') {
      return true;
    }
    throw new TypeError('Cannot assign type ' + typeof value + ' to variable. Variable must be a boolean value.');
  }

  isArray(value) {
    if (value instanceof Array) {
      return true;
    }
    throw new TypeError('Cannot assign type ' + typeof value + ' to variable. Variable must be an array.');
  }

  isObject(value) {
    if (typeof value === 'object' && !(value instanceof Array)) {
      return true;
    }
    throw new TypeError('Cannot assign type ' + typeof value + ' to variable. Variable must be an object.');
  }

  isWeapon(value) {
    if (value instanceof Weapon) {
      return true;
    }
    throw new TypeError('Cannot assign type ' + value.constructor + " " + typeof value + ' to variable. Variable must be a Weapon object.');
  }

  isFood(value) {
    if (value instanceof Food) {
      return true;
    }
    throw new TypeError('Cannot assign type ' + value.constructor + " " + typeof value + ' to variable. Variable must be a Food object.');
  }

  isItem(value) {
    if (value instanceof Item) {
      return true;
    }
    throw new TypeError('Cannot assign type ' + value.constructor + " " + typeof value + ' to variable. Variable must be an Item object.');
  }
}

const typeChecker = new Validator();

/**
 * Class => Item(name)
 * -----------------------------
 * Creates an item.
 *
 * @name Item
 * @param {string} name     The item's name.
 * @property {string} name
 */

 class Item {
  constructor(name) {
    typeChecker.isString(name);
    this._name = name;
  }

  get name() {
    return this._name;
  }
 }


/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */


/**
 * Weapon Extends Item Class
 * -----------------------------
 */

class Weapon extends Item {
  constructor(name, damage) {
    super(name);
    typeChecker.isNumber(damage);
    this._damage = damage;
  }

  get damage() {
    return this._damage;
  }
}

/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */


/**
 * Food Extends Item Class
 * -----------------------------
 */

class Food extends Item {
  constructor(name, energy) {
    super(name);
    typeChecker.isNumber(energy);
    this._energy = energy;
  }

  get energy() {
    return this._energy;
  }
}


/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */

class Player {
  constructor(name, health, strength, speed) {
    typeChecker.isString(name);
    typeChecker.isNumber(health);
    typeChecker.isNumber(strength);
    typeChecker.isNumber(speed);
    this._name = name;
    this._health = health;
    this._maxHealth = health;
    this._strength = strength;
    this._speed = speed;
    this._pack = [];
    this._isAlive = true;
    this._equipped = false;
  }

  get name() {
    return this._name;
  }

  get health() {
    return this._health;
  }

  set health(health) {
    this._health = health;

    if (this._health <= 0) {
      this._isAlive = false;
    } else {
      this._isAlive = true;
    }
  }

  get strength() {
    return this._strength;
  }

  get speed() {
    return this._speed;
  }

  get isAlive() {
    return this._isAlive;
  }

  get equipped() {
    return this._equipped;
  }

  set equipped(item) {
    this._equipped = item;
  }

  getPack() {
    return this._pack;
  }

  getMaxHealth() {
    return this._maxHealth;
  }


/**
 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */

  checkPack() {
    let pack = this.getPack();

    if (!this.isAlive) {
      console.log("Those who have died unfortunately cannot open their packs.");
      return false;
    }

    if (pack.length === 0) {
      console.log("Despite the size of your sack, you appear to hold no items.");
    } else {
      console.log(`${this.name}'s inventory:`);
      for (let i = 0; i < pack.length; i++) {
        console.log(pack[i].name);
      }
    }
  }



/**
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
 */

  takeItem(item) {
    let pack = this.getPack();

    if (!this.isAlive) {
      console.log("You are dead, not big soup rice.");
      return false;
    }

    if (pack.length >= 3) {
      console.log("Your pack cannot store any more items!");
      return false;
    } else {
      typeChecker.isItem(item);
      pack.push(item);
      return true;
    }
  }

/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 *
 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
 */

  discardItem(item) {
    let pack = this.getPack();
    let indexOfItem = pack.indexOf(item);

    if (!this.isAlive) {
      console.log("Losing some weight won't bring you back from the dead.");
      return false;
    }

    if (indexOfItem === -1) {
      console.log("Error: Item doesn't exist in inventory.");
      return false;
    }

    this.pack = pack.splice(indexOfItem, 1);
    console.log(`${this.name}'s ${item.name} was thrown into the void!`);
    return true;
  }

/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */

  equip(weapon) {
    let pack = this.getPack();
    let indexOfWeapon = pack.indexOf(weapon);

    if (!this.isAlive) {
      console.log(`${this.name} tried equipping a weapon while dead, but zombies can't equip weapons. If ${this.name} was immune, they can't do anything any more. Bummer.`);
      return false;
    }

    if (indexOfWeapon === -1) {
      console.log("Only items from the pack can be equipped!");
      return false;
    }

    typeChecker.isWeapon(weapon);

    if (!this.equipped) {
      this.equipped = pack.splice(indexOfWeapon, 1)[0];
    } else {
      this.equipped = pack.splice(indexOfWeapon, 1, this.equipped)[0];
    }

  }


/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */

  eat(food) {
    let pack = this.getPack();
    let indexOfFood = pack.indexOf(food);

    if (!this.isAlive) {
      console.log(`${this.name} can only eat brains now. Unless, again, ${this.name}'s immune. Then ${this.name} can't eat anything any more. That sucks.`);
      return false;
    }

    if (indexOfFood === -1) {
      console.log("Only items from the pack can be consumed!");
      return false;
    }

    // stop breaking my code tests
    try {
      typeChecker.isFood(food);
    }
    catch (error) {
      return false;
    }

    this.health += pack.splice(indexOfFood, 1)[0].energy;

    if (this.health > this.getMaxHealth()) {
      this.health = this.getMaxHealth();
    }
  }

/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
 */

  useItem(item) {
    let pack = this.getPack();
    let indexOfItem = pack.indexOf(item);
    let itemType = item.constructor;

    if (!this.isAlive) {
      console.log(this.name + " remembered that they were no longer alive and stopped searching through their pack.");
      return false;
    }

    if (indexOfItem === -1) {
      console.log("Only items from the pack can be used!");
      return false;
    }

    typeChecker.isItem(item);

    switch (itemType) {
      case Weapon:
        this.equip(item);
        break;
      case Food:
        this.eat(item);
        break;
      default:
        break;
    }

  }

/**
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.
 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */

  equippedWith() {
    if (this._equipped) {
      return this._equipped.name;
    } else {
      return false;
    }
  }

}

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */

class Zombie {
  constructor(health, strength, speed) {
    typeChecker.isNumber(health);
    typeChecker.isNumber(strength);
    typeChecker.isNumber(speed);
    this._health = health;
    this._maxHealth = health;
    this._strength = strength;
    this._speed = speed;
    this._isAlive = true; // But is it really?
  }

  get health() {
    return this._health;
  }

  set health(health) {
    this._health = health;

    if (this._health <= 0) {
      this._isAlive = false;
    } else {
      this._isAlive = true;
    }
  }

  get strength() {
    return this._strength;
  }

  get speed() {
    return this._speed;
  }

  get isAlive() {
    return this._isAlive;
  }

}


/**
 * Class => FastZombie(health, strength, speed)
 * -----------------------------
 * Creates a fast zombie.
 *
 * The FastZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name FastZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * FastZombie Extends Zombie Class
 * -----------------------------
 */

class FastZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */

class StrongZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * RangedZombie Extends Zombie Class
 * -----------------------------
 */

class RangedZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */

class ExplodingZombie extends Zombie {
  constructor(health, strength, speed) {
    super(health, strength, speed);
  }
}

/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  var player = new Player("Joan", 500, 30, 70);
  var zombie = new Zombie(40, 50, 20);
  var charger = new FastZombie(175, 25, 60);
  var tank = new StrongZombie(250, 100, 15);
  var spitter = new RangedZombie(150, 20, 20);
  var boomer = new ExplodingZombie(50, 15, 10);

  var shovel = new Weapon("shovel", 15);
  var sandwich = new Food("sandwich", 30);
  var chainsaw = new Weapon("chainsaw", 25);

  player.takeItem(shovel);
  player.takeItem(sandwich);
  player.takeItem(chainsaw);
  player.discardItem(new Weapon("scythe", 21));
  player.discardItem(shovel);
  player.checkPack();
  player.takeItem(shovel);
  player.checkPack();

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  player.useItem(shovel);
  player.equippedWith();
  player.checkPack();

  player.health = 487;
  console.log("Before health: " + player.health);
  player.useItem(sandwich);
  console.log("After health: " + player.health);
  player.checkPack();
}
