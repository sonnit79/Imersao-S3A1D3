import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chamados = signal([
    {Nome: 'Sandra', conteudo: 'Instalar outlook'},
    {Nome: 'Mário Lima', conteudo: 'Precisos ajustar a configuração do Node.js'},
  ]);

  novoNome = signal('');
  novoConteudo = signal('');

  chamadoEditado = signal<any>(null);

  adicionarChamado(){
    if(this.novoNome() && this.novoConteudo()){
      this.chamados.update((lista) => [
        { Nome: this.novoNome(), conteudo: this.novoConteudo() },
        ...lista
      ]);
      this.novoNome.set('');
      this.novoConteudo.set('');
    }else{
      alert('Preencha todos campos.');
    }
  }

  excluirChamado(ChamadoRemover: any){
    this.chamados.update((listaAtual) => listaAtual.filter(chamado => chamado !== ChamadoRemover));
  }

  editarChamado(Chamado: any){
    this.chamadoEditado.set(Chamado);
    this.novoNome.set(Chamado.Nome);
    this.novoConteudo.set(Chamado.conteudo);
  }

  salvarEdicao(){
    this.chamados.update((lista) => {
      return lista.map(p => {
        if (p === this.chamadoEditado()) {
          return { Nome: this.novoNome(), conteudo: this.novoConteudo() };
        }
        return p;
      });
    });
  }

  cancelarEdicao(){
    this.chamadoEditado.set(null);
    this.novoNome.set('');
    this.novoConteudo.set('');
  }
}