class Aluno {
  constructor(nome, idade, matricula) {
    this.nome = nome;
    this.idade = idade;
    this.matricula = matricula;
  }
}

class Escola {
  constructor() {
    this.alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  }

  cadastrarAluno(aluno) {
    if (!this.alunos[aluno.matricula]) {
      this.alunos[aluno.matricula] = aluno;
      this.atualizarListaAlunos();
      this.salvarAlunosNoLocalStorage();
      alert(`Aluno ${aluno.nome} cadastrado com sucesso!`);
    } else {
      alert("Erro: Matrícula já cadastrada.");
    }
  }

  atualizarListaAlunos() {
    const listaAlunosElement = document.getElementById("lista-alunos");
    listaAlunosElement.innerHTML = "";

    for (const matricula in this.alunos) {
      if (this.alunos.hasOwnProperty(matricula)) {
        const aluno = this.alunos[matricula];
        const liElement = document.createElement("li");
        liElement.textContent = `Nome: ${aluno.nome}, Idade: ${aluno.idade}, Matrícula: ${aluno.matricula}`;
        listaAlunosElement.appendChild(liElement);
      }
    }
  }

  salvarAlunosNoLocalStorage() {
    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }
}

const escola = new Escola();

document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const matricula = document.getElementById("matricula").value;

  const novoAluno = new Aluno(nome, idade, matricula);
  escola.cadastrarAluno(novoAluno);

  document.getElementById("formulario").reset();
});
