// product-page
function clickimg(smallImg) {
    var allImg = document.getElementById("myimage");
    allImg.src = smallImg.src

}

//Dynanic search

function searchShow(query) {
    const url = `https://newsdata.io/api/1/news?apikey=pub_14406c5b37bd7591647f308b979c32711b925&q=${query}`;
    fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
            const results = jsonData.results.map(element => element.title);
            renderResults(results);
            document.getElementById('errorMessange').innerHTML = '';
        })
        .catch(() => {
            document.getElementById('errorMessange').innerHTML = '';
            renderResults([]);
        });

}

const searchFieldElement = document.getElementById('searchField');

function renderResults(results) {
    const list = document.getElementById('resultsList');
    list.innerHTML = '';
    results.forEach(result => {
        const element = document.createElement('li');
        element.innerText = result;
        list.append(element);

        if (searchFieldElement.value == "") {
            list.style.display = 'none';
        }
        if (searchFieldElement.value !== "") {
            list.style.display = 'block';
        }


    })

}

const searchTimeoutToken = 0;

searchFieldElement.onkeyup=(e) => {
    clearTimeout(searchTimeoutToken);
    searchTimeoutToken = setTimeout(() => {
        searchShow(searchFieldElement.value);
    }, 250);

};
//price-section

var a = '₹';
var b = '$';
var c = '€';
var d = 'Total';
var price = 1200;
var mattPrice = 1400;
var royalPrice = 1800;

function payment() {

    document.getElementById('total_amount').innerHTML = (d + " " + price + " " + a);

    var myHeaders = new Headers();
    myHeaders.append("apikey", "gkyztFrhGy96kc82CTQYX7TKalKMa3q8");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };


    var currencyValue = document.getElementById('currency').value;
    var quantityValue = parseInt(document.getElementById('quantity').value);
    console.log(quantityValue);
    var materialValue = document.getElementById('material').value;
    console.log(materialValue);


    async function execute() {
        let result = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyValue}&from=inr&amount=1`, requestOptions)
        console.log(result); 
        let rupees = await result.json();
        console.log(rupees.result);


        //inr
        if (currencyValue === 'inr' && materialValue == 'casualfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (price * quantityValue) + " " + a);
        }
        if (currencyValue === 'inr' && materialValue == 'mattfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (mattPrice * quantityValue) + " " + a);
        }
        if (currencyValue === 'inr' && materialValue == 'royalfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (royalPrice * quantityValue) + " " + a);
        }

        //usd

        if (currencyValue === 'usd' && materialValue == 'casualfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (price * rupees.result * quantityValue).toFixed(2) + " " + b);

        }
        if (currencyValue === 'usd' && materialValue == 'mattfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (mattPrice * rupees.result * quantityValue).toFixed(2) + " " + b);

        }

        if (currencyValue === 'usd' && materialValue == 'royalfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (royalPrice * rupees.result * quantityValue).toFixed(2) + " " + b);

        }


        //eur
        if (currencyValue === 'eur' && materialValue == 'casualfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (price * rupees.result * quantityValue).toFixed(2) + " " + c);
        }
        if (currencyValue === 'eur' && materialValue == 'mattfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (mattPrice * rupees.result * quantityValue).toFixed(2) + " " + c);

        }
        if (currencyValue === 'eur' && materialValue == 'royalfinish') {
            document.getElementById('total_amount').innerHTML = (d + " " + (royalPrice * rupees.result * quantityValue).toFixed(2) + " " + c);
        }
    }
    execute() ;
}

// zoom-effect

const zoom = document.getElementById('zoom');
const myimage = document.getElementById('myimage');

zoom.addEventListener("mousemove", (e) => {
    clientX = e.clientX - zoom.offsetLeft;
    clientY = e.clientY - zoom.offsetTop;

    mWidth = zoom.offsetWidth;
    mHeight = zoom.offsetHeight;

    clientX = clientX / mWidth * 200
    clientY = clientY / mHeight * 200

    myimage.style.transform = 'translate(-' + clientX + '%,-' + clientY + '%) scale(3)'
});
zoom.addEventListener("mouseleave", () => {
    myimage.style.transform = 'translate(-50%, -50%) scale(1)'
});

// product-page-end