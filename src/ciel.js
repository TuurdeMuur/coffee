import './style.css';
import {devineLog} from './js/utility/helpers';
import data from './assets/data/coffees.json';

devineLog('Hey, ik ben een JS file');
const arr = [1, 2, 3];

const ES6Stuff = () => devineLog('Ik kan ES6 stuff aan', ...arr);
ES6Stuff();

console.log(data);

const orders = [
  {
    id: 1,
    hoeveelheid: 0
  },
  {
    id: 2,
    hoeveelheid: 0
  },
  {
    id: 3,
    hoeveelheid: 0
  },
  {
    id: 4,
    hoeveelheid: 0
  },
  {
    id: 5,
    hoeveelheid: 0
  }
];

const init = data => {
  ophalen(data);

  const $buttons = document.querySelectorAll('.price');
  $buttons.forEach($button => {
    $button.addEventListener('click', function() {
      console.log('ok');
      const $idString = this.dataset.id;
      const $id = parseInt($idString, 10);

      orders.forEach(order => {
        if (order['id'] === $id) {
          order.hoeveelheid ++;
        }
      });
      showOrder(orders, data);
    });
  });
  //
}; // end of init;

const showOrder = (orders, data) => {
  const $div = document.querySelector('.orders__wrapper');
  $div.innerHTML = ``;
  const $ordersHTML = document.createElement('ul');
  $ordersHTML.classList.add('orders');
  $div.appendChild($ordersHTML);
  $ordersHTML.innerHTML = '';
  orders.forEach(order => {
    if (order.hoeveelheid > 0) {
      data.coffees.forEach(coffee => {
        if (order.id === coffee.id) {
          const $ordersHTML = document.querySelector('.orders');
          const coffeePrice = coffee.prices.medium;
          const hoeveelheid = order.hoeveelheid;
          const total = coffeePrice * hoeveelheid;
          //li
          const $li = document.createElement('li');
          $li.classList.add('order');
          $ordersHTML.appendChild($li);
          //orderName
          const $spanName = document.createElement('span');
          $spanName.classList.add('order__name');
          $spanName.textContent = `${coffee.name}`;
          $li.appendChild($spanName);
          //amount
          const $spanamount = document.createElement('span');
          $spanamount.classList.add('order__amount');
          $spanamount.textContent = `${order.hoeveelheid}x`;
          $spanName.appendChild($spanamount);
          //price
          const $spanPrice = document.createElement('span');
          $spanPrice.classList.add('order__price');
          $spanPrice.textContent = `€ ${total}`;
          $li.appendChild($spanPrice);

          //button
          const $button = document.createElement('button');
          $button.classList.add('remove');
          $button.textContent = `X`;
          $button.dataset.id = `${coffee.id}`;
          $li.appendChild($button);
          $button.addEventListener('click', function() {
            console.log('remover');
            const $idString = this.dataset.id;
            const $id = parseInt($idString, 10);
            orders.forEach(order => {
              if (order['id'] === $id) {
                order.hoeveelheid = 0;
              }
            });
            showOrder(orders, data);
          });
        }
      });
    }
  });
  getTotal(orders, data);
};

const getTotal = (orders, data) => {
  const prijsOat = data.coffees[0].prices.medium * orders[0].hoeveelheid;
  const prijsSoy = data.coffees[2].prices.medium * orders[1].hoeveelheid;
  const prijsRice = data.coffees[3].prices.medium * orders[2].hoeveelheid;
  const prijsKoko = data.coffees[4].prices.medium * orders[3].hoeveelheid;
  const prijsAlm = data.coffees[5].prices.medium * orders[4].hoeveelheid;
  const total = prijsAlm + prijsKoko + prijsOat + prijsRice + prijsSoy;
  showTotal(total);
};

const showTotal = total => {
  const $div = document.querySelector('.orders__wrapper');

  const $totaal = document.createElement('p');
  $totaal.classList.add('total');
  $div.appendChild($totaal);

  $totaal.innerHTML = '';

  const $spanLabel = document.createElement('span');
  $spanLabel.classList.add('total__label');
  $spanLabel.textContent = 'Total';
  $totaal.appendChild($spanLabel);

  const $spanPrice = document.createElement('span');
  $spanPrice.classList.add('total__price');
  $spanPrice.textContent = `€ ${total}`;
  $totaal.appendChild($spanPrice);
};

const ophalen = data => {
  const $pricesList = document.querySelector('.prices__list');
  data.coffees.forEach(coffee => {
    if (coffee.plantbased === true) {
      const $li = document.createElement('li');
      $li.classList.add('price');
      $li.dataset.id = `${coffee.id}`;
      $pricesList.appendChild($li);

      const $a = document.createElement('a');
      $a.classList.add('price__button');
      $li.appendChild($a);

      const $spanPriceWrp = document.createElement('span');
      $spanPriceWrp.classList.add('price__button__wrapper');
      $a.appendChild($spanPriceWrp);

      const $spanName = document.createElement('span');
      $spanName.classList.add('price__button__name');
      $spanName.textContent = `${coffee.name}`;
      $spanPriceWrp.appendChild($spanName);

      const $spanPrice = document.createElement('span');
      $spanPrice.classList.add('price__button__amount');
      $spanPrice.textContent = `€ ${coffee.prices.medium}`;
      $spanPriceWrp.appendChild($spanPrice);

      const $spanPlus = document.createElement('span');
      $spanPlus.classList.add('price__button__plus');
      $spanPlus.textContent = '+';
      $a.appendChild($spanPlus);
    }
  });
};

init(data);
