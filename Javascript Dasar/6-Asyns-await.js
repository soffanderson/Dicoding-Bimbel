const getCoffee = () => {
  return new Promise((resolve, reject) => {
    const seeds = 9;
    setTimeout(() => {
      if (seeds >= 10) {
        resolve("Kopi didapatkan!");
      } else {
        reject("Biji kopi habis!");
      }
    }, 1000);
  });
};

// function makeCoffee() {
//   getCoffee().then((coffee) => {
//     console.log(coffee);
//   });
// }

async function makeCoffee() {
  try {
    const coffee = await getCoffee();
    console.log(coffee);
  } catch (rejectedReason) {
    console.log(rejectedReason);
  }
}

makeCoffee();

/* output
Kopi didapatkan!
*/
