import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiIaService } from 'src/app/services/api-ia.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() fileResult: any;
  public imageUrl!: string;

  constructor(private _snackBar: MatSnackBar, private service: ApiIaService) {}

  ngOnInit() {}

  public uploadImage() {
    this.fileInput.nativeElement.click();
  }

  public onFileSelectionChange(event: any) {
    const file = event.target.files[0];

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.openSnackBar(
        'Arquivo inválido, por favor fazer o upload de arquivo jpg/png',
        3000
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    return reader.readAsDataURL(file);
  }

  public transformarImagem() {
    this.service.uploadImage(this.imageUrl).subscribe((response) => {
      console.log(response);
      this.imageUrl = response.output_url;
    });
  }

  private openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration: duration });
  }
}
