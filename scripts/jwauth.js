const result = fetch('/dashboard', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        token: localStorage.getItem('token')
    })
}).then((res) => res.json())
console.log("hello")
if (result.status == 'error') {
    cosole.log("error")
    alert("Access Denied "+result.error.toString());
    window.location.href="About:blank"
}
