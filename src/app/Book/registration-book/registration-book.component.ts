import { Component, OnInit } from '@angular/core';
import { MyRequest, MyResponse } from 'src/Model/Interface';
import { Card } from 'src/Model/ฺBook/BookModel';
import { HttpServicesService } from 'src/Services/http-services.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registration-book',
  templateUrl: './registration-book.component.html',
  styleUrls: ['./registration-book.component.css']
})
export class RegistrationBookComponent implements OnInit {

  fReQuest: MyRequest ={
    Username: '10654100',
    Token: 'AunDev@Mpls+',
    FromBody: undefined
  };
  fResponse: MyResponse = {
    number: 0,
    message: '',
    data: undefined
  };

  displayedColumns = ['No', 'ContactNo', 'Name', 'Model','Chassis', 'VIN', 'ContactDate', 'OutStanding', 'Sale', 'Tax', 'Branch'];
  dataSource: Element[] = ELEMENT_DATA;
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;
  selectedRowIndex: number = -1;
  fFileName = 'ReportBook.xlsx';

  fSearchDate : string = "";
  fSearchDealer : string = "";
  fSearchDealerArr : string[] = [];
  fSearchDealerArrTemp : string[] = [];

  Engi_No : string = "" ;
  Chassis_No : string = "";
  Cust_Name : string = "";
  Cust_Sname : string = "";
  Reg_No : string = "";
  Reg_City : string = "";
  Reg_Date : string = "";
  Reg_Status : string = "";
  Reg_Rec_Date : string = "";
  Room_No : string = "";

  fCardInfoTemp : Card[] = [];
  fCardInfo : Card[] = [];
  

  constructor(public Http : HttpServicesService) {

  }

  ngOnInit(): void {
    this.Http.Get_Dealer(this.fReQuest).subscribe({
      next: (res: string) =>{
        this.fResponse = JSON.parse(JSON.stringify(res));
        if(this.fResponse.number == 200){
          this.fSearchDealerArr = this.fSearchDealerArrTemp = this.fResponse.data;

        }
      },
      error: (err) =>{
 
      }
    });
    this.dataSource = this.getTableData(this.start, this.end);
    this.updateIndex();
  }

  onTableScroll(e: any) {
    console.log(e);
    const tableViewHeight = e.target.offsetHeight // viewport
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    
    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;    
    if (scrollLocation > limit) {
      //let data = this.getTableData(this.start, this.end)
      let data = ELEMENT_DATA_TEST;
      this.dataSource = this.dataSource.concat(data);
      //this.updateIndex();
    }
  }

  getTableData(start: number, end : number) {
    return ELEMENT_DATA.filter((value, index) => index >= start && index < end)
  }

  updateIndex() {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  selectedRow(row: number) {
    console.log('selectedRow', row)
  }

  onDownload(){
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fFileName);
  }

  onClear(){
    this.Engi_No = "" ;
    this.Chassis_No = "";
    this.Cust_Name  = "";
    this.Cust_Sname = "";
    this.Reg_No = "";
    this.Reg_City = "";
    this.Reg_Date = "";
    this.Reg_Status = "";
    this.Reg_Rec_Date = "";
    this.Room_No = "";
  }

  onFilter(e: string){
    this.fSearchDealerArr = this.fSearchDealerArrTemp.filter(s => s.toLowerCase().includes(e.toLowerCase()));
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  age: number;
}


const temp : string[] = ["fcaaa","fefe","grgg","fcaaa","fefe","grgg","fcaaa","fefe","grgg","fcaaa","fefe","grgg"]

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 31, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 32, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 33, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 34, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 35, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 36, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 37, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 38, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 39, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 40, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
  {position: 41, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 42, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 43, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 44, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 45, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 46, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 47, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 48, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 49, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 50, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 51, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 52, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 53, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 54, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 55, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 56, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 57, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 58, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 59, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 60, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
];

const ELEMENT_DATA_TEST: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25}
];
