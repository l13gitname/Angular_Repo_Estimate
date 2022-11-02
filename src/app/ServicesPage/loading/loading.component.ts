import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from 'src/Services/global-variable.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public Global: GlobalVariableService) { }

  ngOnInit(): void {
  }

}
