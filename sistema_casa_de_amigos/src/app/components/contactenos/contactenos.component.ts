import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
  formGroupContact:FormGroup;
  urlYoutube:string="https://www.youtube.com/embed/N0fVdcOg94I";
  constructor(private formBuilder:FormBuilder) { 
    this.iniciarFormContact();
  }
  
  ngOnInit() {
  }


  iniciarFormContact = () => {
    this.formGroupContact = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      msj: ['', [Validators.required]],
    });
  }
}
