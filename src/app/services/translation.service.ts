import { Injectable, computed, signal } from '@angular/core';

export type Lang = 'en' | 'ar';

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    'app.title': 'BazaarX',
    'app.demo': 'This is a simulated e-commerce demo.',
    'nav.store': 'Store',
    'nav.cart': 'Cart',
    'nav.admin': 'Admin',
    'nav.home': 'Home',
    'lang.toggle': 'عربي',
    'product.add': 'Add to Cart',
    'product.price': 'Price',
    'product.seller': 'Seller',
    'product.rating': 'Rating',
    'cart.empty': 'Your cart is empty',
    'cart.view': 'View Cart',
    'cart.checkout': 'Checkout',
    'cart.subtotal': 'Subtotal',
    'cart.remove': 'Remove',
    'checkout.title': 'Checkout',
    'checkout.email': 'Email',
    'checkout.address': 'Address',
    'checkout.place': 'Place Order',
    'checkout.success': 'Order Placed Successfully!',
    'checkout.thanks': 'Thank you for your purchase.',
    'admin.dashboard': 'Analytics Dashboard',
    'admin.orders': 'Total Orders',
    'admin.revenue': 'Revenue',
    'admin.conversion': 'Conversion Rate',
    'admin.abandoned': 'Abandoned Cart %',
    'admin.revenueTrend': 'Revenue Trend',
    'admin.ordersPerDay': 'Orders per Day',
    'admin.topProducts': 'Top Products',
  },
  ar: {
    'app.title': 'بازار إكس',
    'app.demo': 'هذا عرض تجارة إلكترونية محاكى.',
    'nav.store': 'المتجر',
    'nav.cart': 'السلة',
    'nav.admin': 'الإدارة',
    'nav.home': 'الرئيسية',
    'lang.toggle': 'English',
    'product.add': 'أضف للسلة',
    'product.price': 'السعر',
    'product.seller': 'البائع',
    'product.rating': 'التقييم',
    'cart.empty': 'سلتك فارغة',
    'cart.view': 'عرض السلة',
    'cart.checkout': 'إتمام الشراء',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.remove': 'إزالة',
    'checkout.title': 'إتمام الشراء',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.address': 'العنوان',
    'checkout.place': 'تأكيد الطلب',
    'checkout.success': 'تم الطلب بنجاح!',
    'checkout.thanks': 'شكراً لشرائك.',
    'admin.dashboard': 'لوحة التحليلات',
    'admin.orders': 'إجمالي الطلبات',
    'admin.revenue': 'الإيرادات',
    'admin.conversion': 'معدل التحويل',
    'admin.abandoned': 'نسبة التخلي عن السلة',
    'admin.revenueTrend': 'اتجاه الإيرادات',
    'admin.ordersPerDay': 'الطلبات يومياً',
    'admin.topProducts': 'أفضل المنتجات',
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<Lang>('en');

  constructor() {
    this.setLang('en'); // Initialize document dir/lang
  }
  readonly lang = this.currentLang.asReadonly();
  readonly isRtl = computed(() => this.currentLang() === 'ar');

  translate(key: string): string {
    return TRANSLATIONS[this.currentLang()][key] ?? key;
  }

  t(key: string): string {
    return this.translate(key);
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  toggleLang(): void {
    const next = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLang(next);
  }
}
