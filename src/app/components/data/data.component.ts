import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent {

  forma: FormGroup;

  usuario: Object = {
    nombreCompleto: {
      nombre: 'manuel',
      apellido: 'panizzo'
    },
    correo: 'manuel@jeje.com',
    pasatiempos: ['uno', 'dos', 'tres']
  };

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera]),
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
      ]),
      'usuario': new FormControl('', Validators.required , this.existeUsuario),
      'password1': new FormControl('', [Validators.required]),
      'password2': new FormControl('')
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIguales.bind(this.forma)
    ]);

    this.forma.controls['usuario'].valueChanges.subscribe( data => {
      console.log(data);
    });

    this.forma.controls['usuario'].statusChanges.subscribe( data => {
      console.log(data);
    });

    // this.forma.valueChanges.subscribe( data => {
    //   console.log(data);
    // });
    // this.forma.setValue(this.usuario);
  }

  guardar() {
    console.log( this.usuario);
    console.log( this.forma.value);
    //   this.forma.reset({
    //     nombreCompleto: {
    //       nombre: '',
    //       apellido: ''
    //     },
    //     correo: ''
    //   });
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'panizzo') {
      return {
        nopanizzo: true
      };
    }
    return null;
  }

  noIguales(control: FormControl): { [s: string] } {

    const forma: any = this;

    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl ): Promise<any>|Observable<any> {
    const promesa = new Promise(
      (resolve, reject) => {

        setTimeout(() => {
          if (control.value === 'nuelma') {
            resolve({existe: true});
          } else {
            resolve(null);
          }
        }, 3000);

      }
    );

    return promesa;
  }


}
