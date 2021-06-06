import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {RowSingleData, TableData} from '@app/models/table.interface';
import {ViewState} from '@app/enums/view-state.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input()
  public tableHeader: string;
  @Input()
  public headers: string[];
  @Input()
  public data: TableData[];
  @Input()
  public tableBodyHeight: string;
  @Input()
  public highlightRow: boolean = false;
  @Input()
  public viewState: ViewState = ViewState.SUCCESS;
  @Input()
  public tableHeight: string;
  @Output()
  public rowClicked: EventEmitter<TableData> = new EventEmitter<TableData>();
  public tableData: (number | string)[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && this.data && this.data.length > 0) {
      this.data.forEach((tableData: TableData) => {
        tableData.data
          .forEach((data: RowSingleData) => {
            if (data.display) {
              this.tableData.push(data.value);
            }
        })
      });
    }
  }

  public singleRowClicked(tableData: TableData): void {
    this.rowClicked.emit(tableData);
  }
}
