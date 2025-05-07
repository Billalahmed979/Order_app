// Save Order function saveOrder(road, date, shop, productList) { const allOrders = JSON.parse(localStorage.getItem("orders")) || {}; const orderKey = ${road}_${date}_${shop};

allOrders[orderKey] = {
    road: road,
    date: date,
    shop: shop,
    products: productList
};

localStorage.setItem("orders", JSON.stringify(allOrders));
alert("অর্ডার সফলভাবে সেইভ হয়েছে!");

}

// Load Order function loadOrder(road, date, shop) { const allOrders = JSON.parse(localStorage.getItem("orders")) || {}; const orderKey = ${road}_${date}_${shop}; return allOrders[orderKey] || null; }

// Example use: // saveOrder("নয়াবাজার", "2025-05-07", "সফিক স্টোর", [ //     { name: "চিনি", price: 50, quantity: 2 }, //     { name: "চাল", price: 60, quantity: 5 } // ]);

// const order = loadOrder("নয়াবাজার", "2025-05-07", "সফিক স্টোর"); // console.log(order);

