import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatInputModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  protected selectedLang = this.translate.getCurrentLang() || localStorage.getItem('tankiq-lang') || 'en';

  protected changeLanguage(language: string) {
    this.selectedLang = language;
    localStorage.setItem('tankiq-lang', language);
    this.translate.use(language);
  }

  protected signIn() {
    localStorage.setItem('tankiq-lang', this.selectedLang);
    this.translate.use(this.selectedLang);
    this.router.navigate(['/dashboard']);
  }
}
