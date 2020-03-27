import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {}

  /* permite a construção de uma collection */
  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  /* auxilia na criação e atualização de registros
  set: (usado quando chamar o create) substitui o objeto inteiro, na referência criada
  update: (usado quando chamar o update) atualiza apenas as propriedades necessários*/
  private setItem(item: T, operation: string): Promise<T> {
    return this.collection
    .doc<T>(item.id)
    [operation](item)
    .then(() => item);
  }

  /* lista todos os itens da coleção */
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  /* pega um registro de id específico */
  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  /* cria um novo registro */
  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  /* atualiza o registro */
  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  /* deletar um registro */
  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }
}
