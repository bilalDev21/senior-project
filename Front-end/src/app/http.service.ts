import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from './interfaces/user';
import { ILogin } from './interfaces/Login';
import { IEvent } from './interfaces/Event';
import { IRequest } from './interfaces/Request';
import { ICreateRequest } from './interfaces/CreateRequest';
import { IReport } from './interfaces/Report';
import { IStatus } from './interfaces/Status';
import { IHistory } from './interfaces/history';
import { IAmount } from './interfaces/amount';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7231";
  http = inject(HttpClient);
  
  constructor() { }

  // User
  getAllUser(){
    return this.http.get<ILogin[]>(this.apiUrl + '/api/user');
  }
  getUserById(userId:number){
    return this.http.get(this.apiUrl + '/api/user/'+userId);
  }
  CreatUser(User:IUser){
    return this.http.post(this.apiUrl + '/api/user', User );
  } 

  // Event
  getAllEvent(){
    return this.http.get<IEvent[]>(this.apiUrl + '/api/Event');
  }
  CreatEvent(Event:IEvent){
    return this.http.post(this.apiUrl + '/api/Event', Event );
  }
  getEvent(eventId:number){
    return this.http.get<IEvent>(this.apiUrl + '/api/Event/'+eventId);
  }
  updateEvent(eventId:number,event:IEvent){
    return this.http.put<IEvent>(this.apiUrl + '/api/Event/'+eventId,event);
  }
  deleteEmployee(eventId:number){
    return this.http.delete(this.apiUrl + '/api/Event/'+eventId);
  }

  // Request
  CreatRequest(request:ICreateRequest){
    return this.http.post(this.apiUrl + '/api/Request', request );
  }
  getAllRequest(){
    return this.http.get<IRequest[]>(this.apiUrl + '/api/Request');
  }
  getAllRequestById(requestId:number){
    return this.http.get<IRequest[]>(this.apiUrl + '/api/Request/'+requestId);
  }
  updateRequest(requestId:number,status:IStatus){
    return this.http.put<IStatus>(this.apiUrl + '/api/Request/'+requestId,status);
  }
  deleteRequest(requestId:number){
    return this.http.delete(this.apiUrl + '/api/Request/'+requestId);
  }

  // Report
  CreateReport(report:any){
    return this.http.post(this.apiUrl + '/api/Report', report );
  }
  getAllReportById(reportId:number){
    return this.http.get<IReport[]>(this.apiUrl + '/api/Report/AllReportById'+reportId);
  }
  getAllReport(){
    return this.http.get<any>(this.apiUrl + '/api/Report');
  }
  deleteReport(reportId:number){
    return this.http.delete(this.apiUrl + '/api/Report/'+reportId);
  }
  updateReport(requestId:number,status:IStatus){
    return this.http.put<IStatus>(this.apiUrl + '/api/Report/'+requestId,status);
  }

  // Report History
  CreateHistory(){
    return this.http.get<any>(this.apiUrl + '/api/ReportHistories');
  }
  getAllHistory(){
    return this.http.get<any>(this.apiUrl + '/api/ReportHistories/AllHistory');
  }
  getAllHistoryById(userId:number){
    return this.http.get<IHistory>(this.apiUrl + '/api/ReportHistories/'+userId);
  }

  // Tool
  CreateTool(tool:any){
    return this.http.post(this.apiUrl + '/api/Tool', tool );
  }
  getAllTool(){
    return this.http.get<any>(this.apiUrl + '/api/Tool');
  }
  getTool(toolId:number){
    return this.http.get<any>(this.apiUrl + '/api/Tool/oneTool'+toolId);
  }
  UpdateQuantity(toolId:number){
    return this.http.post(this.apiUrl + '/api/Tool/'+toolId,toolId);
  }
  updateTool(toolId:number,tool:any){
    return this.http.put<any>(this.apiUrl + '/api/Tool/'+toolId,tool);
  }
  deleteTool(toolId:number){
    return this.http.delete(this.apiUrl + '/api/Tool/'+toolId);
  }


  // Order
  CreateOrder(order:any){
    return this.http.post(this.apiUrl + '/api/Order', order );
  }
  getAllOrderById(userID:number){
    return this.http.get<any>(this.apiUrl + '/api/Order/'+userID);
  }
  getAllOrder(){
    return this.http.get<any>(this.apiUrl + '/api/Order');
  }
  UpdateOrderTool(orderId:number){
    return this.http.get(this.apiUrl + '/api/Order/OrderAndTool'+orderId);
  }

  // Tax
  createTaxOfTool(userId:number,quantity:IAmount){
    return this.http.post<IAmount>(this.apiUrl + '/api/Tax/'+userId,quantity);
  }
} 
