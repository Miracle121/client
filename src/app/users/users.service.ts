import {Users} from './users.modul';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({providedIn:'root'})
export class UsersService {
  constructor(private http: HttpClient, private router : Router){
  }
  private users:Users[] = [];
  private userUpdate = new Subject<Users[]>();
  getUsers(){
    this.http.get<{message: string , post: any}>('http://localhost:3000/api/post')
    .pipe(map((postdata)=>{
      return postdata.post.map(post=>{
        return{
        titel:post.titel,
        contet : post.contet,
        id : post._id
      };
      });
       }))
    .subscribe((transfordata)=>{
      this.users = transfordata;
      this.userUpdate.next([...this.users]);
    });
     }
  getUpdateUserslisner(){
    return this.userUpdate.asObservable();
  }
  addUsers(titel: string , contet: string){
    const user: Users =  {id:null, titel: titel, contet: contet};
    this.http.post<{message: string, postId:string}>("http://localhost:3000/api/post",user).subscribe((resposPost)=>
    {
      const id = resposPost.postId;
      user.id = id;
      this.users.push(user);
      this.userUpdate.next([...this.users]);
      this.router.navigate(["/"]);
    });
   }
   DeletePost(postId:string){
     this.http.delete("http://localhost:3000/api/post/"+postId)
     .subscribe(()=>{
     const updatepost = this.users.filter(post=>post.id!=postId);
     this.users = updatepost;
     this.userUpdate.next([...this.users]);
     });

   }
   UpdateUser(id :string,titel:string,contet:string){
     const userinfo:Users = { id:id ,titel:titel , contet:contet};
     this.http.put("http://localhost:3000/api/post/"+id,userinfo)
     .subscribe((reson)=>{
       const updateus = [...this.users];
       console.log(updateus);
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
       "http://localhost:3000/api/post/"+id
       );
   }



}
