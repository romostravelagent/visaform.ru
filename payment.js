// Display total amount due
window.onload = function() {
    let totalAmount = localStorage.getItem('totalAmount') || '0.00';
    document.getElementById('totalAmountDue').textContent = "Total Amount: $" + totalAmount;
};

// Handle receipt upload form submission with confirmation
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    let receipt = document.getElementById('receipt').files[0];

    if (!receipt) {
        alert("Please upload a payment receipt.");
        event.preventDefault();  // Prevent form submission if no receipt is uploaded
    } else {
        // Show a confirmation dialog to the user
        let confirmAction = confirm("Are you sure you want to submit the payment and proceed?");
        
        // If the user confirms, proceed with form submission and redirection
        if (confirmAction) {
            alert("Thank you for your payment. Redirecting you...");
            localStorage.clear();  // Clear total amount after payment is done
            // Allow form submission to continue (form will post to upload.php)
        } else {
            // Prevent form submission if the user cancels
            alert("Submission canceled.");
            event.preventDefault();
        }
    }
});
