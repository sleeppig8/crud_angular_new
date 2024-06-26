import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service'; // 引入服務
import { DataInterface } from '../data-interface'; // 引入介面
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzTableModule,
    NzDividerModule,
    FormsModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  // providers:[DataService]
})
export class AddComponent implements OnInit {
  // 定義
  addForm!: FormGroup;
  dataList: any[] = [];

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];

  // 依賴注入
  constructor(
    private fb: FormBuilder,
    // private http: HttpClient,
    private dataService: DataService
  ) { }

  // 初始化
  ngOnInit(): void {
    this.addForm = this.fb.group({
      unitName: [''],
      office: [''],
      filingDate: [''],
      account: [''],
      name: [''],
      idNumber: [''],
      jobTitle: [''],
      phone: [''],
      email: [''],
      system: [''],
      enable: [true]
    });
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe(data => {
      this.dataList = data;
    });
  }

  // delete(z: any) {
  //   this.http.delete('/api/POC_angular/' + z.id).subscribe();
  //   this.dataList = this.dataList.filter(data => data != z);
  // }
  delete(item: DataInterface): void {
    this.dataService.deleteData(item.id).subscribe(() => {
      console.log('刪除成功:', item);
      this.dataList = this.dataList.filter(data => data.id !== item.id);
    });
  }

  // onSubmit(): void {
  //   if (this.addForm.valid) {
  //     console.log(this.addForm.value);
  //     const form: any = {
  //       account: this.addForm.value.account,
  //       unitName: this.addForm.value.unitName,
  //       office: this.addForm.value.office,
  //       filingDate: this.addForm.value.filingDate,
  //       name: this.addForm.value.name,
  //       idNumber: this.addForm.value.idNumber,
  //       jobTitle: this.addForm.value.jobTitle,
  //       phone: this.addForm.value.phone,
  //       email: this.addForm.value.email,
  //       system: this.addForm.value.system,
  //       enable: this.addForm.value.enable
  //     }
  //     this.http.post('/api/POC_angular', form).subscribe(data => {
  //       this.dataList.push(data);
  //     });
  //     this.addForm.reset();
  //   }
  // }
  onSubmit(): void {
    if (this.addForm.valid) {
      const formData: DataInterface = this.addForm.value;
      this.dataService.addData(formData).subscribe(data => {
        console.log('新增成功:', data);
        this.dataList.push(data);
        this.addForm.reset();
      });
    }
  }
}
