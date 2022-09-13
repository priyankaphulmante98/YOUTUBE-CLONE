
function Signup(event) {
    event.preventDefault()

    let form = document.getElementById("signup-form")

    let user_data = {
        name:form.name.value,
        email:form.email.value,
        password:form.password.value,
        username:form.username.value,
        mobile:form.mobile.value,
        description:form.description.value,
    }

    user_data = JSON.stringify(user_data)

    fetch("https://masai-api-mocker.herokuapp.com/auth/register" , {

        method:"POST",
        body:user_data,
        headers: {
            "Content-Type" : "application/json"
        },

    })

    .then((res) => {

        return res.json()

    })
    .then((res) => {
        console.log("res:" , res);
        backtohome()
    })
    .catch((err) => {
        console.log("err:", err)
    })

}


function backtohome() {
    window.location.href = "index.html"
}