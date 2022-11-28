// Asyncronous contoh sebelum ES6

const getCoffee = () => {
  return new Promise((resolve, reject) => {
    const seeds = 1;
    setTimeout(() => {
      if (seeds >= 10) {
        resolve("Kopi didapatkan!");
      } else {
        reject("Biji kopi habis!");
      }
    }, 1000);
  });
};

// hanya mengubah bagian lama ini
// function makeCoffee() {
//   getCoffee().then((coffee) => {
//     console.log(coffee);
//   });
// }

// makeCoffee();

// menjadi seperti ini
async function makeCoffee() {
  const coffee = await getCoffee();
  console.log(coffee);
}

makeCoffee();

// gunakan try & catch untuk menangkap value rejected yg tidak dpt diterima kode di atas
async function makeCoffee() {
  try {
    const coffee = await getCoffee();
    console.log(coffee);
  } catch (rejectReason) {
    console.log(rejectReason);
  }
}
