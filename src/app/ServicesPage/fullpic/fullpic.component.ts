import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariableService } from 'src/Services/global-variable.service';

@Component({
  selector: 'app-fullpic',
  templateUrl: './fullpic.component.html',
  styleUrls: ['./fullpic.component.css']
})
export class FullpicComponent implements OnInit {
  @Input() fullPic = '';

  constructor(public Global: GlobalVariableService) { }

  ngOnInit(): void {
  }

  onChangState(){
    this.Global.IsFullPic = false;
  }

}
