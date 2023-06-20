const emailaddress = document.getElementById('emailaddress');
const password = document.getElementById('password');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = []
    if (emailaddress.value === '' || emailaddress == null){
        messages.push('Email address is required')
    }

    if (messages.length > 0) {

    }
}
)