var isAdListed = false;

const stuffTypesSliderContainer = document.getElementById("stuff-types-container")
const stuffTypeSelectorStyle = document.getElementById("stuff-type-selector")?.style;
const stuffScroll = document.getElementsByClassName("all-stuff");

const delay = ms => new Promise(res => setTimeout(res, ms));

async function advertismentTimer() {
    const adImg1 = document.getElementById("adImg1");
    const adImg2 = document.getElementById("adImg2");
    const adImgDiv = document.getElementById("adDiv1");
    const adImgDivSecond = document.getElementById("adDiv2");
    const adText = document.getElementsByClassName("black-back-for-words").item(0);
    let i = 0;
    let texts = ['Новейшая PlayStation 5', 'Мощнейная Xbox Series X', 'Удобнейшая Nintendo Switch'];
    let images = ['Images/PS5.png', 'Images/xbox.jpg', 'Images/nintendo.jpg'];

    while(true) {
        await delay(15000);
        if(isAdListed) {
            isAdListed = false;
        }
        else {
            i = (i + 1) % texts.length;
            adText.textContent = texts[i];
            adImg2.src = images[i];
            adImgDiv.style.opacity = 0;
            await delay(1000);
            adImg1.src = images[i];
            adImgDiv.style.opacity = 1;
            await delay(1000);
        }
    }
}

advertismentTimer();