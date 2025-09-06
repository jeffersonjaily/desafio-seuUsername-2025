export class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO','BOLA'] },
      { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA','LASER'] },
      { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA','RATO','LASER'] },
      { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO','BOLA'] },
      { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA','NOVELO'] },
      { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER','RATO','BOLA'] },
      { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE','RATO'] }
    ];
    this.brinqValidos = ['RATO','BOLA','LASER','CAIXA','NOVELO','SKATE'];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Reset por teste
    this.lista = [];
    this.erro = null;
    this.animaisAdotados = { 'pessoa 1': 0, 'pessoa 2': 0 };

    // Transformar strings em arrays
    let brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
    let brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
    let ordem = ordemAnimais.split(',').map(a => a.trim());

    // Validar duplicatas
    if (new Set(brinquedos1).size !== brinquedos1.length || new Set(brinquedos2).size !== brinquedos2.length) {
      return { erro: 'Brinquedo inválido' };
    }
    if (new Set(ordem).size !== ordem.length) {
      return { erro: 'Animal inválido' };
    }

    // Validar brinquedos
    for (let b of [...brinquedos1,...brinquedos2]) {
      if (!this.brinqValidos.includes(b)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    // Validar animais
    for (let a of ordem) {
      if (!this.animais.find(animal => animal.nome === a)) {
        return { erro: 'Animal inválido' };
      }
    }

    for (let nomeAnimal of ordem) {
      let animal = this.animais.find(a => a.nome === nomeAnimal);

      // Lógica de Loco
      if (animal.nome === 'Loco') {
        let outroAnimalPresente = ordem.some(a => a !== 'Loco');
        if (!outroAnimalPresente) {
          this.lista.push('Loco - abrigo');
          continue;
        }
      }

      // Checa se alguém pode adotar
      let pessoa1Pode = this.verificaOrdem(animal, brinquedos1);
      let pessoa2Pode = this.verificaOrdem(animal, brinquedos2);

      // Ambos podem adotar → abrigo
      if (pessoa1Pode && pessoa2Pode) {
        this.lista.push(`${animal.nome} - abrigo`);
      } else if (pessoa1Pode && this.animaisAdotados['pessoa 1'] < 3) {
        this.lista.push(`${animal.nome} - pessoa 1`);
        this.animaisAdotados['pessoa 1']++;
      } else if (pessoa2Pode && this.animaisAdotados['pessoa 2'] < 3) {
        this.lista.push(`${animal.nome} - pessoa 2`);
        this.animaisAdotados['pessoa 2']++;
      } else {
        this.lista.push(`${animal.nome} - abrigo`);
      }
    }

    return { lista: this.lista, erro: this.erro };
  }

  verificaOrdem(animal, brinquedosPessoa) {
    if (animal.tipo === 'gato') {
      return animal.brinquedos.every(b => brinquedosPessoa.includes(b));
    } else if (animal.nome === 'Loco') {
      return true; // Loco aceita qualquer ordem se houver outro animal
    } else {
      // Permite intercalar brinquedos
      let idx = 0;
      for (let b of brinquedosPessoa) {
        if (b === animal.brinquedos[idx]) idx++;
        if (idx >= animal.brinquedos.length) break;
      }
      return idx === animal.brinquedos.length;
    }
  }
}
