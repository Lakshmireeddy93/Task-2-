const form = document.getElementById("registerForm");

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    try{

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;

    console.log(fullname,email,mobile,password);
    console.log("Before Fetch");

    const response = await fetch('http://localhost:5000/register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            fullname, 
            email, 
            mobile, 
            password 
        })
    });
    const data = await response.json();
    alert(data.message);
    
    } catch (error) {
        console.error(error); 
        alert("Fetch Error");
    }
});