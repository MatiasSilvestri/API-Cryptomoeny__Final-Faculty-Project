// create variables
const spinner = document.querySelector('#spinner');
const searchInput = document.querySelector('.data-search input');
const searchBtn = document.querySelector('.data-search button');
const notFoundText = document.querySelector('#nodata');
const tableData = document.querySelector('.tableBody');
const bodyOverlay = document.querySelector('.body-overlay');

const searchFun = (searchVal, apidata) => { // Search for cryptocurrency data in the CoingeckoAPI
    const searchmatchData = apidata.filter((e) => {
        if (e.id.toLowerCase().includes(searchVal.toLowerCase()) || e.symbol.toLowerCase().includes(searchVal.toLowerCase())) {
            return e;
        }
    })

    showData(searchmatchData);
}

const loadData = async () => { //Import the API
    const getData = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false');
    const jsonData = await getData.json();
    showData(jsonData);

    searchBtn.addEventListener('click', (e) => { //bubcion de boton "Search Cryptocurrency".

        const searchVal = searchInput.value;
        if (searchVal === "") {
            alert('plese write something');
            return false;
        } else {
            searchFun(searchVal, jsonData);
        }

    })
}

const showData = (data) => { //Print data on screen
    if (data.length === 0) {
        notFoundText.classList.remove('hidden');
        tableData.textContent = "";
    } else {
        tableData.textContent = "";
        notFoundText.classList.add('hidden');
        spinner.classList.add('hidden');


        data.forEach(val => { //For organising data in the form of a list list
            const allprofit = val.price_change_percentage_24h.toFixed(2);

            let dataItem = `<tr  onclick="moreInformation('${val.id}','${val.current_price}')" class="shadow-sm shadow-gray-700 hover:bg-gray-900 cursor-pointer">
        <td class=" border-gray-500 p-1 flex flex-col items-center ">
        <img class="w-14 pl-3" src="${val.image}"/>
        <p class="pl-3 mt-2">${val.name}</p>
        </td>
        <td class=" p-1 border-gray-500">${val.current_price.toFixed(2)}$</td>
        <td class=" p-1 border-gray-500">${allprofit > 0 ? `<span class="text-green-700">${allprofit}%</span>` : `<span class="text-red-600">${allprofit}%</span>`}</td>
        <td class=" p-1 border-gray-500">${val.market_cap.toString().slice(0, -6)}M</td>
    </tr>`;
            tableData.innerHTML += dataItem;
        });

    }

}
loadData();

const moreInformation = async (data, cprize) => {
    bodyOverlay.classList.remove('hidden');
    const loadSingle = await fetch(`https://api.coingecko.com/api/v3/coins/${data}`);
    const jsonSingle = await loadSingle.json();
    showModal(jsonSingle, cprize);
    modalContent.classList.add('active');

}

const modalContent = document.querySelector('.modal-all-content');
const showModal = (data, cprize) => {

    let modalItems = `
    <div div class="modal-head py-3 border-b border-gray-600 flex justify-between items-center">
        <img class="w-12" src="${data.image.small}" alt=""
            srcset="">
        <button onclick="closemodal()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </button>

    </div>

    <div class="modal-body grid gap-5 grid-cols-1 md:grid-cols-2 mt-4">
       <div class="modal-left ">
       <h2 class="capitalize font-bold text-3xl">${data.id}<span class="text-gray-700 text-lg font-semibold ml-2">${data.symbol}</span></h2>
       <p class="text-yellow-400 font-semibold mt-3">Creation Date: ${data.genesis_date ? data.genesis_date : `<span>date is not avilable</span>`}</p>
       <p id="discription" class="mt-3 text-white capitalize text-opacity-90 leading-relaxed">hello</p>
       </div>
       <div class="modal-right">
       <h2 class="mb-1 text-3xl capitalize font-bold text-gray-700">Current Prize:</h2>
       <p class="mb-4 capitalize text-2xl font-semibold">1 ${data.symbol}= <span class="text-yellow-400">${cprize}$</span></p>
         <p class="capitalize mt-2 text-gray-700">trade now</p>
         <div class="trade-container max-h-80 overflow-y-auto no-scrollbar mt-5">
                <table class=" border-none w-full border text-white text-center">
                    <thead class="">
                        <tr class="shadow-sm shadow-gray-700">
                            <th class="p-3">coin</th>

                            <th class="p-3">market</th>
                            <th class="p-3">link</th>
                        </tr>
                    </thead>

                    <tbody class="tradeTable">

                    </tbody>

                </table>
         </div>
       </div>
    </div>

    `;
    modalContent.innerHTML = modalItems;

    const tradeContainer = document.querySelector('.tradeTable');
    if (data.description.en !== "") {
        document.querySelector('#discription').innerHTML = data.description.en.slice(0, 300);
    } else {
        document.querySelector('#discription').innerHTML = `<p class="text-2xl text-gray-700">Sorry Discription is not Avilable</p>`;
    }

    data.tickers.forEach((v) => {
        let tradeItem = `<tr   class="shadow-sm  shadow-gray-700  cursor-pointer">
        <td class=" border-gray-500 p-1.5 mt-2"><span>${v.base.slice(0, 10)} / ${v.target.slice(0, 10)}</span></td>

        <td class=" p-1.5 border-gray-500 mt-2">${v.market.name}</td>
        <td class=" p-1.5 border-gray-500 mt-2"><button class="bg-yellow-500 w-16 rounded-sm capitalize font-semibold h-9"><a target="_BLANK" class="block" href="${v.trade_url}">Trade</a></button></td>
         </tr>`;
        tradeContainer.innerHTML += tradeItem;
    })




}

const closemodal = () => {
    bodyOverlay.classList.add('hidden');
    modalContent.classList.remove('active');
}
bodyOverlay.addEventListener('click', closemodal);
