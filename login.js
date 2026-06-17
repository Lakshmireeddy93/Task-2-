const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "home.html";
        }

    } catch (error) {
        console.log(error);
        alert("Login Failed (Server issue)");
    }
});