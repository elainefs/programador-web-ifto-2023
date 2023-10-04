/*
Crie um sistema de senha para um consultório onde ele deve ter três opções, Normal, Preferencial e Retorno. Cada vez que a função correspondente for chamada deve ser adicionado um novo número a senha chamada.
*/

function senha(prefixo){
  let cont = 0;
  let pre = prefixo;
  function increment(){
    return pre+(++cont)
  }
  return increment;
}

normal = senha('N')
preferencial = senha('P')
retorno = senha('R')

normal()