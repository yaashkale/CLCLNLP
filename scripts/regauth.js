const form = document.getElementById('contactForm')
form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const name = document.getElementById('name').value
    const language = document.getElementById('language').value
    const institution= document.getElementById('institution').value
    const result = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,username,
            password, institution, language
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everythign went fine
        alert('Registered as \''+username+'\'. You can login using this username')
        window.location.href = "/"
    } else {
        alert(result.error)
    }
}