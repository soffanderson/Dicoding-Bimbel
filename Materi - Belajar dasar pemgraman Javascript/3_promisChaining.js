const state = {
  stock: {
    coffeeBeans: 250,
    water: 1000,
  },
  isCoffeeMachineBusy: false,
};

const checkAvailability = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!state.isCoffeeMachineBusy) {
        resolve("Mesin kopi siap digunakan!");
      } else {
        reject("Maaf, mesin sedang sibuk.");
      }
    }, 1000);
  });
};

const checkStock = () => {
  return new Promise((resolve, reject) => {
    state.isCoffeeMachineBusy = true;
    setTimeout(() => {
      if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
        resolve("Stok cukup. Bisa membuat kopi.");
      } else {
        reject("Stok tidak cukup!");
      }
    }, 1500);
  });
};

const boilWater = () => {
  console.log("Memanaskan air...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Air panas siap digunakan!");
    }, 2000);
  });
};

const grindCoffeeBeans = () => {
  console.log("Menggiling biji kopi...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Biji kopi siap!");
    }, 1000);
  });
};

const brewCoffee = () => {
  console.log("Membuatkan kopi, silakan tunggu...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Kopi sudah siap!");
    }, 2000);
  });
};

// Make espresso
function makeEspresso() {
  checkAvailability()
    .then((value) => {
      console.log(value);
      return checkStock();
    })
    .then((value) => {
      console.log(value);
      const promises = [boilWater(), grindCoffeeBeans()];
      return Promise.all(promises);
    })
    .then((value) => {
      console.log(value);
      return brewCoffee();
    })
    .then((value) => {
      console.log(value);
      state.isCoffeeMachineBusy = false;
    })
    .catch((rejectReason) => {
      console.log(rejectReason);
      state.isCoffeeMachineBusy = false;
    });
}

makeEspresso();
