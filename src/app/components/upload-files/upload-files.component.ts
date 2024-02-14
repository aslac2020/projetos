import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  @Input() public listFiles: any[] = [];
  @Input() public disabled = false;
  @Input() public maximumQuantity = 10;
  @Output() public fileSelected = new EventEmitter<any>();

  public pdfSrc!: string;
  public isDragging = false;
  public singleFile = false;
  public dataModificate!: string;
  public hour!: string;
  pageVariable = 1;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  public onFileSelectionChange(event: any) {
    let files = event.target.files;

    files = Array.from(files);

    if (!this.validateFile(files)) {
      return;
    }

    files.forEach((file: any) => {
      if (
        this.listFiles.length < this.maximumQuantity &&
        !this.fileAlreadyImported
      ) {
        (this.dataModificate = moment().format('DD/MM/YYYY')),
          (this.hour = moment().format('HH:mm')),
          this.listFiles.push(file);
      }
    });
  }

  afterLoadComplete(pdf: any) {
    console.log('after-load-complete');
  }

  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

  textLayerRendered(e: CustomEvent) {
    console.log('(text-layer-rendered)', e);
  }

  public get fileAlreadyImported() {
    return this.singleFile && this.listFiles.length;
  }

  public aoDragOver(event: any) {
    event.preventDefault();
    this.isDragging = true;
  }

  public aoDragLeave() {
    this.isDragging = false;
  }

  public aoDrop(event: any) {
    event.preventDefault();
    this.isDragging = false;
    this.onFileSelectionChange(event.dataTransfer.files);
  }

  private openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration: duration });
  }

  private validateFile(files: any): boolean {
    if (!files.length) {
      return false;
    }

    if (this.listFiles.length + files.length > this.maximumQuantity) {
      this.openSnackBar(
        `São aceitos apenas até ${this.maximumQuantity} documentos`,
        3000
      );
      return false;
    }

    if (files.some((a: { type: string }) => a.type !== 'application/pdf')) {
      this.openSnackBar('Apenas arquivos PDFs são suportados', 3000);
      return false;
    }

    if (
      files.some((a: any) =>
        this.listFiles.some((b: any) => a.name == b.DescriptionNameFile)
      )
    ) {
      this.openSnackBar('Arquivo já importado', 3000);
      return false;
    }
    return true;
  }

  public onClickPdf(file: File): any {
    if (file) {
      this.fileSelected.emit(file);
    }
  }

  deleteFile(indice: any) {
    this.listFiles.splice(indice, 1);
  }
}
