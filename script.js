document.getElementById("visaApplicationForm").addEventListener("submit", function(event) {
    // Perform custom validation
    var fullName = document.getElementById("fullName").value;
    var dob = document.getElementById("dob").value;
    var passportNumber = document.getElementById("passportNumber").value;
    var travelDate = document.getElementById("travelDate").value;

    if (fullName === "" || dob === "" || passportNumber === "" || travelDate === "") {
        alert("Please fill out all required fields.");
        event.preventDefault();
    } else {
        alert("Your visa application has been submitted!");
    }
});

// Event listener for all checkbox and select inputs
document.querySelectorAll('input[type=checkbox], select').forEach(item => {
    item.addEventListener('change', calculateTotal);
});

// Calculate Total Amount based on selections
function calculateTotal() {
    const visaPrices = {
        "Tourist": 2200,
        "Business": 3100,
        "Family": 4150,
        "Working": 850
    };

    const servicesPrices = {
        "medicalShot": 350,
        "policeReport": 99,
        "flightTicket": 1750,
        "accommodationFees": 3300
    };

    let visaType = document.getElementById("visaType").value;
    let total = visaPrices[visaType] || 0;

    if (document.getElementById("medicalShot").checked) total += servicesPrices.medicalShot;
    if (document.getElementById("policeReport").checked) total += servicesPrices.policeReport;
    if (document.getElementById("flightTicket").checked) total += servicesPrices.flightTicket;
    if (document.getElementById("accommodationFees").checked) total += servicesPrices.accommodationFees;

    localStorage.setItem('totalAmount', total.toFixed(2));
    document.getElementById("totalAmount").textContent = "Total Amount: $" + total.toFixed(2);
}

// Event listeners for form elements
document.querySelectorAll('input[type=checkbox], select').forEach(item => {
    item.addEventListener('change', calculateTotal);
});

// Update the total on page load
window.onload = calculateTotal;


// Prevent default form submission and redirect to payment page
document.getElementById("visaApplicationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    // You can add form validation here

    // Redirect to payment page
    window.location.href = "payment.html";
});
