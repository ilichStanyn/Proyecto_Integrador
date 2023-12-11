const add = document.querySelector('#add');
const sub = document.querySelector('#sub');
const quantity = document.querySelector('#quantity');

/*console.log(add, sub, quantity);*/

add.addEventListener('click', ()=> quantity.value = Number(quantity.value)+1);
sub.addEventListener('click', (result)=> 
{
if (quantity.value > 0)
quantity.value = Number(quantity.value)-1});


