import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterViewInit {
  public shouldDisplayHeader: boolean = true;
  public shouldDisplayBody: boolean = true;
  public shouldDisplayFooter: boolean = true;
  @ViewChild('header')
  public header: ElementRef;
  @ViewChild('body')
  public body: ElementRef;
  @ViewChild('footer')
  public footer: ElementRef;
  @Input()
  public cardImageSource: string;
  @Input()
  public cardBodyHeight: string;
  @Input()
  public cardCustomClass: string;
  @Input()
  public cardHeight: string = '100%';
  @Input()
  public minHeight: string = '250px';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    this.handleHeaderVisibility();
    this.handleBodyVisibility();
    this.handleFooterVisibility();
  }

  private handleHeaderVisibility(): void {
    if (this.header.nativeElement.childNodes.length <= 0) {
      this.shouldDisplayHeader = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  private handleBodyVisibility(): void {
    if (this.body.nativeElement.childNodes.length <= 0) {
      this.shouldDisplayBody = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  private handleFooterVisibility(): void {
    if (this.footer.nativeElement.childNodes.length <= 0) {
      this.shouldDisplayFooter = false;
      this.changeDetectorRef.detectChanges();
    }
  }
}
