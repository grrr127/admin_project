// 제출 이벤트를 받는다

// 제출된 입력 값들을 참조한다

// 입력값에 문제가 있는 경우 이를 감지한다

// 가입 환영 인사를 제공한다

const form = document.getElementById("form");
const userIdInput = document.getElementById("idInput");
const userPw1Input = document.getElementById("pw1Input");
const userPw2Input = document.getElementById("pw2Input");
const userPhoneInput = document.getElementById("phoneInput");
const userEmailInput = document.getElementById("emailInput");

// id 실시간 유효성 검사
function validateId() {
  const idRegex = /^[a-z0-9]{6,}$/;
  if (!idRegex.test(userIdInput.value)){
    userIdInput.classList.add("is-invalid");
    return false;
  } else {
    userIdInput.classList.remove("is-invalid");
    return true;
  }
}

// 비밀번호에 영문, 숫자, 특문이 다 들어갓는지
function validatePasswordComplexity() {
  const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`]).{8,30}/;
  if (!passwordRegex.test(userPw1Input.value)) {
    userPw1Input.classList.add("is-invalid");
    return false;
  } else {
    userPw1Input.classList.remove("is-invalid");
    return true;
  }
}

// 비밀번호가 일치하는지
function validatePasswordMatch() {
  const isMatch = (userPw1Input.value === userPw2Input.value) && userPw2Input.value.length > 0;
  if (!isMatch) {
    userPw2Input.classList.add("is-invalid");
    return false;
  } else {
    userPw2Input.classList.remove("is-invalid");
    return true;
  }
}

// 전화번호가 숫자로만 가능하게 10,11자로
function validatePhone() {
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(userPhoneInput.value)) {
    userPhoneInput.classList.add("is-invalid");
    return false;
  } else {
    userPhoneInput.classList.remove("is-invalid");
    return true;
  }
}

// 이메일이 맞는 양식인지
function validateEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (userEmailInput.value === "" || emailRegex.test(userEmailInput.value)) {
    userEmailInput.classList.remove("is-invalid");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    return false;
  }
}

// 작성하면 바로 유효성 검사
userIdInput.addEventListener("keyup", validateId);
userIdInput.addEventListener("blur", validateId); // 벗어날때 검사

// 비밀번호 검사
userPw1Input.addEventListener("keyup", validatePasswordComplexity);
userPw1Input.addEventListener("blur", validatePasswordComplexity);
userPw2Input.addEventListener("keyup", validatePasswordMatch);
userPw2Input.addEventListener("blur", validatePasswordMatch);

// 전화번호 검사
userPhoneInput.addEventListener("keyup", validatePhone);
userPhoneInput.addEventListener("blur", validatePhone);

// 이메일 검사
userEmailInput.addEventListener("keyup", validateEmail);
userEmailInput.addEventListener("blur", validateEmail);

// 폼 제출 시 최종 유효성 검사
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 기본 기능 차단(새로고침x)

  const isIdValid = validateId();
  const isPasswordComplexityValid = validatePasswordComplexity();
  const isPasswordMatchValid = validatePasswordMatch(); 
  const isPhoneValid = validatePhone();
  const isEmailValid = validateEmail();

  // 통과하면 넘기기
if (isIdValid && isPasswordComplexityValid && isPasswordMatchValid && isPhoneValid && isEmailValid) {
    const userNameInput = document.getElementById("nameInput");
    const userGender = form.elements.gender.value;

    const userId = userIdInput.value;
    const userName = userNameInput.value;
    const userPhone = userPhoneInput.value;
    const userEmail = userEmailInput.value;

    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('userName', userName);
    params.append('userPhone', userPhone);
    params.append('userGender', userGender);
    params.append('userEmail', userEmail);
    
    // welcome.html로 리디렉션
    window.location.href = `welcome.html?${params.toString()}`;
  }
});

