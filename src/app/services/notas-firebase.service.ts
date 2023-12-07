import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Nota } from '../domain/nota';

@Injectable({
  providedIn: 'root'
})
export class NotasFirebaseService {

  private path = '/notas' //El nombre que se le pone aqui, es el nombre de la coleccion en firebase
  notasRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) { 
    this.notasRef = db.collection(this.path)
    this.notasRef.valueChanges().subscribe(data =>{
      console.log(data)
    })
  }

  getAll(){
    return this.notasRef.valueChanges()
  }

  save(nota: Nota){
    const uid = this.db.createId();
    nota.uid=uid;
    return this.notasRef.doc(uid).set(Object.assign({},nota));
  }

  update(nota: Nota) {
    const uid = nota.uid;
    if (uid) {
      // Verifica que la nota tenga un UID antes de intentar actualizar
      return this.notasRef.doc(uid).update(Object.assign({}, nota));
    } else {
      // Manejar el caso en el que la nota no tenga un UID válido
      console.error('La nota no tiene un UID válido para actualizar.');
      return Promise.reject('La nota no tiene un UID válido para actualizar.');
    }

  }

  delete(nota: Nota) {
    const uid = nota.uid;
    if (uid) {
      return this.notasRef.doc(uid).delete();
    } else {
      console.error('La nota no tiene un UID válido para eliminar.');
      return Promise.reject('La nota no tiene un UID válido para eliminar.');
    }
  }


  getNota(uid: string){
    return this.db.doc(this.path+'/'+uid).valueChanges();
  }
}
