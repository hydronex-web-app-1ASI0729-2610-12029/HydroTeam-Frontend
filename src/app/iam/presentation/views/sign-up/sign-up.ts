// src/app/iam/presentation/views/sign-up/sign-up.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthenticationStore } from '../../../application/authentication.store';
import { UserRole } from '../../../domain/user.entity';
import { Router } from '@angular/router';

// Validator: confirmPassword must match password
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw  = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  if (pw && cpw && pw !== cpw) {
    group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private readonly fb        = inject(FormBuilder);
  private readonly router    = inject(Router);
  private readonly snackBar  = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  protected readonly authStore = inject(AuthenticationStore);

  protected readonly UserRole = UserRole;
  protected hidePassword        = true;
  protected hideConfirmPassword = true;

  protected readonly form: FormGroup = this.fb.group(
    {
      name:            ['', [Validators.required, Validators.minLength(2)]],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role:            ['', [Validators.required]],
      phoneNumber:     [''],
      apartmentNumber: [''],
    },
    { validators: passwordMatchValidator }
  );

  get nameCtrl()            { return this.form.get('name');            }
  get emailCtrl()           { return this.form.get('email');           }
  get passwordCtrl()        { return this.form.get('password');        }
  get confirmPasswordCtrl() { return this.form.get('confirmPassword'); }
  get roleCtrl()            { return this.form.get('role');            }
  get phoneNumberCtrl()     { return this.form.get('phoneNumber');     }
  get apartmentNumberCtrl() { return this.form.get('apartmentNumber'); }
  get selectedRole(): UserRole { return this.roleCtrl?.value; }

  protected onRoleChange(role: UserRole): void {
    const phone     = this.phoneNumberCtrl;
    const apartment = this.apartmentNumberCtrl;

    phone?.clearValidators();
    apartment?.clearValidators();
    phone?.setValue('');
    apartment?.setValue('');

    if (role === UserRole.ADMINISTRATOR) {
      phone?.setValidators([Validators.required]);
    } else if (role === UserRole.RESIDENT) {
      apartment?.setValidators([Validators.required]);
    }

    phone?.updateValueAndValidity();
    apartment?.updateValueAndValidity();
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password, role, phoneNumber, apartmentNumber } = this.form.value;

    try {
      await this.authStore.signUp(name, email, password, role, phoneNumber, apartmentNumber);
      this.snackBar.open(
        this.translate.instant('iam.signUp.successMessage'),
        'OK',
        { duration: 5000, horizontalPosition: 'center', panelClass: ['snack-success'] }
      );
      this.router.navigate(['/iam/login']);
    } catch (message) {
      this.snackBar.open(message as string, 'Dismiss', {
        duration: 4000,
        horizontalPosition: 'center',
        panelClass: ['snack-error'],
      });
    }
  }
}
