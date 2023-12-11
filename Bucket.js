const items = document.getElementsByClassName("bucket-container")[0];
const bill = document.getElementsByClassName("all-cost")[0];

function getBill() {
    let sum = 0;
    var cart = JSON.parse(localStorage.getItem("cart"));
    for (const item of cart) {
        sum += parseInt(item["cost"]) * parseInt(item["incart"]);
    }
    return sum;
}

function update() {
    items.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem("cart"));
    let i = 0;
    for (const item of cart) {
        let text = "";
        if (parseInt(item["incart"]) > 1) text = " (" + item["incart"] + " копии)";
        items.innerHTML += '<div class="bucket-item"> <img src="' +
        item["img"] +
        '" alt="' +
        item["title"] +
        '" class="bucket-img"> <span class="bucket-title">' +
        item["title"] + text +
        '</span> <span class="bucket-description">' + 
        item["description"] +
        '</span> <span class="bucket-cost">' +
        item["cost"] +
        ' &#8381</span> <span class="bucket-buttons">' +
        '<button type="button" class="bucket-button" onclick="{removeItem(' +
        i +
        ');}"> <img src="Icons/Garbage.png" alt="Remove" class="bucket-button-img"> </button> </span> </div>';
        i++;
    }
    let sum = getBill();
    bill.innerHTML = 'Итого: ' + sum + ' &#8381';
}

update();

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (parseInt(cart[index]["incart"]) > 1) cart[index]["incart"] = parseInt(cart[index]["incart"]) - 1;
    else {
        if (index === 0) cart.shift();
        else cart.splice(index, index);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    update();
}

function buy() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let bought = JSON.parse(localStorage.getItem("bought"));
    for (const item of cart) {
        bought.push(item);
        while (bought.length > 5)
            bought.shift();
    }
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("bought", JSON.stringify(bought));
    update();
}