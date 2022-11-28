const stock = {
  coffeeBeans: 15,
  water: 1000,
};

const checkStock = () => {
  return new Promise((resolve, reject) => {
    if (stock.coffeeBeans >= 16 && stock.water >= 250) {
      resolve("Stok cukup. Bisa membuat kopi.");
    } else {
      reject("Stok tidak cukup");
    }
  });
};

const handleSuccess = (resolveValue) => {
  console.log(resolveValue);
};

const handleFailure = (rejectReason) => {
  console.log(rejectReason);
};

// checkStock().then(handleSuccess, handleFailure);
// daripada seperti di atas, mending seperti dibawha ini
checkStock().then(handleSuccess).catch(handleFailure);
