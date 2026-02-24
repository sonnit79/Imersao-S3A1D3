import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts = signal([
    {titulo: 'Postagem 1', conteudo: 'Detalhes da postagem 1'},
    {titulo: 'Postagem 2', conteudo: 'Detalhes da postagem 2'},
  ]);

  novoTitulo = signal('');
  novoConteudo = signal('');

  postEditado = signal<any>(null);

  adicionarPost(){
    if(this.novoTitulo() && this.novoConteudo()){
      this.posts.update((lista) => [
        { titulo: this.novoTitulo(), conteudo: this.novoConteudo() },
        ...lista
      ]);
      this.novoTitulo.set('');
      this.novoConteudo.set('');
    }else{
      alert('Preencha todos campos.');
    }
  }

  excluirPost(postRemover: any){
    this.posts.update((listaAtual) => listaAtual.filter(post => post !== postRemover));
  }

  editarPost(post: any){
    this.postEditado.set(post);
    this.novoTitulo.set(post.titulo);
    this.novoConteudo.set(post.conteudo);
  }

  salvarEdicao(){
    this.posts.update((lista) => {
      return lista.map(p => {
        if (p === this.postEditado()) {
          return { titulo: this.novoTitulo(), conteudo: this.novoConteudo() };
        }
        return p;
      });
    });
  }

  cancelarEdicao(){
    this.postEditado.set(null);
    this.novoTitulo.set('');
    this.novoConteudo.set('');
  }
}