function fetchData(url) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) throw new Error("Error while fetching data");
    return response.json();
  });
}

function getProducts() {
  fetchData("http://localhost:3000/api/v1/products")
    .then((data) => {
      renderProduct(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getCustomers() {
  fetchData("http://localhost:3000/api/v1/customers")
    .then((data) => {
      renderCustomer(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getOrders() {
  fetchData("http://localhost:3000/api/v1/orders")
    .then((data) => {
      renderOrders(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function renderProduct(data) {
  const el = document.querySelector("#products");

  let rows = "";
  for (let i = 0; i < data.length; i++) {
    const { name, price, stock } = data[i];
    rows += `<tr>
      <td>${i + 1}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td>${stock}</td>
    </tr>`;
  }

  el.innerHTML = rows;
}

function renderCustomer(data) {
  const el = document.querySelector("#customers");

  let rows = "";
  for (let i = 0; i < data.length; i++) {
    const { name, phone } = data[i];
    rows += `<tr>
      <td>${i + 1}</td>
      <td>${name}</td>
      <td>${phone}</td>
    </tr>`;
  }

  el.innerHTML = rows;
}

function renderOrders(data) {
  const el = document.querySelector("#orders");

  let rows = "";
  for (let i = 0; i < data.length; i++) {
    const { date, customer, product, qty, totalAmount } = data[i];
    rows += `<tr>
      <td>${i + 1}</td>
      <td>${new Date(date).toLocaleString("id-ID", {
        dateStyle: "medium",
      })}</td>
      <td>${customer.name}</td>
      <td>${product.name}</td>
      <td>${qty}</td>
      <td>${totalAmount}</td>
    </tr>`;
  }

  el.innerHTML = rows;
}

function getAllData() {
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        "{ products { name price stock } customers { name phone } orders { date qty totalAmount product { name } customer { name } }}",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      renderProduct(data.data.products);
      renderCustomer(data.data.customers);
      renderOrders(data.data.orders);
    })
    .catch((error) => {
      console.log(error);
    });
}

getAllData();

// getProducts();
// getCustomers();
// getOrders();
