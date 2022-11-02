export interface Estimate_Car_Check_Master{
    Occupy_Date: string;
    Warehouse_Stop: string;
    Contact_No: string;
    Have_Key: string;
    Tax_Sign: string;
    Motor_Bike_Brand: string;
    Model: string;
    Color: string;
    Serial_Number: string;
    Tank_Number: string;
    CC: string;
    Registration_Number: string;
    License_Plate: string;
    Condition: string;
    Appraisal_Price: string;
    Mileage: string;
    Can_Start: string;
    Redemption_Date: string;
    Status: string;
    On_Active: string;
    Maker_Date: string;
    Maker_Name: string;
    Maker_Code: string;
    Checker_Date: string;
    Checker_Name: string;
    Checker_Code: string;
    Modify_Date: string;
    Modify_Name: string;
    Remarks: string;
    Estimate_Info: Estimate_Car_Check_info;
}

export class Estimate_Car_Check_info{
    Speed_Moter_Gear_Set: string = '';
    Digital_Mileage_Set: string= '';
    Normal_Key: string = '';
    Remote_Key: string = '';
    Kick_Starter: string = '';
    Electric_Hand_Starter: string = '';
    Front_Wheel: string = '';
    Rear_Wheel: string = '';
    Front_Tire: string = '';
    Rear_Tire: string = '';
    Alloy_Wheels_Front_Rear: string = '';
    Wire_Spokes_Front_Back: string = '';
    Chain_Type_Sprocket_Front_Back: string = ''; 
    Cover_Lower_Chain: string = '';
    Belt_Drive: string = '';
    Gear_Lever: string = '';
    Rear_Swing_Arm: string = '';
    Front_Left_Shock: string = '';
    Front_Right_Shock: string = '';
    Rear_Left_Shock: string = '';
    Rear_Right_Shock: string = '';
    Single_Shock: string = '';
    Mane_Botton_Up: string = '';
    Seat: string = '';
    Left_Hand: string = '';
    Right_Hand: string = '';
    Steel_Bar_End_Left: string= '';
    Steel_Bar_End_Right: string = '';
    Left_Hand_Grip: string = '';
    Right_Hand_Grip: string = '';
    Injection_System: string = '';
    Carburetor_System: string = '';
    Piston_Kit: string = '';
    Intake: string = '';
    Cooling_Radiator: string = '';
    Fan_Cooled: string = ''; 
    Air_Cooled: string = '';
    Oil_Tank: string = '';
    Front_Lamp: string = '';
    Tail_Light: string = '';
    Left_Front_Turn_Signal: string = '';
    Right_Front_Turn_Signal: string = '';
    Left_Rear_Turn_Signal: string = '';
    Right_Rear_Turn_Signal: string = '';
    Battery: string = '';
    Electrical_Control_Box: string = '';
    Throttle_Grip_Kit: string = '';
    Front_Wheel_Fender: string = '';
    Rear_Fender_With_License_Plate: string = '';
    Rear_Fender_In: string = ''; 
    Mask_Face_Shiled: string = '';
    Color_Set_Sticker_Pattern: string = '';
    Left_Side_Cover: string = '';
    Right_Side_Cover: string = '';
    Left_Windshield: string = '';
    Right_Windshield: string = '';
    Lower_Spoiler: string = '';
    Front_Break_Drum_Set: string = '';
    Rear_Break_Drum_Set: string = '';
    Front_Break_Disc_Set: string = '';
    Rear_Break_Disc_Set: string = '';
    Horn: string = '';
    Left_Rear_View_Monitor: string = '';
    Right_Rear_View_Monitor: string = '';
    Left_Hand_Break: string = '';
    Right_Hand_Break: string = '';
    Hand_Break_Lock: string = '';
    Foot_Break_Pedal: string = '';
    Hand_Clutch: string = '';
    Fall_Break_Protection: string = '';
    Left_Front_Footrest: string = '';
    Right_Front_Footrest: string = '';
    Left_Back_Footrest: string = '';
    Right_Back_Footrest: string = '';
    Rubber_Footrest_Front: string = '';
    Rubber_Footrest_Back: string = '';
    U_Box: string = '';
    Multipurpose_Box: string = '';
    Side_Stand: string = '';
    Double_Stand: string = '';
    Number_Miles: string = '';
}

export interface Repo_Score{
    ESTIMATE_SCORE_ID : string;
    ESTIMATE_SCORE_DESCIPTION: string;
    SCORE: string;
}

export interface Repo_Mile{
    ESTIMAATE_MILE_CODE: string;
    MILE_MIN: string;
    MILE_MAX: string;
    SCORE: string;
    ESTIAMTE_REPO_ITEM_CODE: string;
}

export interface Estimate_Repo_Picture{
    Contact_No: string;
    Estimate_Picture_Label: string;
    Estimate_Picture: any[];
    Estimate_Picture_Str: string;
    IsUpdate: boolean;
}

export interface Repo_Menu{
    UserName: string;
    MenuId: string;
    Au_Open: string;
    Au_Edit: string;
    Au_Dele: string;
    Au_Admin: string;
    Au_Prn: string;
    FullName: string;
}