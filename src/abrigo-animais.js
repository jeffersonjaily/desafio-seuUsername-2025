class AbrigoAnimais {
  constructor() {
    // Animais e seus brinquedos
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];
  }

  encontraPessoas(pessoa1Str, pessoa2Str, ordemAnimaisStr) {
    // Reset de estado a cada chamada
    const pessoa1 = pessoa1Str.split(',').map(s => s.trim());
    const pessoa2 = pessoa2Str.split(',').map(s => s.trim());
    const ordemAnimais = ordemAnimaisStr.split(',').map(s => s.trim());

    // 1️⃣ Validar duplicados e brinquedos
    const validarDuplicados = arr => new Set(arr).size === arr.length;
    if (!validarDuplicados(pessoa1) || !validarDuplicados(pessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }
    const todosBrinquedos = [...pessoa1, ...pessoa2];
    if (!todosBrinquedos.every(b => this.brinquedosValidos.includes(b))) {
      return { erro: 'Brinquedo inválido' };
    }

    // 2️⃣ Validar animais
    const validarAnimais = new Set();
    for (let animal of ordemAnimais) {
      if (!this.animais[animal] || validarAnimais.has(animal)) {
        return { erro: 'Animal inválido' };
      }
      validarAnimais.add(animal);
    }

    // 3️⃣ Contador de adoções
    const adocoes = { 1: 0, 2: 0 };
    const resultado = [];

    for (let i = 0; i < ordemAnimais.length; i++) {
      const animal = ordemAnimais[i];
      const infoAnimal = this.animais[animal];
      const brinquedosAnimal = infoAnimal.brinquedos;
      const tipoAnimal = infoAnimal.tipo;

      // Função para verificar se a pessoa atende aos brinquedos do animal
      const atende = (pessoa, brinquedos) => {
        if (animal === 'Loco') return pessoa.length >= 0; // Loco só se importa com companhia depois
        let idx = 0;
        for (let b of pessoa) {
          if (b === brinquedos[idx]) idx++;
          if (idx === brinquedos.length) return true;
        }
        return false;
      };

      const pessoa1Pode = atende(pessoa1, brinquedosAnimal);
      const pessoa2Pode = atende(pessoa2, brinquedosAnimal);

      let dono = 'abrigo';

      if (animal === 'Loco') {
        // Regra especial de Loco
        if (ordemAnimais.length === 1) {
          dono = 'abrigo';
        } else {
          if (pessoa1Pode && pessoa2Pode) dono = 'abrigo';
          else if (pessoa1Pode && adocoes[1] < 3) dono = 'pessoa 1';
          else if (pessoa2Pode && adocoes[2] < 3) dono = 'pessoa 2';
        }
      } else if (tipoAnimal === 'gato') {
        // Regras de gato
        if (pessoa1Pode && !pessoa2Pode && adocoes[1] < 3) dono = 'pessoa 1';
        else if (!pessoa1Pode && pessoa2Pode && adocoes[2] < 3) dono = 'pessoa 2';
      } else {
        // Outros animais
        if (pessoa1Pode && !pessoa2Pode && adocoes[1] < 3) dono = 'pessoa 1';
        else if (!pessoa1Pode && pessoa2Pode && adocoes[2] < 3) dono = 'pessoa 2';
        else if (pessoa1Pode && pessoa2Pode) dono = 'abrigo';
      }

      if (dono === 'pessoa 1') adocoes[1]++;
      if (dono === 'pessoa 2') adocoes[2]++;

      resultado.push(`${animal} - ${dono}`);
    }

    resultado.sort(); // ordem alfabética
    return { lista: resultado };
  }
}

export { AbrigoAnimais };
