function sendmail(event) {
    event.preventDefault(); // STOP page reload

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs
        .send("service_a4w3p7p", "template_b49j11c", params)
        .then(
            function () {
                alert("✅ Message sent successfully!");
                document.querySelector(".contact-form").reset();
            },
            function (error) {
                alert("❌ Failed to send message");
                console.log(error);
            }
        );
}
