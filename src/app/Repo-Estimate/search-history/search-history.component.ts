import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { MyRequest, MyResponse } from 'src/Model/Interface';
import {Repo_Menu} from 'src/Model/Repo-Estimate/RepoEstimateModel';
import { GlobalVariableService } from 'src/Services/global-variable.service';
import { HttpServicesService } from 'src/Services/http-services.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  @ViewChild('paginator') page: any ;
  fReQuest: MyRequest ={
    Username: '',
    Token: '',
    FromBody: undefined
  };
  fResponse: MyResponse = {
    number: 0,
    message: '',
    data: undefined
  };
  fRepoHistory: RepoHistory[] = [];
  fSearch: RepoSearch = {
    Contact: '',
    RegNo: '',
    CustomerName: '',
    CustomerLname: '',
    IndexBegin: 1,
    IndexEnd: 5
  };
  fMessage= "";
  fRepoMenu: Repo_Menu = {
    UserName: '',
    MenuId: '',
    Au_Open: '',
    Au_Edit: '',
    Au_Dele: '',
    Au_Admin: '',
    Au_Prn: '',
    FullName: ''
  } 
  fPageLength = 0;
  fCurrentPageIndex = 0;

  constructor(public router: Router, 
                    public cUrlParameter : ActivatedRoute,
                    public Global: GlobalVariableService, 
                    public SvHttp: HttpServicesService) { 
    this.Global.IsLoading = true;                
    this.fMessage = this.cUrlParameter.snapshot.queryParamMap.get("Key")!;
    if(this.fMessage.length > 0){
      this.fMessage = DeHash(this.fMessage);
      this.fReQuest.Username = (this.fMessage.split("Username=")[1]).split('&')[0];
      this.fReQuest.Token = (this.fMessage.split("Token=")[1]).split('&')[0];

      this.getPermission();
    }
  }

  getPermission(){
    this.fRepoMenu.MenuId = 'I149';
    this.fReQuest.FromBody = this.fRepoMenu;
    this.SvHttp.Get_Menu(this.fReQuest).subscribe({
      next: (res: string) =>{
        this.fResponse = JSON.parse(JSON.stringify(res));
        if(this.fResponse.number == 200){
          this.fRepoMenu = this.fResponse.data;
          if(this.fRepoMenu.Au_Open == 'Y'){
            this.Global.IsPermission = 'Y';
          }
        }
        else{
          this.Global.IsPermission = 'N';
        }

        this.Global.IsLoading = false;    
      },
      error: (err) =>{
        this.Global.IsPermission = 'N';
        this.Global.IsLoading = false;    
      }
    });
  }

  ngOnInit(): void {

  }

  onSeach(Select: number){
    if(Select != 1){
      this.page.pageIndex = 0;
      this.fSearch.IndexBegin = 1;
      this.fSearch.IndexEnd = 5;
      this.fPageLength = 0;
    }

    this.fRepoHistory = [];
    if(this.fSearch.CustomerName.length > 0 || this.fSearch.CustomerLname.length > 0 || this.fSearch.Contact.length > 0 || this.fSearch.RegNo.length > 0){
      this.fReQuest.FromBody = this.fSearch;

      if(this.fSearch.CustomerName.length > 0 || this.fSearch.CustomerLname.length > 0){
        this.SvHttp.Get_RepoHistory_ByName(this.fReQuest).subscribe((res: string)=>{
          this.fResponse = JSON.parse(JSON.stringify(res));
          if(this.fResponse.number == 200){
            this.fRepoHistory = this.fResponse.data;
            this.fPageLength = +this.fRepoHistory[0].Total;
          }
          else{
            this.fPageLength = 0;
            alert(this.fResponse.message);
          }
        });
      }
      else if(this.fSearch.Contact.length > 0 || this.fSearch.RegNo.length > 0){
        this.SvHttp.Get_RepoHistory_ByContact(this.fReQuest).subscribe((res: string)=>{
          this.fResponse = JSON.parse(JSON.stringify(res));
          if(this.fResponse.number == 200){
            this.fRepoHistory = this.fResponse.data;
            this.fPageLength = +this.fRepoHistory[0].Total;
          }
          else{
            this.fPageLength = 0;
            alert(this.fResponse.message);
          }
        });
      }
    }
  }

  goRoute(index: number){
    let temp = Hash('ContractNo='+ this.fRepoHistory[index].Contact_No +'&Username=' + this.fReQuest.Username + '&Token=' + this.fReQuest.Token );
    this.router.navigate(['/Mpls-CustomerInfo', temp]);
  }

  onFocus(Type: number){
    if(Type == 1){
      this.fSearch.RegNo = "";
      this.fSearch.CustomerName = "";
      this.fSearch.CustomerLname = "";
    }
    else if(Type == 2){
      this.fSearch.Contact = "";
      this.fSearch.CustomerName = "";
      this.fSearch.CustomerLname = "";
    }
    else if(Type == 3){
      this.fSearch.Contact = "";
      this.fSearch.RegNo = "";
    }
  }

  onPaginateChange(event : any){
    this.fCurrentPageIndex  = event.pageIndex;
    this.fSearch.IndexBegin = (this.fCurrentPageIndex*5) + 1;
    this.fSearch.IndexEnd = (this.fCurrentPageIndex + 1) * 5;
    this.onSeach(1);
  }

}

export interface RepoHistory{
  Contact_No: string;
  Bill_Code: string;
  Bill_Sub: string;
  Ac_Status: string;
  Customer_Name: string;
  Customer_Lname: string;
  Warehouse_Stop: string;
  Occupy_Date: string;
  Maker_Date: string;
  Maker_Name: string;
  Checker_Date: string;
  Checker_Name: string;
  Total: string;
}

export interface RepoSearch{
  Contact: string;
  RegNo: string;
  CustomerName: string;
  CustomerLname: string;
  IndexBegin: number;
  IndexEnd: number;
}

function Hash(str: string) {
  var result = [];
  var result1 = [];
  for (var i = 0; i < str.length; i++) {
    let StrTemp = str.charCodeAt(i).toString(2);
    if(StrTemp.length == 0)result.push("00000000" + StrTemp);
    else if(StrTemp.length == 1)result.push("0000000" + StrTemp);
    else if(StrTemp.length == 2)result.push("000000" + StrTemp);
    else if(StrTemp.length == 3)result.push("00000" + StrTemp);
    else if(StrTemp.length == 4)result.push("0000" + StrTemp);
    else if(StrTemp.length == 5)result.push("000" + StrTemp);
    else if(StrTemp.length == 6)result.push("00" + StrTemp);
    else if(StrTemp.length == 7)result.push("0" + StrTemp);
    else if(StrTemp.length == 8)result.push(StrTemp);
  }

  let resultStr = result.toString().replace(/[,]/g, "");
  result1 = resultStr.split('');
  let reStr = "";
  let j = 0;
  for(let i = 0; i < result1.length; i += 4){
    if(j%4==0){
      reStr += String.fromCharCode((parseInt(result1[i] + result1[i+1] + result1[i+2] + result1[i+3], 2) + 65));
    }
    else if(j%4==1){
      reStr += String.fromCharCode((parseInt(result1[i] + result1[i+1] + result1[i+2] + result1[i+3], 2) + 74));
    }
    else if(j%4==2){
      reStr += String.fromCharCode((parseInt(result1[i] + result1[i+1] + result1[i+2] + result1[i+3], 2) + 97));
    }
    else if(j%4==3){
      reStr += String.fromCharCode((parseInt(result1[i] + result1[i+1] + result1[i+2] + result1[i+3], 2) + 104));
    }
    j++;
  }

  return reStr;
}

function DeHash(arrayStr: string) {
  var result = [];
  var result1 = [];
  var resultStr = "";
  var resultStrEnd = "";

  for (var i = 0; i < arrayStr.length; i++) {
    result.push(arrayStr.charCodeAt(i));
  }
  for (let j= 0; j < result.length; j++){
    if(j%4==0){
      result[j] -= 65;
    }
    else if(j%4==1){
      result[j] -= 74;
    }
    else if(j%4==2){
      result[j] -= 97;
    }
    else if(j%4==3){
      result[j] -= 104;
    }

    let Str = result[j].toString(2);
    if(Str.length == 0){
      Str = "0000";
    }
    else if(Str.length == 1){
      Str = "000" + Str;
    }
    else if(Str.length == 2){
      Str = "00" + Str;
    }
    else if(Str.length == 3){
      Str = "0" + Str;
    }
    resultStr += Str;
  }

  result1 = resultStr.split('');
  let l = 0;
  var result2 = [];
  for(let k=0; k< result1.length; k+= 8){
    result2[l] = result1[k]+result1[k+1]+result1[k+2]+result1[k+3]+result1[k+4]+result1[k+5]+result1[k+6]+result1[k+7];
    l++;
  }
  for (var i = 0; i < result2.length; i++) {
    resultStrEnd += String.fromCharCode(parseInt(result2[i], 2));
  }

  return resultStrEnd;
}
