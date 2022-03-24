const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


// INPUT FILTER //

function cleanUsername(e) {
  var textField = document.getElementById(e)
  var regex = /[^a-z0-9\u0020\u005F]/gi;
  textField.value = textField.value.replace(regex, "");
}


function cleanPassword(e) {
  var textField = document.getElementById(e)
  var regex = /[^a-z0-9\u005F]/gi;
  textField.value = textField.value.replace(regex, "");
}



/* LOGIN PAGE CHECKER */

const logform = document.getElementById('logform')
let logusername = document.getElementById('logusername')
const logemail = document.getElementById('logemail')
const logpassword = document.getElementById('logpassword')


logform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputsLogin()
});


function checkInputsUsernameLogin() {
  const username = logusername.value.trim();

  if(username.length < 4 && username.length > 0) {
    setErrorFor(logusername, 'Enter a valid username')
  } else if(username.length == 0 | '') {
    setErrorFor(logusername, 'Field is empty')
  } else if(username.length > 24) {
    setErrorFor(logusername, 'The Username cannot be larger than 24 chars.')
  } else {
    const formControl = logusername.parentElement;

    formControl.className = 'input-field'
  }
}

function checkInputsPasswordLogin() {
  const password = logpassword.value.trim();

  if(password.length < 8 && password.length > 0) {
    setErrorFor(logpassword, 'Password Incorrect')
  } else if(password.length == 0) {
    setErrorFor(logpassword, 'Field is empty')
  }  else if(password.length > 255) {
    setErrorFor(logpassword, 'The Password cannot be larger than 24 chars.')
  } else {
    const formControl = logpassword.parentElement;

    formControl.className = 'input-field'
  }
}

// verification
async function checkInputsLogin() {

  const username = logusername.value.trim();

  if(username.length < 4 && username.length > 0) {
    setErrorFor(logusername, 'Enter a valid username')
    canDoThisBruh = false
  } else if(username.length == 0 | '') {
    setErrorFor(logusername, 'Field is empty')
    canDoThisBruh = false
  } else if(username.length > 24) {
    setErrorFor(logusername, 'The Username cannot be larger than 24 chars.')
    canDoThisBruh = false
  } else {
    const formControl = logusername.parentElement;

    formControl.className = 'input-field'
    canDoThisBruh = true
    
  }

  const password = logpassword.value.trim();

  if(password.length < 8 && password.length > 0) {
    setErrorFor(logpassword, 'Password Incorrect')
    canDoThisBruh = false
  } else if(password.length == 0) {
    setErrorFor(logpassword, 'Field is empty')
    canDoThisBruh = false
  }  else if(password.length > 255) {
    setErrorFor(logpassword, 'The Password cannot be larger than 24 chars.')
    canDoThisBruh = false
  } else {
    const formControl = logpassword.parentElement;

    formControl.className = 'input-field'
    canDoThisBruh = true
  }

  if(canDoThisBruh == true) {
    let loginusernametoDB = document.getElementById('logusername')

    try {

      $.ajax({
          type: "POST",
          url: "/php/login.php",
          data: "usernameData=DaRealAdalbertBro",
          cache: false,
          success: function(datas){
            $.each(datas, function(idx, loginData){
              console.log(loginData.name)
              console.log(loginData.password)
            });
          },
          error: function(xhr, status, error) {
          console.error(xhr.responseText);
          console.error(status);
          console.error(error);
          }
      });

    } catch(err) {console.log(err)}
   
   
    //logform.submit()
  } else return
}



/* REGISTER PAGE CHECKER */

const regform = document.getElementById('regform')
const regusername = document.getElementById('regusername')
const regemail = document.getElementById('regemail')
const regpassword = document.getElementById('regpassword')


regform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputsRegister();
});


function checkInputsUsernameRegister() {
  const username = regusername.value.trim();

  const formControl2 = regusername.parentElement
  const textSpan = formControl2.querySelector('p');

  if(username.length >= 0) {
    textSpan.innerText = username.length;
  }
  if(username.length < 4) {
    textSpan.style.color = 'rgb(241, 101, 7)';
  } else {
    textSpan.style.color = 'rgb(221, 221, 221)';
  }
  if(username.length === 24) {
    textSpan.style.color = 'rgba(255, 255, 255, 0.459)';
  }
}

function checkInputsEmailRegister() {
  const email = regemail.value.trim();

  const formControl2 = regemail.parentElement
  const errorText = formControl2.querySelector('small');

  if(ValidateEmail(email) == true) {
    
      formControl2.className = 'input-field'
    

  } else {

    if(email.length > 0) {
      errorText.innerText = 'Enter a valid email adress';
  
      formControl2.className = 'input-field error'
    }

    if(email.length == 0) {
      errorText.innerText = 'Field is empty';
      formControl2.className = 'input-field'
    }

  }

}


function checkInputsPasswordRegister() {
  const password = regpassword.value.trim();

  const formControl2 = regpassword.parentElement
  const passSpan = formControl2.querySelector('p');

  if(password.length >= 0) {
    passSpan.innerText = `${password.length}`;
  }
  if(password.length < 8) {
    passSpan.style.color = 'rgb(241, 101, 7)';
  } else {
    passSpan.style.color = 'rgb(221, 221, 221)';
  }
  if(password.length === 255) {
    passSpan.style.color = 'rgba(255, 255, 255, 0.459)';
  }
}


function checkInputsRegister() {
  // checks database validation
  
}


function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  } 
  
  return (false)
}


function setErrorFor(input, message) {

  const formControl3 = input.parentElement;
  const small = formControl3.querySelector('small');
  small.innerText = message;

  formControl3.className = 'input-field error'
}
