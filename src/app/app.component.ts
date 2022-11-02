import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MyResponse } from 'src/Model/Interface';
import { GlobalVariableService } from 'src/Services/global-variable.service';
import { HttpServicesService } from 'src/Services/http-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'งานประเมินรถยึด';
  fResponse!: MyResponse;

  constructor(public Global: GlobalVariableService, public router: Router, public Http: HttpServicesService){
    this.Http.Get_ESTIMATE_REPO_SCORE_P().subscribe((res: string)=>{
      this.fResponse = JSON.parse(JSON.stringify(res));
      if(this.fResponse.number == 200){
        this.Global.RepoScore = this.fResponse.data;
      }
      
    });

    this.Http.Get_ESTIMATE_REPO_MILE_P().subscribe((res: string) => {
      this.fResponse = JSON.parse(JSON.stringify(res));
      if(this.fResponse.number == 200){
        this.Global.RepoMile = this.fResponse.data;
      }
    });

    this.Http.Get_ESTIMATE_REPO_STORE_P().subscribe((res: string)=>{
      this.fResponse = JSON.parse(JSON.stringify(res));
      if(this.fResponse.number == 200){
        this.Global.RepoStore = this.fResponse.data;
      }
    });
  }

  // onLogOut(){
  //   this.Global.IsLogIn = false;
  //   this.router.navigate(['/Mpls-Login/']);
  // }

  // @HostListener("window:beforeunload", ["$event"]) 
  // beforeUnloadHandler(event: Event) {
  //   return false;
  // }
}
