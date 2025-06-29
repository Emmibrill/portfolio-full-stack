//validateForm.js

export function attachFormValidator(formSelector, inputSelector){
    const form = document.querySelector(formSelector);
    const fields = document.querySelectorAll(inputSelector)

    function formValidator() {
        validateOnSubmit();
        validateOnChange()
        validateOnEntry()
    }
    //validates form on submit
    function validateOnSubmit() {
        form.addEventListener('submit', (e) => {
            let formIsValid = true;
            fields.forEach(field => {
                if(!validateFields(field)){
                    formIsValid = false;
                }
            })
            // If any field is invalid, prevent form submission
            if(!formIsValid){
                e.preventDefault();
            }else{
                clearField();
            }
        })
    }
    //validates form on entry
    function validateOnEntry() {
        fields.forEach(field => {
            field.addEventListener('input', () => validateFields(field));
        })   
    }
    //validates form on change when using autocomplete
    function validateOnChange() {
        fields.forEach(field => {
            field.addEventListener('click', () => validateFields(field))
        })   
    }

    //validates all the input fields
    function validateFields(field){
        
        if(field.name === 'name'){
                if(field.value.trim() === ''){
                    setStatus(field, 'field cannot be blank', 'error')
                    return false;
                }else if(field.value.length < 3){
                    setStatus(field, 'please enter your full name', 'error')
                    return false;
                }else{setStatus(field, '', 'success')}
            } 

            if(field.type.trim() === 'email'){
                const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if(field.value.trim() === ''){
                    setStatus(field, 'field cannot be blank', 'error')
                    return false;
                }
                else if(!re.test(field.value)){
                    setStatus(field, 'enter a valid email address', 'error')
                    return false;
                } else{
                    setStatus(field, '', 'success')
                }
            }

            if(field.name === 'message'){
                if(field.value.trim() === ''){
                    setStatusForMsg(field, 'field cannot be blank 😞', 'error')
                    return false;
                }else if(field.value.length < 10){
                    setStatusForMsg(field, 'something meaningful please😊', 'error')
                    return false;
                }else{setStatusForMsg(field, '', 'success')}
            } 
            
            return true;
        
    }

    //set status for the input fields
    function setStatus(field, message, status) {   
        
        const errorIcon = field.parentElement.querySelector('.fa-circle-xmark');
        const successIcon = field.parentElement.querySelector('.fa-circle-check');
        const errorMessage = field.parentElement.querySelector('.errorMessage');

        const isServerError = errorMessage.dataset.serverError === "true";
        if (isServerError) return; // If it's a server error, we don't change the status

        if(status === 'success'){
            if(errorIcon)errorIcon.classList.remove('input-error');
            if(successIcon)successIcon.classList.add('input-success');
            if(errorMessage){
                errorMessage.classList.remove('input-error');
                errorMessage.innerHTML = '';
                errorMessage.dataset.serverError = "false"; // Reset server error status
            }
            field.classList.remove('input-error');
            field.classList.add('input-success')
        }
        if(status === 'error'){
            if(successIcon)successIcon.classList.remove('input-success');  
            if(errorIcon)errorIcon.classList.add('input-error');
            if(errorMessage){
                errorMessage.classList.add('input-error')
                errorMessage.innerHTML = message;
                errorMessage.dataset.serverError = "false"; // Reset server error status
            };
            field.classList.remove('input-success');
            field.classList.add('input-error');
        }
    }
    //set status for the message field
    function setStatusForMsg(field, message, status) {  
        const errorForMsg = field.parentElement.querySelector('.errorMessage--message');

        const isServerError = errorForMsg.dataset.serverError === "true";
        
        if (isServerError) return; // If it's a server error, we don't change the status
        if(status === 'success'){
            if(errorForMsg){
                errorForMsg.classList.remove('error')
                errorForMsg.innerHTML = '';
                errorForMsg.dataset.serverError = "false"; // Reset server error status
            };
            field.classList.remove('input-error');
            field.classList.add('input-success')
        }
        if(status === 'error'){
            if(errorForMsg){
                errorForMsg.classList.add('error')
                errorForMsg.innerHTML = message;
                errorForMsg.dataset.serverError = "false"; // Reset server error status
            };
            field.classList.remove('input-success');
            field.classList.add('input-error');
        }
    }
    function clearField(){
       fields.forEach(field =>{
            field.value = '';
            field.classList.remove('input-success', 'input-error');
        })
    }

    formValidator();
}