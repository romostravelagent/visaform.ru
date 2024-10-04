window.onload = function() {
    let totalAmount = localStorage.getItem('totalAmount') || '0.00';
    document.getElementById('totalAmountDue').textContent = "Общая сумма: $" + totalAmount;
};

document.getElementById('paymentForm')

// Event listener for the payment form submission
document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Here you can add actual upload logic if needed

    // Simulate successful upload
    alert("Квитанция успешно загружена! Перенаправляем на страницу подтверждения...");

    // Redirect to congratulations.html page
    window.location.href = "congratulations.html";
});
