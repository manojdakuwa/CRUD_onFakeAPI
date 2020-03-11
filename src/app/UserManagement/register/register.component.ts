import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: any;
  RegisterLoginForm:any;
  students:any;
  submitted=false;
  upHide=false;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private formBuilder: FormBuilder,private router : Router, private route:ActivatedRoute,
    private http:HttpClient, private toaster:ToastrManager) { }

  ngOnInit() {
    this.RegisterLoginForm = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required],
      Locked:['',Validators.required],
      Active:['',Validators.required],
    });
    this.getStudentData();
  }
  get f() { return this.RegisterLoginForm.controls; }

  getStudentData(){
    this.http.get('http://localhost:3201/data').subscribe(result=>{
      this.students=result;
    })
  }
  onSubmit(){
    this.submitted=true;
    if (this.RegisterLoginForm.invalid) {
      return;
    } else {
      const RegisterData={
        name:this.RegisterLoginForm.controls.FirstName.value,
        LastName:this.RegisterLoginForm.controls.LastName.value,
        Email:this.RegisterLoginForm.controls.Email.value,
        Password:this.RegisterLoginForm.controls.Password.value,
        Locked:this.RegisterLoginForm.controls.Locked.value,
        Active:this.RegisterLoginForm.controls.Active.value
      }
      this.http
      .post('http://localhost:3201/data/', RegisterData)
      .subscribe((res: Response) => {
        this.toaster.successToastr("record saved successfully.",'success',{
          toastTimeout: 5000
        })
      });
      this.RegisterLoginForm.controls.FirstName.setValue('');
      this.RegisterLoginForm.controls.LastName.setValue('');
      this.RegisterLoginForm.controls.Email.setValue('');
      this.RegisterLoginForm.controls.Password.setValue('');
      this.RegisterLoginForm.controls.Locked.setValue('');
      this.RegisterLoginForm.controls.Active.setValue('');
    }
  }
  Edit(Value:any){
    this.upHide=true;
    this.id=Value.id;
    this.RegisterLoginForm.controls.FirstName.setValue(Value.name);
    this.RegisterLoginForm.controls.LastName.setValue(Value.LastName);
    this.RegisterLoginForm.controls.Email.setValue(Value.Email);
    this.RegisterLoginForm.controls.Password.setValue(Value.Password);
    this.RegisterLoginForm.controls.Locked.setValue(Value.Locked);
    this.RegisterLoginForm.controls.Active.setValue(Value.Active);
    window.scroll({ 
     top: 0, 
     left: 0, 
     behavior: 'smooth' 
   });
    console.log(Value);
  }
  Update(){
    this.submitted=true;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    if (this.RegisterLoginForm.invalid) {
      return;
    } else {
      const RegisterUpdateData={
        name:this.RegisterLoginForm.controls.FirstName.value,
        LastName:this.RegisterLoginForm.controls.LastName.value,
        Email:this.RegisterLoginForm.controls.Email.value,
        Password:this.RegisterLoginForm.controls.Password.value,
        Locked:this.RegisterLoginForm.controls.Locked.value,
        Active:this.RegisterLoginForm.controls.Active.value
      }
      
      const url = `${'http://localhost:3201/data/'}/${this.id}`;
      this.http
      .put(url, JSON.stringify(RegisterUpdateData), { headers: headers })
      .toPromise()
      .then(() => {
        this.toaster.successToastr("record updates successfully.",'success',{
          toastTimeout: 5000
        })
        this.router.navigate(['register']);
      });
      this.id='';
      this.RegisterLoginForm.controls.FirstName.setValue('');
      this.RegisterLoginForm.controls.LastName.setValue('');
      this.RegisterLoginForm.controls.Email.setValue('');
      this.RegisterLoginForm.controls.Password.setValue('');
      this.RegisterLoginForm.controls.Locked.setValue('');
      this.RegisterLoginForm.controls.Active.setValue('');
    }
  }
}
