import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-registry',
  styleUrls: ['registry.component.css'],
  templateUrl: 'registry.component.html',
})
export class RegistryComponent implements AfterViewInit, OnInit {
  constructor(private http: HttpClient, private router: Router) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  displayedColumns: string[] = [
    'name',
    'brand',
    'price',
    'registeredBy',
    'category',
  ];

  dataSource: MatTableDataSource<Product>;

  clickedRows = new Set<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onProductClick(id: string) {
    this.router.navigate(['/product', id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:3000/products/lower/0/10')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error),
      });
  }
}
