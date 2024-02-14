import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFilesComponent } from 'src/app/components/upload-files/upload-files.component';
@Component({
  selector: 'app-leitor-pdf',
  templateUrl: './leitor-pdf.component.html',
  styleUrls: ['./leitor-pdf.component.scss'],
})
export class LeitorPdfComponent implements OnInit {
  public file!: any;
  public descriptionIMC!: string;
  public sumirCard = false;
  pages: { pageNumber: number; audioSrc: string }[] = [];
  public pdfSrc!: string | any;

  @ViewChild(UploadFilesComponent) files!: UploadFilesComponent;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  public fileUpload(file: File) {
    console.log(file);
    if (file) {
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
