import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MyResponse, MyRequest} from 'src/Model/Interface';
import { Estimate_Repo_Picture , Estimate_Car_Check_info, Repo_Menu} from 'src/Model/Repo-Estimate/RepoEstimateModel'
import { GlobalVariableService } from 'src/Services/global-variable.service';
import { HttpServicesService } from 'src/Services/http-services.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {NgxImageCompressService} from "ngx-image-compress";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  @ViewChild('estmate', {static: true, read: MatExpansionPanel}) estmate!: MatExpansionPanel;
  @ViewChild('picture', {static: true, read: MatExpansionPanel}) picture!: MatExpansionPanel;
  
  fIsUpdate = false;
  fStatus = false;
  fIshave = false;
  fFullPic = '';
  fAccType = '';
  fContractNo = "";
  fCarRegistration = "";

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
  fPicture: Estimate_Repo_Picture[] = [];
  fPicture0: Estimate_Repo_Picture = {
    Contact_No: '',
    Estimate_Picture_Label: '',
    Estimate_Picture: [],
    Estimate_Picture_Str: '',
    IsUpdate: false
  };
  fPicCount = 0;
  fPictureType: string[] = ["ด้านหน้า","ด้านหลัง","ด้านบน","ด้านล่าง","ด้านซ้าย","ด้านขวา"];
  fPictureTypeTemp:string[] = [];
  fPictureTypeTemp1:string[] = [];
  fMessage = "";
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
  fIsCheckerNotCreate = false;
  dateNow: string = "";
  fIsClick = false;

  fIsOccupy_Date = false;
  fIsWarehouse_Stop = false;
  fIsMile = false;
  fIsHistory = false;

  constructor(public Global: GlobalVariableService, 
              public router: Router, 
              public SvHttp: HttpServicesService, 
              public cUrlParameter : ActivatedRoute,
              private imageCompress: NgxImageCompressService) {
    this.cUrlParameter.paramMap.subscribe(param =>{
      this.fMessage = param.get("Key") as string;
    });
    if(this.fMessage == undefined){
      this.fMessage = this.cUrlParameter.snapshot.queryParamMap.get("Key")!;
    }
    else{
      this.fIsHistory = true;
    }

    if(this.fMessage != undefined && this.fMessage.length > 0){
      this.fMessage = DeHash(this.fMessage);
      this.fContractNo = (this.fMessage.split("ContractNo=")[1]).split('&')[0];
      this.fReQuest.Username = (this.fMessage.split("Username=")[1]).split('&')[0];
      this.fReQuest.Token = (this.fMessage.split("Token=")[1]).split('&')[0];
    }

    this.onClear();

    this.fRepoMenu.MenuId = 'I148';
    this.fReQuest.FromBody = this.fRepoMenu;
    this.SvHttp.Get_Menu(this.fReQuest).subscribe({
      next : (res: string)=>{
        this.fResponse = JSON.parse(JSON.stringify(res));
        if(this.fResponse.number == 200){
          this.fRepoMenu = this.fResponse.data;
          this.onGetInfo();
          if(this.fRepoMenu.Au_Admin == 'Y'){
            this.fAccType = 'Checker';
          }
          else{
            this.fAccType = 'Maker';
          }
          if(this.fRepoMenu.Au_Open == 'Y'){
            this.Global.IsPermission = 'Y';
          }
          else{
            this.Global.IsPermission = 'N';
          }
        }
        else{
          this.Global.IsPermission = 'N';
        }
      },
      error : (err)=>{
        //this.Global.IsPermission = 'N';
        alert("Please check internet connection");
      }
    });
  }

  ngOnInit(){

  }

  onGetInfo(){
    let IsPic = false;
    let IsCheckInfo = false;

    this.Global.IsLoading = true;
    this.fReQuest.FromBody = this.fContractNo + "||" + this.fCarRegistration;
    this.SvHttp.Get_Car_Contact(this.fReQuest).subscribe((res: string)=>{
      this.fResponse = JSON.parse(JSON.stringify(res));
      if(this.fResponse.number = 200){
        this.Global.CarCheckerMaster = this.fResponse.data[0];
        this.Global.CarCheckerMaster.Status = "1";
      }
      else{
        alert(this.fResponse.message);
      }

      this.fReQuest.FromBody = this.fContractNo + "||" + this.fCarRegistration;
      this.SvHttp.Get_Car_CheckInfo(this.fReQuest).subscribe((res: string)=>{
        this.fResponse = JSON.parse(JSON.stringify(res));
        if(this.fResponse.number == 200){
          this.Global.CarCheckerMaster = this.fResponse.data;
          this.Global.CarCheckerInfo = this.fResponse.data.Estimate_Info;

          this.dateNow = formatDate(Date(), 'yyyy-MM-dd', 'en-US');
          if(this.fRepoMenu.Au_Admin == 'Y'){
            this.fAccType = 'Checker';
            if(this.Global.CarCheckerMaster.Checker_Code == null || this.Global.CarCheckerMaster.Checker_Code.length == 0) this.Global.CarCheckerMaster.Checker_Code = this.fReQuest.Username;
            if(this.Global.CarCheckerMaster.Checker_Name == null || this.Global.CarCheckerMaster.Checker_Name.length == 0) this.Global.CarCheckerMaster.Checker_Name = this.fRepoMenu.UserName;
            if(this.Global.CarCheckerMaster.Checker_Date == null || this.Global.CarCheckerMaster.Checker_Date.length == 0) this.Global.CarCheckerMaster.Checker_Date = this.dateNow;
          }
          else{
            this.fAccType = 'Maker';
            if(this.Global.CarCheckerMaster.Maker_Code == null || this.Global.CarCheckerMaster.Maker_Code.length == 0) this.Global.CarCheckerMaster.Maker_Code = this.fReQuest.Username;
            if(this.Global.CarCheckerMaster.Maker_Name == null || this.Global.CarCheckerMaster.Maker_Name.length == 0) this.Global.CarCheckerMaster.Maker_Name = this.fRepoMenu.UserName;
            if(this.Global.CarCheckerMaster.Maker_Date == null || this.Global.CarCheckerMaster.Maker_Date.length == 0) this.Global.CarCheckerMaster.Maker_Date = this.dateNow;
          }

          this.fIsUpdate = true;
        }
        else{
          this.fIsUpdate = false;
          if(this.fAccType == "Checker"){
            this.fIsCheckerNotCreate = true;
          }
          alert(this.fResponse.message);
        }

        IsCheckInfo = true;
        if(IsCheckInfo && IsPic){
          this.Global.IsLoading = false;
        }
      });
    });

    this.fReQuest.FromBody = this.fContractNo;
    this.SvHttp.Get_Repo_Pic(this.fReQuest).subscribe((res: string)=>{
      this.fResponse = JSON.parse(JSON.stringify(res));
      if(this.fResponse.number == 200){
        this.fPicture = this.fResponse.data;
        this.fPicCount = this.fPicture.length;

        this.fPicture.forEach(s => {
          if(!this.fPictureTypeTemp.includes(s.Estimate_Picture_Label)){
            this.fPictureTypeTemp.push(s.Estimate_Picture_Label);
          }
        });
      }
      
      IsPic = true;
      if(IsCheckInfo && IsPic){
        this.Global.IsLoading = false;
      }
    });
  }

  onGoCheck(){
    this.router.navigate(['/Mpls-CarChecker/']);
  }

  readURLIndex(event: any, i: number): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        //this.fPicture[i].Estimate_Picture_Str = reader.result!?.toString();
        this.compressFile(reader.result!?.toString(), i);
      }
    }
  }

  compressFile(image: any,index: number) {
    this.imageCompress.compressFile(image, -1, 50, 50).then(
    result => {
    this.fPicture[index].Estimate_Picture_Str = result;
    });
  }

  addFile(){
    if(this.fPicCount < 6){
      this.fPicture0 = {
        Contact_No: '',
        Estimate_Picture_Label: '',
        Estimate_Picture: [],
        Estimate_Picture_Str: '',
        IsUpdate: false
      };
      this.fPicture.push(this.fPicture0);
      this.fPicCount++;
    }
  }

  deleteFile(index: number){ 
    if(this.fPicture[index].Estimate_Picture_Str != ""){
      if(confirm("ต้องการที่จะลบรูปนี้ใช่หรือไม่")){
        this.Global.IsLoading = true;
        this.fPicture[index].Contact_No = this.fContractNo;
        this.fPicture0.Contact_No = this.fPicture[index].Contact_No;
        this.fPicture0.Estimate_Picture_Label = this.fPicture[index].Estimate_Picture_Label;
        this.fReQuest.FromBody = this.fPicture0;
        this.SvHttp.Delete_Repo_Pic(this.fReQuest).subscribe((res: string)=>{
          this.fResponse = JSON.parse(JSON.stringify(res));
          if(this.fResponse.number == 200){
            this.fPictureType.push(this.fPicture[index].Estimate_Picture_Label);
            this.fPicture.splice(index, 1);
            this.fPicCount--;
            alert("ทำการลบสำเร็จ");
          }
          else{
            alert(this.fResponse.message);
          }

          this.Global.IsLoading = false;
        });
      }
    }
    else{
      this.fPicture.splice(index, 1);
      this.fPicCount--;
    }
  }

  savePic(index: number){
    if(this.fPicture[index].Estimate_Picture_Label.length > 0 && this.fPicture[index].Estimate_Picture_Str.length > 0){
      this.fPicture[index].Contact_No = this.fContractNo;
      this.fReQuest.FromBody = this.fPicture[index];
      if(!this.fPictureTypeTemp1.includes(this.fPicture[index].Estimate_Picture_Label)){
        this.Global.IsLoading = true;
        if(!this.fPicture[index].IsUpdate){
          this.SvHttp.Insert_Repo_Pic(this.fReQuest).subscribe((res: string)=>{
            this.fResponse = JSON.parse(JSON.stringify(res));
            if(this.fResponse.number == 200){
              alert("บันทึกสำเร็จ");
              this.fPicture[index].IsUpdate = true;
              this.fPictureTypeTemp.push(this.fPicture[index].Estimate_Picture_Label);
            }
            else{
              alert(this.fResponse.message);
            }

            this.Global.IsLoading = false;
          });
        }
        else{
          this.SvHttp.Update_Repo_Pic(this.fReQuest).subscribe((res: string)=>{
            this.fResponse = JSON.parse(JSON.stringify(res));
            if(this.fResponse.number == 200){
              alert("อัพเดตข้อมูลสำเร็จ");
            }
            else{
              alert(this.fReQuest.Username);
            }

            this.Global.IsLoading = false;
          });
        }
      }
      else{
        alert("คำบรรยายซำ้");
      }
    }
    else{
      alert("กรุณาเลือกชนิดของภาพ หรือ รูปภาพให้ครบ");
    }
  }

  onSaveEstimate(Status: string){
    let temp = this.Global.CarCheckerMaster.Status;
    this.Global.CarCheckerMaster.Status = Status;
    this.Global.CarCheckerMaster.Estimate_Info = this.Global.CarCheckerInfo;
    this.fReQuest.FromBody = this.Global.CarCheckerMaster;

    this.dateNow = formatDate(Date(), 'yyyy-MM-dd', 'en-US');
    if(this.fAccType == "Checker"){
      this.Global.CarCheckerMaster.Checker_Code = this.fReQuest.Username;
      this.Global.CarCheckerMaster.Checker_Name = this.fRepoMenu.UserName;
      this.Global.CarCheckerMaster.Checker_Date = this.dateNow;
    }
    else  if(this.fAccType == "Maker"){
      this.Global.CarCheckerMaster.Maker_Code = this.fReQuest.Username;
      this.Global.CarCheckerMaster.Maker_Name = this.fRepoMenu.UserName;
      this.Global.CarCheckerMaster.Maker_Date = this.dateNow;
    }

    if(!this.fIsUpdate){
      if(this.onCheckVaridate()){
        this.SvHttp.Insert_CarCheck_Details(this.fReQuest).subscribe((res: string) =>{
          this.fResponse = JSON.parse(JSON.stringify(res));
          if(this.fResponse.number == 200){
            this.fIsUpdate = true;
            if(Status == "1"){
              alert("บันทึกสำเร็จ");
            }
            else if(Status == "2"){
              alert("ส่งงานสำเร็จ");
            }
          }
          else{
            this.Global.CarCheckerMaster.Status = temp;
            alert(this.fResponse.message);
          }
        });
      }
    }
    else{
      if(this.fAccType == "Checker" && Status != '3' && Status != '4'){
        this.Global.CarCheckerMaster.Maker_Date = this.Global.CarCheckerMaster.Checker_Date;
        this.Global.CarCheckerMaster.Maker_Code = this.Global.CarCheckerMaster.Checker_Code;
        this.Global.CarCheckerMaster.Maker_Name = this.Global.CarCheckerMaster.Checker_Name;
        this.Global.CarCheckerMaster.Checker_Date = '';
        this.Global.CarCheckerMaster.Checker_Code = '';
        this.Global.CarCheckerMaster.Checker_Name = '';
      }

      if(Status == '4' && (this.Global.CarCheckerMaster.Checker_Code == this.Global.CarCheckerMaster.Maker_Code)){
        this.Global.CarCheckerMaster.Status = temp;
        alert("บุคคลที่ทำรายการ กับบุคคลที่อนุมัติ ไม่สามารถเป็นคนเดียวได้");
      }
      else{
        if(this.onCheckVaridate()){
          this.SvHttp.Update_CarCheck_Details(this.fReQuest).subscribe((res: string)=>{
            this.fResponse = JSON.parse(JSON.stringify(res));
            if(this.fResponse.number == 200){
              if(Status == "1"){
                alert("บันทึกอัพเดตสำเร็จ");
              }
              else if(Status == "2"){
                alert("ส่งงานสำเร็จ");
              }
              else if(Status == "3"){
                this.Global.CarCheckerMaster.Status = "3";
                alert("ตีกลับสำเร็จ");
              }
              else if(Status == "4"){
                alert("อนุมัติสำเร็จ");
              }
    
              if(this.fAccType == "Checker"){
                this.dateNow = formatDate(Date(), 'yyyy-MM-dd', 'en-US');
                this.Global.CarCheckerMaster.Checker_Code = this.fReQuest.Username;
                this.Global.CarCheckerMaster.Checker_Name = this.fRepoMenu.UserName;
                this.Global.CarCheckerMaster.Checker_Date = this.dateNow;
              }
            }
            else{
              this.Global.CarCheckerMaster.Status = temp;
              alert(this.fResponse.message);
            }
          });
        }
      }
    }
  }

  Toggle(Toggle : any, Column: string, Select: string){
    if(Toggle.target.checked){
      if(Column == 'Have_Key'){
        this.Global.CarCheckerMaster.Have_Key = Select;
      }
      else if(Column == 'Tax_Sign'){
        this.Global.CarCheckerMaster.Tax_Sign = Select;
      }
      else if (Column == 'License_Plate'){
        this.Global.CarCheckerMaster.License_Plate = Select;
      }
      else if(Column == 'Can_Start'){
        this.Global.CarCheckerMaster.Can_Start = Select;
      }
    }
    else{
      if(Column == 'Have_Key'){
        this.Global.CarCheckerMaster.Have_Key = Select=='0'?'1':'0';
      }
      else if(Column == 'Tax_Sign'){
        this.Global.CarCheckerMaster.Tax_Sign = Select=='0'?'1':'0';
      }
      else if(Column == 'License_Plate'){
        this.Global.CarCheckerMaster.License_Plate = Select=='0'?'1':'0';
      }
      else if(Column == 'Can_Start'){
        this.Global.CarCheckerMaster.Can_Start = Select=='0'?'1':'0';
      }
    } 
  }

  exportPdf(){
    this.Global.IsLoading = true;
    this.fIsClick = true;
    setTimeout(()=>{
      const DATA: any = document.getElementById('printPDF');
      html2canvas(DATA).then((canvas) => {
        const FILEURL = canvas.toDataURL('image/png');
        const PDF = new jsPDF("p", "mm", "a4");
        const width = PDF.internal.pageSize.getWidth();
        const height = PDF.internal.pageSize.getHeight();
        PDF.addImage(FILEURL, 'png', 0, 0, width, height);
        PDF.save('report.pdf');
        this.Global.IsLoading = false;
      });
    }, 300);
  }

  onCal(){
    let i = 0;
    let Sum = 0;
    let arrValue;
    arrValue = Object.values(this.Global.CarCheckerInfo)
    arrValue.forEach(s => {
      if(s != 'X'){
        i++;
        Sum = Sum + +s;
      }
    });

    this.Global.CarCheckerMaster.Condition = ((Sum*10)/i).toFixed(0);
  }

  onCheckType(){
    this.fPictureTypeTemp1 = [];
    this.fPicture.forEach(s => {
      if(this.fPictureTypeTemp.includes(s.Estimate_Picture_Label)){
        this.fPictureTypeTemp1.push(s.Estimate_Picture_Label);
      }
    });
  }

  onMileChhange(){
    this.Global.CarCheckerInfo.Number_Miles = this.Global.RepoMile.find(s => +this.Global.CarCheckerMaster.Mileage >= +s.MILE_MIN && +this.Global.CarCheckerMaster.Mileage <= +s.MILE_MAX)!.SCORE;
    this.onCal();
  }

  onClear(){
    this.Global.CarCheckerMaster = {
      Occupy_Date: '',
      Warehouse_Stop: '',
      Contact_No: '',
      Have_Key: '0',
      Tax_Sign: '0',
      Motor_Bike_Brand: '',
      Model: '',
      Color: '',
      Serial_Number: '',
      Tank_Number: '',
      Registration_Number: '',
      License_Plate: '0',
      Condition: '',
      Appraisal_Price: '',
      Mileage: '',
      Can_Start: '0',
      Redemption_Date: '',
      Maker_Date: '',
      Maker_Name: '',
      Maker_Code: '',
      Checker_Date: '',
      Checker_Name: '',
      Checker_Code: '',
      Modify_Date: '',
      Modify_Name: '',
      Estimate_Info: new Estimate_Car_Check_info,
      Status: '',
      On_Active: '',
      CC: '',
      Remarks: ''
    };
    this.Global.CarCheckerInfo = {
      Speed_Moter_Gear_Set: '',
      Digital_Mileage_Set: '',
      Normal_Key: '',
      Remote_Key: '',
      Kick_Starter: '',
      Electric_Hand_Starter: '',
      Front_Wheel: '',
      Rear_Wheel: '',
      Front_Tire: '',
      Rear_Tire: '',
      Alloy_Wheels_Front_Rear: '',
      Wire_Spokes_Front_Back: '',
      Chain_Type_Sprocket_Front_Back: '',
      Cover_Lower_Chain: '',
      Belt_Drive: '',
      Gear_Lever: '',
      Rear_Swing_Arm: '',
      Front_Left_Shock: '',
      Front_Right_Shock: '',
      Rear_Left_Shock: '',
      Rear_Right_Shock: '',
      Single_Shock: '',
      Mane_Botton_Up: '',
      Seat: '',
      Left_Hand: '',
      Right_Hand: '',
      Steel_Bar_End_Left: '',
      Steel_Bar_End_Right: '',
      Left_Hand_Grip: '',
      Right_Hand_Grip: '',
      Injection_System: '',
      Carburetor_System: '',
      Piston_Kit: '',
      Intake: '',
      Cooling_Radiator: '',
      Fan_Cooled: '',
      Air_Cooled: '',
      Oil_Tank: '',
      Front_Lamp: '',
      Tail_Light: '',
      Left_Front_Turn_Signal: '',
      Right_Front_Turn_Signal: '',
      Left_Rear_Turn_Signal: '',
      Right_Rear_Turn_Signal: '',
      Battery: '',
      Electrical_Control_Box: '',
      Throttle_Grip_Kit: '',
      Front_Wheel_Fender: '',
      Rear_Fender_With_License_Plate: '',
      Rear_Fender_In: '',
      Mask_Face_Shiled: '',
      Color_Set_Sticker_Pattern: '',
      Left_Side_Cover: '',
      Right_Side_Cover: '',
      Left_Windshield: '',
      Right_Windshield: '',
      Lower_Spoiler: '',
      Front_Break_Drum_Set: '',
      Rear_Break_Drum_Set: '',
      Front_Break_Disc_Set: '',
      Rear_Break_Disc_Set: '',
      Horn: '',
      Left_Rear_View_Monitor: '',
      Right_Rear_View_Monitor: '',
      Left_Hand_Break: '',
      Right_Hand_Break: '',
      Hand_Break_Lock: '',
      Foot_Break_Pedal: '',
      Hand_Clutch: '',
      Fall_Break_Protection: '',
      Left_Front_Footrest: '',
      Right_Front_Footrest: '',
      Left_Back_Footrest: '',
      Right_Back_Footrest: '',
      Rubber_Footrest_Front: '',
      Rubber_Footrest_Back: '',
      U_Box: '',
      Multipurpose_Box: '',
      Side_Stand: '',
      Double_Stand: '',
      Number_Miles: ''
    };
  }

  onFullPic(index: number){
    this.fFullPic = this.fPicture[index].Estimate_Picture_Str;
    this.Global.IsFullPic = true;
  }

  onCheckVaridate(){
    let IsCheck = true;
    let Message : String[] = [];
    if(this.Global.CarCheckerMaster.Warehouse_Stop.length == 0){
      this.fIsWarehouse_Stop = true;
      IsCheck = false;
      Message.push('จุดจอดโกดัง ไม่เหมาะสม'); 
    }
    else{
      this.fIsWarehouse_Stop = false;
    }
    if(this.Global.CarCheckerMaster.Occupy_Date.length == 0){
      this.fIsOccupy_Date = true;
      IsCheck = false;
      Message.push('วันที่ยึด ไม่เหมาะสม');  
    }
    else{
      this.fIsOccupy_Date = false;
    }
    if(this.Global.CarCheckerMaster.Mileage.length == 0 || +this.Global.CarCheckerMaster.Mileage == 0){
      this.fIsMile = true;
      IsCheck = false;
      Message.push('เลขไมล์ ไม่เหมาะสม'); 
    }
    else{
      this.fIsMile = false;
    }

    if(Message.length > 0){
      alert(Message.join(' && '));
    }

    return IsCheck;
  }

  // onTest1(){
  //   let a = 'ContractNo=110202200000736&Username=10654100&Token=AunDev@Mplus';
  //   let a1 = 'ContractNo=110202200000736&Username=10654002&Token=AunDev@Mplus';
  //   let a2 = 'ContractNo=110202200000736&Username=10654004&Token=AunDev@Mplus';
    
  //   let b = 'EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdiDJdhCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM'
  //   let b1 = 'EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdhDJdjCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM'
  //   let b2 = 'EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdhDJdkCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM'
    
  //   console.log(Hash(a2));
  //   console.log(DeHash(b2));
  //   //let c = "http://192.168.40.23:8080/Mpls-CustomerInfo?Key=" + Hash("ContractNo=110202200000737&Username=10654004&Token=AunDev@Mplus&AccType=Marker");
  // }
}

function Hash(str: string) {
  var result = [];
  var result1 = [];
  for (var i = 0; i < str.length; i++) {
    let StrTemp = str.charCodeAt(i).toString(2);
    // result.push(StrTemp);
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




