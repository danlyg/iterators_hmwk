var line_items = [
    {description: "aardvark", price: 425, qty: -1},
    {description: "PruNe", price: 1.99, qty: 1},
    {description: "potato", price: .79, qty: -10},
    {description: "zebra", price: 525.25, qty: 1},
    {description: "SpinAch", price: 2.99, qty: 1},
    {description: "zepplin", price: 20000, qty: 1},
    {description: "PetUnia", price: 1.25, qty: 12},
    {description: "squash", price: 2.35, qty: 3}
];

var coupons = [
    {description: "Zebra", discount: 100, limit: 1},
    {description: "squash", discount: 1.00, limit: 1},
    {description: "mouse", discount: 2.00, limit: 10}
];

var $entries, 
    $subTotal,
    $salesTax,
    $total;

$(document).ready(function(){

   $entries = $("#entries");
   $subTotal = $('#subtotal');
   $salesTax = $('#salestax');
   $total = $('#total');

  myUtils.myEach(line_items, function(v,i){
    addItem(v.price, v.description, v.qty);
  });


  updateSubTotal();
  updateSalesTax();
  totalSubTotalSaleTax();



});

function addItem(price, title, quantity) {
  var newLineItem = myUtils.buildElement(price, title, quantity);
  $entries.append(newLineItem);
}

function updateSubTotal() {
  var subTotalPrice = myUtils.myReduce(line_items, function(val,item,i,arr){
    return (val + (item.price*item.qty));
  })

  $subTotal.text("$" + subTotalPrice); 
  updateSalesTax(subTotalPrice)
  return subTotalPrice;
}


function updateSalesTax(){
  var salesTax = myUtils.myReduce(line_items, function(val,item,i,arr){
    return (val +(item.price*item.qty*0.0725));
  })
  salesTax = myUtils.toDollarAmount(salesTax);
  $salesTax.text('$' + salesTax); 
  return salesTax;
}


function totalSubTotalSaleTax(){
  var total = updateSubTotal()+updateSalesTax();
  total = myUtils.toDollarAmount(total);
  $total.text('$' + total);
}
