export interface ChangedShopInfo {
    //form sql
    InvoiceID:string,
    Route:string,
    NowSequence:string,
    //form front end
    previousRoute:string,
    previousSequence:string,
    customer:string,
}

export interface CustomColumn {
    field:string,
    value:boolean
}