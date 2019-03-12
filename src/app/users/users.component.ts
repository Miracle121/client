import { Component, OnInit } from '@angular/core';
import {Users} from './users.modul';
import {UsersService} from './users.service';
import { NgForm, FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(public userService :UsersService,public router: ActivatedRoute  ) { }

  id='';
  titel= '';
  contet= '';
  private mode ='create';
  private userId: string;
   user: Users ;
   form: FormGroup;
    isLoding = false;
      imagePreView:any;
  ngOnInit() {

    this.form = new FormGroup({
      'titel': new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]}),
      'contet': new FormControl(null,{
          validators:[Validators.required,Validators.minLength(5)]
        }),
      'image': new FormControl(null,{validators:[Validators.required]})
    });

    this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('userId')){
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoding = true;
        this.userService.getPost(this.userId)
            .subscribe(userdata => {
              this.user = {id: userdata._id , titel: userdata.titel,  contet: userdata.contet };
              this.form.setValue({
                titel:this.user.titel,
                contet:this.user.contet
              });
        });
        this.isLoding = false;
     }
       else{
         this.mode='create';
      }
    });
  }

  onFilePicker(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreView = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(this.imagePreView );
    console.log(this.form);
  }
   PostData(){
    if(this.form.invalid){
      return;
    }
    if(this.mode==='create'){
        this.userService.addUsers(this.form.value.titel,this.form.value.contet);
    }else{
        this.userService.UpdateUser(this.userId,this.form.value.titel,this.form.value.contet)
    }
    this.form.reset();




    }

}
