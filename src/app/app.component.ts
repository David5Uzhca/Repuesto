import { Component } from '@angular/core';
import { Nota } from './domain/nota';
import { Router } from '@angular/router';
import { NotasFirebaseService } from './services/notas-firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Repuesto';


  id: string = "0103";
  titulo: string = "Titulo de nota";
  descripcion: string = "Descripcion de nota";
  fecha: string = "Fecha de nota";

  nota: Nota = new Nota();

  //Metodo para que se llame a otra pagina
  constructor(private router: Router, private notaFirebaseService: NotasFirebaseService){ //Aqui una diferencia es que si se declara edentro del constructor, es una variable global mas no una interna como en java
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if(params){
      console.log(params);
      this.nota = params['contacto']; 
    }
}

  saveNota(){
    //const notaExistente = this.notaService.getNotas().find((n) => n.uid === this.nota.uid);

    //if (notaExistente) {
      //Object.assign(personaExistente, this.persona);
      //this.notaService.updatePersona(personaExistente,this.persona);
    //} else {

      this.notaFirebaseService.save(this.nota);//Esta linea es la que guarda pero en firebase
    //}

    //Limpia los datos del formulario
    this.nota = new Nota();
  }

  updateNota(){
    //const personaExistente = this.persona.id;
    //this.notaService.updatePersona(this.persona,this.persona);
  }


}
