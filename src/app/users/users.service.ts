import {Users} from './users.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
const URL_API = environment.API_URL + "post/";
@Injectable({providedIn:'root'})
export class UsersService {
  constructor(private http: HttpClient, private router : Router){
  }
  private users: Users[] = [];
  private userUpdate = new Subject<Users[]>();
  getUsers(){
    this.http.get<{ message: string, post: any }>(URL_API)
    .pipe(map((postdata) => {
      return postdata.post.map(post => {
        //console.log(post);
        return{
        titel: post.titel,
        contet : post.contet,
        creater: post.creater,
        id : post._id
      };
      });
       }))
    .subscribe((transfordata) => {
      this.users = transfordata;
      this.userUpdate.next([...this.users]);
    });
     }
  getUpdateUserslisner(){
    return this.userUpdate.asObservable();
  }
  addUsers(titel: string , contet: string){
    const user: Users =  {id: null, titel : titel, contet : contet};
    this.http.post<{ message: string, postId: string }>(URL_API , user).subscribe((resposPost)=>
    {
      const id = resposPost.postId;
      user.id = id;
      this.users.push(user);
      this.userUpdate.next([...this.users]);
      this.router.navigate(["/"]);
    });
   }
   DeletePost(postId:string){
     this.http.delete(URL_API+postId)
     .subscribe(()=>{
     const updatepost = this.users.filter(post=>post.id!=postId);
     this.users = updatepost;
     this.userUpdate.next([...this.users]);
     });

   }
   UpdateUser(id :string,titel:string,contet:string){
     const userinfo:Users = { id:id ,titel:titel , contet:contet};
     this.http.put(URL_API+id,userinfo)
     .subscribe((reson)=>{
       const updateus = [...this.users];
       const oldupdate = updateus.findIndex(p=>p.id===userinfo.id);
       updateus[oldupdate] = userinfo;
       console.log(oldupdate);
       this.users =updateus;
       this.userUpdate.next([...this.users]);
       this.router.navigate(["/"]);
       console.log("sended  to server")
      });
   }
   getPost(id: string){
     return this.http.get<{ _id: string, titel: string, contet:string}>(
       URL_API+"/"+id
       );
   }



}
