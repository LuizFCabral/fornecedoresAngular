import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fornecedores } from '../fornecedores';
import { FornecedoresService } from '../fornecedores.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent {

  fornecedores: Fornecedores[]  = [];
  formGroupFornecedor: FormGroup;
  isEditing: boolean = false;
  currentFornecedores: Fornecedores = {} as Fornecedores;

  constructor(private fornecedoresService: FornecedoresService, private formBuilder: FormBuilder) {
    this.formGroupFornecedor = formBuilder.group({
      id: [''],
      name: [''],
      active: Boolean,
      category: [''],
      contact: [''],
    });
  }

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores(){
    this.fornecedoresService.getFornecedores().subscribe({
      next: (data) => {
        this.fornecedores = data;
        console.log(this.fornecedores);
      },
      error: ()=> console.log("Error to call endpoint")

    });
  }

  save(){
    if(this.isEditing){
      this.fornecedoresService.edit(this.formGroupFornecedor.value).subscribe({
        next: data => {
          let index = this.fornecedores.indexOf(this.currentFornecedores);
          this.fornecedores[index] = data;
        }
      })
      this.isEditing = false;
    }
    else{
      this.fornecedoresService.save(this.formGroupFornecedor.value).subscribe({
        next: data => {
          this.fornecedores.push(data);
          console.log(this.fornecedores);
        }
      })
    }
    this.formGroupFornecedor.reset();
  }

  remove(fornecedor: Fornecedores){
    this.fornecedoresService.remove(fornecedor).subscribe({
      next: () => {
        let index = this.fornecedores.indexOf(fornecedor);
        this.fornecedores.splice(index, 1);
      }
    });
  }

  edit(fornecedor: Fornecedores){
    this.formGroupFornecedor.setValue(fornecedor)
    this.currentFornecedores = fornecedor;
    this.isEditing = true
  }

}
