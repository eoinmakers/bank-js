function toPence(amount) {
  return amount * 100;
}

function asPounds(pence) {
  return parseFloat(pence / 100).toFixed(2);
}
