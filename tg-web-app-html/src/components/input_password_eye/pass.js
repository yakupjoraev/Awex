function passwordSee() {
  const passwordGroups = document.querySelectorAll('.form-group input[type="password"]');

  passwordGroups.forEach(passwordGroup => {
    const passwordInput = passwordGroup;
    const eyeButton = passwordGroup.parentNode.querySelector('.form-eye');
    const eyeImage = eyeButton.querySelector('img');

    eyeButton.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeImage.src = './img/eye-open.svg';
      } else {
        passwordInput.type = 'password';
        eyeImage.src = './img/eye-close.svg';
      }
    });
  });


}

passwordSee();