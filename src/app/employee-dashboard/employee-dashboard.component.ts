import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  showEmployeeContainer: boolean = false;
  showAdd: boolean = true;
  showUpdate!: boolean;

  employeeModel: EmployeeModel = new EmployeeModel()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: [''],
    })

    this.FetchAllEmployee()

  }

  addEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.phone = this.formValue.value.phone;
    this.employeeModel.salary = this.formValue.value.salary;

    this.apiService.postEmployee(this.employeeModel)
      .subscribe(res => {
        this.formValue.reset()
        // alert("Added Successfully !");
    this.showEmployeeContainer = false
        this.FetchAllEmployee()
      }, error => {
        alert("Something went wrong !")
      })
  }

  FetchAllEmployee() {
    this.apiService.getAllEmployee()
      .subscribe(res => {
        this.employeeData = res
      })
  }

  deleteEmployee(row: any) {
    console.log(row.id)
    this.apiService.deleteEmployee(row.id)
      .subscribe(res => {
        console.log(res)
        // alert("Employee Deleted")
    this.showEmployeeContainer = false
        this.FetchAllEmployee()
      })
  }

  onEdit(row: any) {
    this.showEmployeeContainer = true;
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.phone = this.formValue.value.phone;
    this.employeeModel.salary = this.formValue.value.salary;

    this.apiService.updateEmployee(this.employeeModel, this.employeeModel.id)
      .subscribe(res => {
        // alert("Update Succefully !")
        this.formValue.reset()
        this.showEmployeeContainer = false
        this.FetchAllEmployee()
      })
  }

  clickedAddEmployee() {
    this.formValue.reset();
    this.showEmployeeContainer = true;
    this.showAdd = true;
    this.showUpdate = false;
  }

  clickedCloseEmployeeContainer() {
    this.formValue.reset();
    this.showEmployeeContainer = false
  }

}
