# Desafio Jefferson Jaily 2025 - Abrigo de Animais

Este repositório contém a solução do desafio proposto, implementando um sistema para gerenciar a adoção de animais em um abrigo, respeitando regras específicas de brinquedos, tipo de animal e limite de adoções por pessoa.

---

## 🐾 Descrição do Projeto

O sistema simula a alocação de animais em um abrigo ou para adoção por pessoas, seguindo estas regras:

- Validação de animais e brinquedos fornecidos.
- Limite de **3 animais por pessoa**.
- Animais duplicados ou brinquedos inválidos são rejeitados.
- Animais especiais (como **Loco**) seguem regras específicas de abrigo.
- Intercalação de brinquedos para cães e validação de brinquedos de gatos.

O código está escrito em **JavaScript (ESM)** e os testes foram implementados com **Jest**.

---

## 💻 Estrutura do Projeto


```plaintext
desafio-seuUsername-2025/
├─ src/
│ ├─ abrigo-animais.js # Classe AbrigoAnimais
│ └─ abrigo-animais.test.js # Testes automatizados
├─ jest.config.js # Configuração do Jest
├─ package.json # Dependências e scripts
├─ package-lock.json
└─ README.md

```

---

## ⚡ Tecnologias Utilizadas

- JavaScript (ESM)
- Node.js
- Jest (testes automatizados)

---

## 🚀 Como Rodar o Projeto

1. Clone este repositório:

```bash
git clone https://github.com/jeffersonjaily/desafio-Jeffersonjaily-2025.git
cd desafio-seuUsername-2025
```
2. Instale as dependências:

```bash
npm install
```
3. Execute os testes:

```bash
npm test
```

✅ Testes

Os testes automatizados cobrem cenários como:

Validação de animais e brinquedos.

Rejeição de duplicatas.

Distribuição correta de animais para pessoas e abrigo.

Limite máximo de adoções por pessoa.

Regras especiais de animais como Loco e gatos.

📌 Observações

O código segue ES Modules (import/export).

O Jest está configurado com --experimental-vm-modules para suportar ESM.

Todos os testes devem passar para considerar a entrega correta.

🔗 [Repositório do Desafio](https://github.com/jeffersonjaily/desafio-Jeffersonjaily-2025)