const purchases = document.getElementsByClassName("last-purchases-back")[0];

function updateProfile() {
    let bought = JSON.parse(localStorage.getItem("bought"));
    purchases.innerHTML = "";
    for (const item of bought) {
        purchases.innerHTML += '<span class="last-purchase"> <img src="' +
        item["img"] +
        '" alt="' +
        item["title"] +
        '" class="last-purchase-img">' +
        item["title"] +
        '</span>'
    }
}

updateProfile();