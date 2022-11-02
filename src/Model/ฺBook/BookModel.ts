export interface M_RBC_BOOK_CONTROL{
    Contact_No : string;
    Book_No : string;
    Cabinet_No : string;
    Tray_No : string;
    Slot_No : string;
    Number : string;
    Cancel : string;
    Cancel_DateTime : string;
}

export interface M_RBC_LOG{
    Contact_No : string;
    Emp : string;
    Reason : string;
    UPD_DateTime : string;
    UDP_User : string;
}

export interface M_OUT_REGBOOK_REASON_P{
    Reson_Code : string;
    Reson_Detail : string;
    Cancel : string;
    Cancel_DateTime : string;
}

export interface AC_PROVE{
    HP_NO : string;
    Regis : string;
    Reg_No : string;
    Reg_City : string;
    Exp_Date : string;
    Reg_Date : string;
    Engi_No : string;
    Casi_No : string;
    Company : string;
    Bill : string;
    Bill_Sub :string;

}

export interface X_PRODUCT_DETAIL{
    Product_Code : string;
    Brand_Code : string;
    ModelCode : string;
    Color : string;
    Engine_Number : string;
    Chassis_Number : string;
    Engi_No_Running : string;
    Chassis_No_Running : string;
    Model_Year : string;
    Ref_No : string;
    Reg_City : string;
    Reg_Date : string;
    Exp_Date : string;
    Pub_Reg_Num : string;
    Pub_Reg_Date : string;
    Record_Reg_no_DateTime : string;
    Record_Reg_No_By : string;
    Record_Pub_Reg_Num_DateTime : string;
    Record_Pub_Reg_Num_By : string;
}

export interface Book_Input{
    Reg_No : string;
    Reg_City : string;
    Reg_Date : string;
    Reg_Date_Exp : string;
    Reg_Status : String;
    Pub_Reg_Num : string;
    Pub_Reg_Date : string;
    Room_No : string;
    Cabinet_No : string;
    Tray_No : string;
    Slot_No : string;
}

export interface Card extends Book_Input{
    Contact_No :string;
    Contact_Date : string;
    Brand : string;
    Model : string;
    Engi_No : string;
    Chassis_No : string;
    Cust_Name : string ;
    Cust_Sname : string;
    Sale : string;
    Tax : string;
    Branch : string;
    Color : string;
    CC : string;
    Book_Status : string;
    Outstanding : string;
}