function calculateTotal() {
    let visaType = document.getElementById('visaType').value;
    let totalAmount = 0;

    // Visa Type Calculation
    switch (visaType) {
        case 'Туристическая виза':
            totalAmount += 2200;
            break;
        case 'Бизнес виза':
            totalAmount += 3100;
            break;
        case 'Семейная виза':
            totalAmount += 4150;
            break;
        case 'Рабочая виза':
            totalAmount += 8500;
            break;
    }

    // Additional Services Calculation
    if (document.getElementById('medicalShot').checked) {
        totalAmount += 350;
    }
    if (document.getElementById('policeReport').checked) {
        totalAmount += 99;
    }
    if (document.getElementById('flightTicket').checked) {
        totalAmount += 1750;
    }
    if (document.getElementById('accommodation').checked) {
        totalAmount += 3300;
    }

    // Update total amount displayed
    document.getElementById('totalAmount').textContent = `Общая сумма: $${totalAmount.toFixed(2)}`;
    
    // Store total amount in local storage for payment page
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
}

// On form submission, redirect to payment.html
document.getElementById('visaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'payment.html';
});

document.getElementById("visaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Here you can add form validation logic (if needed)

    // Simulate successful form submission
    alert("Ваша заявка на визу была отправлена! Перенаправляем на страницу подтверждения...");

    // Redirect to congratulations.html page
    window.location.href = "congratulations.html";
});