import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from 'src/custom-validators/mime-type.validator';

import { Order } from '../../models/orders.model';
import { OrdersService } from '../../services/oredrs.service';

@Component({
  selector: 'gs-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  order!: Order | undefined;
  isSubmitted = false;
  imagePreview!: string | null | ArrayBuffer;
  form!: FormGroup;
  private mode = false;
  private orderId!: string;
  constructor(
    private orderService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required], [mimeType]),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.orderId = paramMap.get('id') as string;
      if (this.orderId) {
        this.mode = true;
        this.orderService
          .getSelectedOrder(this.orderId)
          .subscribe((orderData) => {
            if (orderData?.order) {
              this.form.setValue({
                title: orderData.order.title,
                description: orderData.order.description,
                image: orderData.order.imagePath,
              });
            }
          });
      } else {
        this.mode = false;
      }
    });
  }

  onSaveOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.mode) {
      this.orderService.updateOrder(
        this.orderId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.image
      );
    } else {
      this.orderService.addOrder(
        this.form.value.title,
        this.form.value.description,
        this.form.value.image
      );
    }
    this.form.reset();
    this.router.navigate(['orders']);
  }

  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      this.form.patchValue({
        image: file,
      });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['orders']);
  }
}
