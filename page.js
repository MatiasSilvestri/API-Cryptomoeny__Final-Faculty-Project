const totalData = data.length;
const perpage = 20;
const numbers = Math.ceil(totalData / perpage);
const pagiUI = document.querySelector('.pagination ul');

pagiUI.innerHTML = "";
for (let x = 1; x < numbers; x++) {

    let pagiItem = `<li  
    class="rounded-sm inline-block bg-gray-600 w-10 h-10 text-center leading-10  text-lg  m-1 cursor-pointer text-white font-semibold">
    ${x}
</li>`;
    pagiUI.innerHTML += pagiItem;

}



const pageNumber = 6;


const pageVisited = pageNumber * perpage;
console.log(pageVisited);