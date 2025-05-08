// দোকান লোড ফাংশন সম্পূর্ণ আপডেট
function loadShopsForRoad() {
    currentDate = document.getElementById('order-date').value;
    if (!currentDate) {
        alert('দয়া করে একটি তারিখ নির্বাচন করুন');
        return;
    }

    // রোড অনুযায়ী দোকান ফিল্টার করুন
    const roadShops = shops.filter(shop => shop.road === currentRoad);
    const container = document.getElementById('shop-list-container');
    container.innerHTML = '';

    if (roadShops.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>এই রোডে কোনো দোকান নেই</p>
                <button onclick="showPage('shop-list-page')">দোকান যোগ করুন</button>
            </div>
        `;
        return;
    }

    // দোকান কার্ড তৈরি করুন
    roadShops.forEach(shop => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <h3>${shop.name}</h3>
            <p>${shop.address}</p>
            <small>${shop.road}</small>
        `;
        card.onclick = () => {
            currentShop = shop;
            document.getElementById('order-shop-title').textContent = 
                `${shop.name} - অর্ডার এন্ট্রি`;
            loadProductsForOrder();
            showPage('order-entry-page');
        };
        container.appendChild(card);
    });

    // পেজ টাইটেল আপডেট করুন
    document.getElementById('shop-selection-title').textContent = 
        `${currentRoad} - ${formatDate(currentDate)} - দোকান নির্বাচন`;
    showPage('shop-selection-page');
}

// প্রোডাক্ট লোড ফাংশন সম্পূর্ণ আপডেট
function loadProductsForOrder() {
    const container = document.getElementById('order-products-container');
    container.innerHTML = '<p>প্রোডাক্ট লোড হচ্ছে...</p>';

    // 500ms ডিলে দিয়ে লোডিং ইফেক্ট দেখানো
    setTimeout(() => {
        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>কোনো প্রোডাক্ট নেই</p>
                    <button onclick="showPage('product-list-page')">প্রোডাক্ট যোগ করুন</button>
                </div>
            `;
            return;
        }

        // কারেন্ট অর্ডার ইনিশিয়ালাইজ করুন যদি না থাকে
        if (!currentOrder.products) {
            currentOrder.products = {};
        }

        // প্রতিটি প্রোডাক্টের জন্য আইটেম তৈরি করুন
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            
            // যদি পূর্বে অর্ডার করা থাকে সেই কোয়ান্টিটি নিন
            const quantity = currentOrder.products[product.id]?.quantity || 0;
            const total = (product.price * quantity).toFixed(2);

            productDiv.innerHTML = `
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>দর: ${product.price} টাকা/ইউনিট</p>
                </div>
                <div class="product-controls">
                    <input type="number" min="0" value="${quantity}" 
                           onchange="updateProductQuantity(${product.id}, this.value)"
                           class="quantity-input">
                    <span class="product-total">${total} টাকা</span>
                </div>
            `;
            container.appendChild(productDiv);
        });

        // টোটাল আপডেট করুন
        updateTotal();
    }, 500);
}
