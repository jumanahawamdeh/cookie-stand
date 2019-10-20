"use strict"
var hour = ["6am ", '7am ', '8am', '9am', '10am', '11am', '12pm ', '1pm ', '2pm ', '3pm ', '4pm ', '5pm ', '6pm ', '7pm '];
var footerRow;
function SweetShop(location, min, max, Avg) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.Avg = Avg;
    this.dailySales = 0;
    this.hourlySales = [];
    this.random();
    this.hourlyDailySales();

}

SweetShop.prototype.random = function () {
    var range = this.max - this.min;
    var rand = Math.random() * range + this.min;
    return Math.ceil(rand);
}
SweetShop.prototype.hourlyDailySales = function () {
    for (var jumana= 0; jumana < hour.length; jumana++) {
        var numOfCookies = Math.ceil(this.random() * this.Avg);
        this.hourlySales.push(numOfCookies);
        this.dailySales += numOfCookies;
    }
}
var shopList = [];

shopList.push(new SweetShop('Seattle', 23, 65, 6.3));
shopList.push(new SweetShop('Tokyo', 3, 24, 1.2));
shopList.push(new SweetShop('Dubai', 11, 38, 3.7));
shopList.push(new SweetShop('Paris', 20, 38, 2.3));
shopList.push(new SweetShop('Lima', 2, 16, 4.6));

var container = document.getElementById('shops-for-cookies');
var table1 = document.createElement('table');
container.appendChild(table1);

function headerRow() {
    var headerRow = document.createElement('tr');
    table1.appendChild(headerRow);
    var th = document.createElement('th');
    headerRow.appendChild(th);
    th.textContent = 'xxx';
    for (var i = 0; i < hour.length; i++) {
        var th = document.createElement('th');
        headerRow.appendChild(th);
        th.textContent = hour[i];
    }


    var th = document.createElement('th');
    headerRow.appendChild(th);
    th.textContent = 'Daily Location Total';
}




function cellDataInformation() {
    for (var jumana = 0; jumana < shopList.length; jumana++) {
        var currentShop = shopList[jumana];
        var shoprow = document.createElement('tr');
        table1.appendChild(shoprow);
        var shopTd = document.createElement('td');
        shoprow.appendChild(shopTd);
        shopTd.textContent = currentShop.location;
        for (var j = 0; j < hour.length; j++) {
            var cellInput = document.createElement('td');
            shoprow.appendChild(cellInput);
            cellInput.textContent = currentShop.hourlySales[j];
            //dataIn.textContent = 'hi'
        }
        console.log(cellInput);
        shopTd = document.createElement('td');
        shoprow.appendChild(shopTd);

        shopTd.textContent = currentShop.dailySales;
    }
}
function footerData() {
    var footerRowTr = document.createElement('tr');
    footerRow= footerRowTr ;
    table1.appendChild(footerRowTr);
    var td = document.createElement('td');
    footerRowTr.appendChild(td);
    td.textContent = 'Totals';
    var megaTotal = 0;

    for (var hourIndex = 0; hourIndex < hour.length; hourIndex++) {

        var td = document.createElement('td');

        footerRow.appendChild(td);

        var sum = 0;

        for (var shopIndex = 0; shopIndex < shopList.length; shopIndex++) {

            var shop = shopList[shopIndex];

            sum += shop.hourlySales[hourIndex];
        }

        td.textContent = sum;

        megaTotal += sum;
    }

   var td = document.createElement('td');

    footerRow.appendChild(td);

    td.textContent = megaTotal;
}

headerRow(table1);
cellDataInformation(table1);
footerData(table1);

function renderRaw() {
    var tr = document.createElement('tr');
    table1.appendChild(tr);
    var td = document.createElement('td');
    tr.appendChild(td);
    var thecurrent =shopList[shopList.length-1];
    console.log(thecurrent);
    td.textContent = thecurrent.location;
    
    for (var cellIndex = 0; cellIndex < hour.length; cellIndex++) {
        var info = document.createElement('td');
        tr.appendChild(info);
        info.textContent = thecurrent.hourlySales[cellIndex];
    }
     var td = document.createElement('td');
      tr.appendChild(td);
      td.textContent = thecurrent.dailySales;
  }


function submitresult(event) {
    event.preventDefault();
    var location = event.target.location.value;
    var min = parseInt(event.target.min.value);
    var max = parseInt(event.target.max.value);
    var Avg= parseFloat(event.target.Avg.value);

    var newShop = new SweetShop(location, min, max, Avg);
    shopList.push(newShop);
    console.log(newShop);
    table1.removeChild(footerRow);
    
    renderRaw();
    footerData();    
}
var form = document.getElementById('addShopForm');
form.addEventListener('submit', submitresult);