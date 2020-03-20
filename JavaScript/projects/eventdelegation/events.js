const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');

//Adds listener to each list item
listItems.forEach(listItem => {
  listItem.addEventListener('click', event => {
    event.target.classList.toggle('highlight');
  });
});


// Adds listener to the parent
/*list.addEventListener('click', event => {
   console.log(event.currentTarget);
  //event.target.classList.toggle('highlight');
  //event.target.closest('li').classList.toggle('highlight');
});*/
