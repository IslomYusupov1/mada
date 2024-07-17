import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyAutoService extends MainService {
  protected useBearer = true
  protected returnJson = true

  getModelsList(data: any) {
    return this.postData('/myAuto/get/list', data)
  }

  getModelOne(modelId: number) {
    return this.postData('/myAuto/get/one', {modelId})
  }

  addModel(data: { name: string, modelImg: string, modelLogo: string }) {
    return this.postData('/myAuto/add/model', data)
  }

  addImage(data: { img: string, modelId: number, colorId: number }) {
    return this.postData('/myAuto/add/image', data)
  }

  editImage(data: { img: string, modelId: number, colorId: number, imgId: number }) {
    return this.postData('/myAuto/edit/image', data)
  }

  editModel(data: { modelId: number, name: string, modelImg: string, modelLogo: string }) {
    return this.postData('/myAuto/edit/model', data)
  }

  getColorList(data: any) {
    return this.postData('/myAuto/get/color/list', data)
  }

  getColorOne(colorId: number) {
    return this.postData('/myAuto/get/color/one', {colorId})
  }

  getCarColorList() {
    return this.getData('/myAuto/get/color/parent/list')
  }

  colorAdd(data: { colorName: string, colorCode: string }) {
    return this.postData('/myAuto/add/color', data)
  }

  colorEdit(data: { colorId: number, colorName: string, colorCode: string }) {
    return this.postData('/myAuto/edit/color', data)
  }

  modelSimilarNameList(data: { modelId?: number, filter?: { name?: string }, paging: { page: number, size: number } }) {
    return this.postData('/myAuto/get/model/similar/name/paging',data)
  }

  addModelSimilarName(data: { modelId: number, similarNameList: Array<string> }) {
    return this.postData('/myAuto/add/similar/name',data)
  }

  editModelSimilarName(data: { modelId: number, similarNameList: Array<string> }) {
    return this.postData('/myAuto/edit/model/similar/name',data)
  }

  colorSimilarNameList(data: { colorId?: number, filter?: { name?: string }, paging: { page: number, size: number } }) {
    return this.postData('/myAuto/get/color/similar/name/paging',data)
  }

  editColorSimilarName(data: { colorId: number, similarNameList: Array<string> }) {
    return this.postData('/myAuto/edit/color/similar/name',data)
  }

  addColorSimilarName(data: { colorId: number, similarNameList: Array<string> }) {
    return this.postData('/myAuto/add/color/similar/name',data)
  }

  modelImageUpload(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post('https://mob-file-juicer.aab.uz/file/upload?dir=myauto', formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }
}
