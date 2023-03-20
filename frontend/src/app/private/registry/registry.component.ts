import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
export interface ProductElement {
  _id: string;
  name: string;
  brand: string;
  price: number;
  registeredBy?: string;
  category: string;
}

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-registry',
  styleUrls: ['registry.component.css'],
  templateUrl: 'registry.component.html',
})
export class RegistryComponent implements AfterViewInit, OnInit {
  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<ProductElement>();
  }

  displayedColumns: string[] = [
    'name',
    'brand',
    'price',
    'registeredBy',
    'category',
  ];

  data!: ProductElement[];

  dataSource: MatTableDataSource<ProductElement>;

  clickedRows = new Set<ProductElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.http
      .get<ProductElement[]>('http://localhost:3000/products/lower/0/10')
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(this.data);
          this.dataSource.data = this.data;
        },
        error: (error) => console.error(error),
      });
  }
}
