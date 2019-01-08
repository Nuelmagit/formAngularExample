import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
 .ng-invalid.ng-touched:not(form){
   border: 1px solid red;
 }
    `]
})
export class TemplateComponent {

  usuario: Object = {
    nombre: '',
    apellido: '',
    correo: '123@123.com',
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises = [
    {
    codigo: 'ARG',
    nombre: 'Argentina'
  },
{
  codigo: 'VEN',
  nombre: 'Venezuela'
},
{
  codigo: 'ESP',
  nombre: 'España'
}];


sexos: any[] = ['Hombre', 'Mujer', 'Arroba'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log(forma);
    console.log(this.usuario);
  }

}
