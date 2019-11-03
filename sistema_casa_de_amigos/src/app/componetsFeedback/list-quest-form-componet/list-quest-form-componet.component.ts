import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-quest-form-componet',
  templateUrl: './list-quest-form-componet.component.html',
  styleUrls: ['./list-quest-form-componet.component.css']
})
export class ListQuestFormComponetComponent implements OnInit {
  private idForm: number;  
  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idForm = this.activatedRoute.snapshot.params['id'];
  }

}
