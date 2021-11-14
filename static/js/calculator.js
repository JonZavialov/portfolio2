async function calculate(num1,num2,operator) {
    let result = 0;
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '–':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    return result;
}

async function pressButton(button, value = null) {
    let display = document.getElementById('calculatorDisplay')
    if(button == "clear"){
        display.innerHTML = "0"
        display.className = ""
    }
    else if(button == "num"){
        if(display.innerHTML.length > 20) return
        else if(display.innerHTML == "0" || display.className == "answered"){
            display.innerHTML = value
            display.className = ""
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
        display.className = ""
    }
    else if(button == "eval"){
        let hasOperator = display.innerHTML.indexOf("/") != -1 || display.innerHTML.indexOf("*") != -1 || display.innerHTML.indexOf("–") != -1 || display.innerHTML.indexOf("+") != -1
        let hasTwoNumbers = display.innerHTML.indexOf(" ") != -1 && display.innerHTML.substr(-1) != " "
        if(hasOperator && hasTwoNumbers){
            console.log('evaluating ' + display.innerHTML)
            let numbers = display.innerHTML.split(" ")
            let num1 = parseFloat(numbers[0])
            let num2 = parseFloat(numbers[2])
            let operator = numbers[1]
            let result = await calculate(num1,num2,operator)
            display.innerHTML = result
            display.className = "answered"
        }
    }
}