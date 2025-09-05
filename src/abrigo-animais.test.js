import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOL', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA,LASER', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve intercalar brinquedos e respeitar regras de gatos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );
    expect(resultado.lista).toContain('Mimi - abrigo');
    expect(resultado.lista).toContain('Fofo - pessoa 2');
    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista).toContain('Bola - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Ninguém pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'Rex,Bebe,Bola,Mimi,Zero,Fofo,Loco'
    );
    const pessoa1Count = resultado.lista.filter(l => l.includes('pessoa 1')).length;
    const pessoa2Count = resultado.lista.filter(l => l.includes('pessoa 2')).length;
    expect(pessoa1Count).toBeLessThanOrEqual(3);
    expect(pessoa2Count).toBeLessThanOrEqual(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco sozinho no abrigo se não tiver outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      'LASER,RATO',
      'Loco'
    );
    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Ambos podem adotar gato → vai para abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA, LASER',
      'BOLA, LASER',
      'Mimi'
    );
    expect(resultado.lista).toContain('Mimi - abrigo');
  });

  test('Ambos podem adotar Loco → vai para abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      'RATO,SKATE',
      'Loco, Rex'
    );
    expect(resultado.lista).toContain('Loco - abrigo');
  });

});
