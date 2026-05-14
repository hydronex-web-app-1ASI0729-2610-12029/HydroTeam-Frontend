import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthenticationStore } from '../../../application/authentication.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb          = inject(FormBuilder);
  private readonly translate   = inject(TranslateService);
  private readonly snackBar    = inject(MatSnackBar);
  protected readonly authStore = inject(AuthenticationStore);

  protected selectedLang = this.translate.getCurrentLang()
    || localStorage.getItem('tankiq-lang')
    || 'en';

  protected hidePassword = true;

  protected readonly form: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailCtrl()    { return this.form.get('email');    }
  get passwordCtrl() { return this.form.get('password'); }

  protected changeLanguage(language: string): void {
    this.selectedLang = language;
    localStorage.setItem('tankiq-lang', language);
    this.translate.use(language);
  }

  protected async signIn(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    localStorage.setItem('tankiq-lang', this.selectedLang);
    this.translate.use(this.selectedLang);

    const { email, password } = this.form.value;

    try {
      await this.authStore.signIn(email, password);
    } catch (message) {
      this.snackBar.open(message as string, 'Dismiss', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snack-error'],
      });
    }
  }
}
