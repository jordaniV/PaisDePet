import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

/*
responsável pelas operações de banco de dados dentro do firebase.
*/

@Injectable({
  providedIn: 'root'
})
export class DbService {
  collection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  /*init(caminho: string): void {
    this.authService.statusDaAutenticacao$.subscribe(usuario => {
      if (usuario) {
        this.setCollection(`/${caminho}/${usuario.uid}`);
        return;
      }
      this.setCollection(null);
    });
  }*/

  novo(colecao: string, dado: any) {
    return this.db.collection(colecao).add(dado);
  }

  /* permite a construção de uma collection */
  /*setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }*/

  /* auxilia na criação e atualização de registros
  operation pode ser set ou update
  set: (usado quando chamar o create) substitui o objeto inteiro, na referência criada
  update: (usado quando chamar o update) atualiza apenas as propriedades necessários*/
  setItem(item: any, operation: string) {
    return this.collection
      .doc(item.id)
      [operation](item)
      .then(() => item);
  }

  /* lista todos os itens da coleção */
  getAll(): Observable<any> {
    return this.collection.valueChanges();
  }

  /* pega um registro de id específico */
  get(id: string): Observable<any> {
    return this.collection.doc(id).valueChanges();
  }

  /* cria um novo registro */
  create(item: any): Promise<any> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  /* atualiza o registro */
  update(item: any): Promise<any> {
    return this.setItem(item, 'update');
  }

  /* deletar um registro */
  delete(item: any): Promise<void> {
    return this.collection.doc(item.id).delete();
  }
}
