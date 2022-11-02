import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from 'src/Services/global-variable.service';

@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.css']
})
export class CancelPageComponent implements OnInit {

  constructor(public Global: GlobalVariableService ) { }

  ngOnInit(): void {
  }

}
