function add(a, b, cb) {
  if (isNaN(a) || isNaN(b)) {
    return cb("Input must be numbers");
  }

  setTimeout(() => {
    const result = a + b;
    cb(null, result);
  }, 1000);
}

function addPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (isNaN(a) || isNaN(b)) {
      return reject("Input must be numbers");
    }

    setTimeout(() => {
      const result = a + b;
      resolve(result);
    }, 1000);
  });
}

// callback hell
// add(1, "a", (err, result) => {
//   if (err) {
//     return console.log(err);
//   }

//   console.log(result);
// });

// pending, fullfilled, rejected

// const x = addPromise(1, "a"); // pending
// console.log(x);
// x.then((result) => {
//   console.log(result);
//   console.log(x); // fullfilled
// }).catch((error) => {
//   console.log(error); // rejected
// });

// addPromise(1, 2)
//   .then((result) => {
//     console.log(result);
//     return addPromise(result, 2);
//   })
//   .then((result) => {
//     console.log(result);
//     return addPromise(result, 2);
//   })
//   .then((result) => {
//     console.log(result);
//     return addPromise(result, 2);
//   })
//   .then((result) => {
//     console.log(result);
//     return addPromise(result, 2);
//   })
//   .then((result) => {
//     console.log(result);
//     return addPromise(result, 2);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function main() {
  let result = await addPromise(1, 2);
  console.log(result);
  result = await addPromise(result, 2);
  console.log(result);
  result = await addPromise(result, 2);
  console.log(result);
  result = await addPromise(result, 2);
  console.log(result);
  result = await addPromise(result, 2);
  console.log(result);
}

main();
