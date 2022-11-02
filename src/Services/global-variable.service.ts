import { Injectable } from '@angular/core';
import {MyRequest } from 'src/Model/Interface';
import {Estimate_Car_Check_info, Estimate_Car_Check_Master, Repo_Mile, Repo_Score} from 'src/Model/Repo-Estimate/RepoEstimateModel';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  constructor() { }

  IsLogIn: boolean = false;
  IsLoading: boolean = false;
  IsFullPic: boolean = false;
  IsPermission = '';
  
  httpRequest: MyRequest = {
    Username: '',
    Token: '',
    FromBody: undefined
  };

  CarCheckerMaster: Estimate_Car_Check_Master = {
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

  CarCheckerInfo: Estimate_Car_Check_info = {
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

  RepoScore: Repo_Score[] = [];
  RepoMile: Repo_Mile[] = [];
  RepoStore: string[] = [];
  
  
}
