async function calculate(num1,num2,operator) {
    let result = 0;
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operator';
    }
    return result;
}

async function pressButton(button, value = null) {
    let display = document.getElementById('calculatorDisplay')
    if(button == "clear"){
        display.innerHTML = "0"
    }
    else if(button == "num"){
        if(display.innerHTML.length > 20) return
        else if(display.innerHTML == "0"){
            display.innerHTML = value
            return
        }

        display.innerHTML += value
    }
    else if(button == "operator"){
        if(display.innerHTML.length > 20 || display.innerHTML == "0" || display.innerHTML.indexOf("/") != -1 || display.innerHTML.indexOf("*") != -1 || display.innerHTML.indexOf("–") != -1 || display.innerHTML.indexOf("+") != -1) return
        
        if(value == "div") display.innerHTML += " / "
        else if(value == "mult") display.innerHTML += " * "
        else if(value == "sub") display.innerHTML += " – "
        else if(value == "add") display.innerHTML += " + "
    }
    else if(button == "eval"){
        console.log("evaluating")
    }
}