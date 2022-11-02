import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariableService } from './global-variable.service';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
  MyServer = environment.apiUrl;
  headers: HttpHeaders;

  constructor(public SvHttp: HttpClient, public Global: GlobalVariableService) {
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', '*')
    .append('Access-Control-Allow-Origin', '*');
  }

  VaridateLogIn(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/Varidation_Login/Varidate_User_Password", JSON.stringify(data), {headers:this.headers});
  }

  Get_ESTIMATE_REPO_SCORE_P(){
    return this.SvHttp.get<string>(this.MyServer + "/CarEstimate/Get_ESTIMATE_REPO_SCORE_P");
  }

  Get_ESTIMATE_REPO_MILE_P(){
    return this.SvHttp.get<string>(this.MyServer + "/CarEstimate/Get_ESTIMATE_REPO_MILE_P");
  }

  Get_ESTIMATE_REPO_STORE_P(){
    return this.SvHttp.get<string>(this.MyServer + "/CarEstimate/Get_ESTIMATE_REPO_STORE_P");
  }

  Get_Car_Contact(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_Car_Contact", JSON.stringify(data), {headers:this.headers});
  }

  Get_Car_CheckInfo(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_Car_CheckInfo", JSON.stringify(data), {headers:this.headers});
  }

  Insert_CarCheck_Details(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Insert_CarCheck_Details", JSON.stringify(data), {headers:this.headers});
  }

  Update_CarCheck_Details(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Update_CarCheck_Details", JSON.stringify(data), {headers:this.headers});
  }

  Insert_Repo_Pic(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Insert_Repo_Pic", JSON.stringify(data), {headers:this.headers});
  }

  Update_Repo_Pic(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Update_Repo_Pic", JSON.stringify(data), {headers:this.headers});
  }

  Delete_Repo_Pic(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Delete_Repo_Pic", JSON.stringify(data), {headers:this.headers});
  }

  Get_Repo_Pic(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_Repo_Pic", JSON.stringify(data), {headers:this.headers});
  }

  Get_Menu(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_Menu", JSON.stringify(data), {headers:this.headers});
  }

  Get_RepoHistory_ByName(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_RepoHistory_ByName", JSON.stringify(data), {headers:this.headers});
  }

  Get_RepoHistory_ByContact(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/CarEstimate/Get_RepoHistory_ByContact", JSON.stringify(data), {headers:this.headers});
  }

  Get_Dealer(data: any){
    return this.SvHttp.put<string>(this.MyServer + "/Book/Get_Dealer", JSON.stringify(data), {headers:this.headers});
  }

}
