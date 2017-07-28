(function(){
    //this is a modular implementation of making a calculator

    var 
        // module variables
        keys = document.querySelectorAll('#calculator span'),
        result,
        input   = '',
        operand = '',
        operatorList = ['+', '-', 'x', '÷', '%']

    ;

    function isOperator(string){
        return operatorList.indexOf(string) >=0; //returns true or false
    };

    function lastInputIsOperator(){
        return isOperator(input.charAt(input.length-1))
    };

    function validateInput(_input){
        if(!input && result && isOperator(_input)){
            input = result;
        }

        if(
            (_input === '.' && operand.indexOf('.')>=0) || //avoid .1.3
            (_input === input.charAt(input.length-1)&& isOperator(_input)) || // avoid ++ or xx
            (_input !== '-' && !input && isOperator(_input)) // avoid 'x123'; alow '-123'
        ){
            return false;
        }
        return true;
    };

    function executeExpression(){
        if(!input){return}

        if(isOperator(input.charAt(input.length-1))){
            result = "error";
        }
        result = eval(input)+'';
        $('.screen').text(result);

        input = '';
        operand = '';
    };

    function expressInMath(_input) {
        if(!validateInput(_input)){console.log('not valid');return false};

        if(isOperator(_input)){
            if(lastInputIsOperator()){
                if(input.length === 1){
                    input = '';
                }else{
                    input = input.slice(0,input.length -1)+ _input;
                }
            }
            else {
                input += _input;
            }
            operand = '';
        }
        else {
            input += _input;
            operand += _input;
        }
        result = '';
        $('.screen').text(input);
    };

    function deleteLastInput(){ 
        if($('.clear').text()=== 'C'){
            
            $('.screen').text('');
            result = '';
            return;
        }  
    };



    
    function analyzeInput(){

        let $this = $(this),
            _input = $this.text();

        if (_input === '=') {
            console.log('invoking function');
            executeExpression();
            console.log('invoking completed');
		}
		else if (_input === 'C') {
			deleteLastInput();
		}
		else{
			expressInMath(_input)
		}
    };

    (function initCalculator(){
        $('#calculator span').on('click',analyzeInput)
    }());
    
}())