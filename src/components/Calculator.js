import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
 
  const [display, setDisplay] = useState('0');
  
  const [currentValue, setCurrentValue] = useState(null);
  
  const [operator, setOperator] = useState(null);
  
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (number) => {
   
    if (waitingForOperand) {
      setDisplay(String(number));
      setWaitingForOperand(false);
    } else {
     
      setDisplay(display === '0' ? String(number) : display + number);
    }
  };

  
  const handleDecimalClick = () => {
    // Adiciona um ponto decimal apenas se ainda não houver um.
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
    
    if (waitingForOperand) {
        setDisplay('0.');
        setWaitingForOperand(false);
    }
  };

 
  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    
    if (currentValue !== null && operator) {
      const result = calculate();
      setDisplay(String(result));
      setCurrentValue(result);
    } else {
      
      setCurrentValue(inputValue);
    }

    // Marca que estamos esperando o próximo número e armazena o operador.
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };
  
  
  const calculate = () => {
    const inputValue = parseFloat(display);
    if (currentValue === null || operator === null) {
      return inputValue; // Não faz nada se não houver uma operação completa
    }

    let result;
    switch (operator) {
      case '+':
        result = currentValue + inputValue;
        break;
      case '-':
        result = currentValue - inputValue;
        break;
      case '*':
        result = currentValue * inputValue;
        break;
      case '/':
        result = currentValue / inputValue;
        break;
      default:
        return inputValue; // Retorna o valor atual se o operador for desconhecido
    }
    return result;
  };

    const handleEqualsClick = () => {
    const result = calculate();
    if (result !== undefined) {
      setDisplay(String(result));
      // Reseta o estado para a próxima operação, mantendo o resultado no visor.
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  const handleClearClick = () => {
    // Reseta todo o estado para os valores iniciais.
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };
  
  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="calculator">
      {/* Visor da Calculadora */}
      <div className="display">{display}</div>

      {/* Botões da Calculadora */}
      <div className="buttons">
        <button onClick={() => handleOperatorClick('+')} className="operator">+</button>
        <button onClick={() => handleOperatorClick('-')} className="operator">-</button>
        <button onClick={() => handleOperatorClick('*')} className="operator">*</button>
        <button onClick={() => handleOperatorClick('/')} className="operator">/</button>

        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>

        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        
        <button onClick={() => handleNumberClick(0)} className="zero">0</button>
        <button onClick={handleDecimalClick}>.</button>
        <button onClick={handleClearClick}>C</button>
        
        <button onClick={handleEqualsClick} className="equals">=</button>
      </div>
    </div>
  );
};

export default Calculator;