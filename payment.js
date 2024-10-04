window.onload = function() {
    let totalAmount = localStorage.getItem('totalAmount') || '0.00';
    document.getElementById('totalAmountDue').textContent = "Общая сумма: $" + totalAmount;
};

document.getElementById('paymentForm')