const allStuff = document.getElementsByClassName("all-stuff").item(0);
var currentFilter = 0;
const newStuff = (id, type, img, title, description, cost, incart) => {
    const stuff = {
        id, type, img, title, description, cost, incart
    };
    return stuff;
};

const everyStuff = [newStuff("0", "cnsl", "Images/play5.png", "PlayStation 5", "Выдающаяся игровая консоль нового поколения, обеспечивающая потрясающую графику, инновационные технологии управления и широкий выбор захватывающих игр, погружая игроков в захватывающий мир развлечений.", "58999", 1),
                newStuff("1", "cnsl", "Images/play4.png", "PlayStation 4", "Хотя и представляет собой предыдущее поколение игровых консолей, остается надежным и популярным выбором среди геймеров благодаря своей отличной библиотеке игр, удобному интерфейсу и стабильной производительности, обеспечивая увлекательный игровой опыт.", "39999", 1),
                newStuff("2", "game", "Images/spider.png", "Spider-Man 2", "Spider-Man 2 обещает впечатляющее продолжение приключений знаменитого супергероя, предлагая улучшенную графику, захватывающий сюжет и новые захватывающие возможности в мире открытого геймплея, погружая игроков в захватывающий мир супергеройских приключений.", "8799", 1),
                newStuff("3", "cnsl", "Images/xx.png", "Xbox Series X", "Мощная игровая консоль нового поколения, обеспечивающая впечатляющую производительность, высокую степень совместимости с предыдущими версиями игр, и возможность наслаждаться игровым процессом в высоком разрешении, поднимая планку гейминга на новый уровень.", "56999", 1),
                newStuff("4", "cnsl", "Images/ns.png", "Nintendo Switch", "Объединяет переносимость и домашнюю игровую систему в одном устройстве. С его инновационными съемными контроллерами и многосторонними играми, Nintendo Switch предоставляет игрокам гибкость выбора, создавая увлекательный опыт как в дороге, так и дома.", "39999", 1),
                newStuff("5", "game", "Images/gow.png", "God of War", "God of War переосмысливает легендарный характер Кратоса, предлагая эпическое приключение, насыщенное захватывающим сюжетом и впечатляющей боевой системой. С превосходной графикой, глубокими персонажами и потрясающим миром скандинавской мифологии, игра создает неповторимый и эмоционально насыщенный опыт для игроков.", "1999", 1),
                newStuff("6", "game", "Images/star.png", "Starfield", "Starfield обещает подарить игрокам захватывающее путешествие в бескрайние просторы космоса, предлагая потрясающую графику, увлекательный сюжет и свободу исследования неизведанных галактических территорий. С уникальным сочетанием научной фантастики и огромного открытого мира Starfield обещает стать непревзойденным космическим приключением.", "4999", 1),
                newStuff("7", "game", "Images/cross.png", "Animal Crossing", "Animal Crossing приглашает игроков в уютный мир, где они могут создать свой собственный райский остров, общаться с чрезвычайно милыми животными и наслаждаться спокойной жизнью. С своим непринужденным геймплеем, богатым разнообразием активностей и постоянными сюрпризами, игра становится неповторимым отступлением от реальности, наполняя радостью и умиротворением каждый момент игрового времени.", "5699", 1)]

var stuff = [...everyStuff];


function filterByType(type) {
    if (type === "any") {
        stuff = [...everyStuff];
    }
    else {
        stuff = [];
        for (let i = 0; i < everyStuff.length; i++) {
            if (everyStuff[i]["type"] === type) {
                stuff.push(everyStuff[i]);
            }
        }
    }
    allStuff.innerHTML = "";
    for(let j = 0; j < stuff.length; j++) {
        let buttonText = "";
        let cart = JSON.parse(localStorage.getItem("cart"));
        let ordered = false;
        for (const item of cart) {
            if (item["id"] === stuff[j]["id"]){
                buttonText = "В корзине";
                if (item["incart"] > 1) buttonText += "(" + item["incart"] + ")";
                ordered = true;
            }
        }
        if (!ordered) buttonText = stuff[j]["cost"] + ' ₽';
        allStuff.innerHTML += '<span class="stuff-main">' +
                '<span class="cost" onclick="{addToCart(' +
                stuff[j]["id"] + 
                ')};">' +
                buttonText +
                '</span>' +
                '<img src="' + stuff[j]["img"] + '" alt="" class="stuff-image">' +
                '<span class="stuff-name">'+
                stuff[j]["title"] +
                '</span>' +
                '<span class="stuff-description">' +
                stuff[j]["description"] +
                '</span>' +
                '</span>';}
}

function stuffTypeButtonClicked(index) {
    let rect = stuffTypesSliderContainer.children.item(index).getBoundingClientRect();
    let offset = stuffTypesSliderContainer.children.item(0).getBoundingClientRect().x;
    stuffTypeSelectorStyle.left = rect.x - offset + 10 + "px";
    stuffTypeSelectorStyle.width = rect.width + "px";
    currentFilter = index;
    if (index === 0) filterByType("any");
    else if (index === 1) filterByType("cnsl");
    else if (index === 2) filterByType("game");
}

stuffTypeButtonClicked(0);

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let ordered = false;
    for (let i = 0; i < cart.length; i++) {
        if (parseInt(cart[i]["id"]) === parseInt(id)) {
            cart[i]["incart"] = parseInt(cart[i]["incart"]) + 1; 
            ordered = true;
        }
    }
    if (!ordered) cart.push(everyStuff[id]);
    localStorage.setItem("cart", JSON.stringify(cart));
    stuffTypeButtonClicked(currentFilter);
}