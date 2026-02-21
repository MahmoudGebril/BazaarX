import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';

const PRODUCTS_AR: string[] = [
  'عطر العود الملكي', 'حقيبة يد فاخرة', 'قميص كتان رجالي', 'عباءة نسائية', 'ساعة ذهبية',
  'سجادة صلاة فاخرة', 'مجوهرات عرق اللؤلؤ', 'ثوب عربي تقليدي', 'حذاء جلد طبيعي', 'عقد ذهبي مرصع',
  'شال حرير فاخر', 'طقم شاي عربي', 'مسبحة عنبر', 'إبريق نحاسي منقوش', 'سجادة فارسية',
  'عطر زهر البرتقال', 'حقيبة سفر جلدية', 'بدلة كشمير رجالية', 'فستان سهرة مطرز', 'خاتم فيروز',
  'غطاء رأس حريري', 'أواني طهي نحاسية', 'ساعة يد سويسرية', 'حلي فضية تقليدية', 'بخور عود فاخر',
  'شماغ فاخر', 'سوار ذهبي', 'عصا مشي مزخرفة', 'مروحة يدوية مطرزة', 'مصحف مزخرف',
  'مجلس جلوس عربي', 'شمعدان نحاسي', 'دلة قهوة عربية', 'سجاد صغير للسيارة', 'عطر المسك الأبيض',
  'حقيبة رجالية جلدية', 'جاكيت صوفي', 'عباية مطرزة بالذهب', 'عقد لؤلؤ طبيعي', 'حذاء نسائي مطرز'
];

const PRODUCTS_EN: string[] = [
  'Royal Oud Perfume', 'Luxury Handbag', 'Men Linen Shirt', 'Women Abaya', 'Gold Watch',
  'Premium Prayer Rug', 'Mother of Pearl Jewelry', 'Traditional Arab Thobe', 'Genuine Leather Shoes', 'Diamond Gold Necklace',
  'Luxury Silk Shawl', 'Arabic Tea Set', 'Amber Prayer Beads', 'Engraved Copper Pitcher', 'Persian Carpet',
  'Orange Blossom Perfume', 'Leather Travel Bag', 'Men Cashmere Suit', 'Embroidered Evening Gown', 'Turquoise Ring',
  'Silk Head Cover', 'Copper Cookware', 'Swiss Wristwatch', 'Traditional Silver Jewelry', 'Premium Oud Incense',
  'Luxury Keffiyeh', 'Gold Bracelet', 'Ornate Walking Cane', 'Embroidered Hand Fan', 'Ornate Quran',
  'Arabic Seating Majlis', 'Copper Candlestick', 'Arabic Coffee Dallah', 'Car Prayer Mat', 'White Musk Perfume',
  'Men Leather Briefcase', 'Wool Jacket', 'Gold-Embroidered Abaya', 'Natural Pearl Necklace', 'Embroidered Women Shoes'
];

const SELLERS = ['Noor Collection', 'Al-Rahman Store', 'Layali Boutique', 'Souk Al-Bahar', 'Desert Rose', 'Golden Sands', 'Oasis Treasures', 'Pearl Bazaar'];

const CATEGORIES = ['Perfumes', 'Fashion', 'Jewelry', 'Home', 'Traditional', 'Accessories'];

@Injectable({ providedIn: 'root' })
export class DataService {
  private _products: Product[] = [];
  private _orders: Order[] = [];
  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this._products = this.generateProducts();
    this._orders = this.generateOrders();
    this.initialized = true;
  }

  get products(): Product[] {
    if (!this.initialized) this.init();
    return this._products;
  }

  get orders(): Order[] {
    if (!this.initialized) this.init();
    return this._orders;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  private generateProducts(): Product[] {
    const imgs = [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      'https://images.unsplash.com/photo-1602874801006-4e6e9c4e3271?w=400',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400',
    ];
    return Array.from({ length: 40 }, (_, i) => ({
      id: `prod-${i + 1}`,
      nameAr: PRODUCTS_AR[i],
      nameEn: PRODUCTS_EN[i],
      price: Math.round((50 + Math.random() * 450) * 10) / 10,
      imageUrl: imgs[i % imgs.length],
      seller: SELLERS[i % SELLERS.length],
      category: CATEGORIES[i % CATEGORIES.length],
      rating: 3.5 + Math.random() * 1.5,
    }));
  }

  private generateOrders(): Order[] {
    const orders: Order[] = [];
    const now = new Date();
    const productIds = this._products.length ? this._products.map(p => p.id) : Array.from({ length: 40 }, (_, i) => `prod-${i + 1}`);

    for (let i = 0; i < 300; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

      const itemCount = 1 + Math.floor(Math.random() * 4);
      const selectedIds: string[] = [];
      for (let j = 0; j < itemCount; j++) {
        selectedIds.push(productIds[Math.floor(Math.random() * productIds.length)]);
      }

      const isAbandoned = Math.random() < 0.2;
      const total = Math.round((100 + Math.random() * 900) * 100) / 100;

      orders.push({
        id: `ord-${i + 1}`,
        productIds: selectedIds,
        total,
        date,
        status: isAbandoned ? 'abandoned' : 'completed',
        customerEmail: `customer${i}@example.com`,
      });
    }
    return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
