import mongoose from 'mongoose';
import Category from './src/models/category.model.js';
import Brand from './src/models/brand.model.js';
import Product from './src/models/product.model.js';
import User from './src/models/user.model.js';
import Discount from './src/models/discount.model.js';
import Comment from './src/models/comment.model.js';
import configs from './src/configs.js';

// Helper: Generate placeholder image URL
const getImageUrl = (category, id) => {
  const baseUrl = 'https://images.unsplash.com/photo-';
  const imageMap = {
    phone: ['1511707767522-2f041c0d48c7', '1610945415295-d9bbf067e59f', '1592286927505-fb5a7c5cf128'],
    laptop: ['1496181133206-80ce9b88a853', '1593642632823-8f785ba67e45', '1517336714731-489689fd1ca8'],
    tablet: ['1544244015-0df4b3ffc6b0', '1585790050230-5dd28404ccaa', '1611532736579-6b16e2b50449'],
    headphone: ['1505740420928-5e560c06d30e', '1545127398-14699f92334b', '1484704849700-f032a568e944'],
    smartwatch: ['1579586337278-3befd40fd17a', '1434494878577-86c23bcb06b9', '1557438159-51eec7a6c9e8'],
    charger: ['1625739218-fcb2e3a81e42', '1583394838336-acd977736f90', '1619683597354-d60c2c79e25f'],
    accessory: ['1572635196237-94b75f24ae59', '1612198188060-2fb153b79d33', '1531297484001-80022131f5a1']
  };

  const ids = imageMap[category] || imageMap.phone;
  const photoId = ids[id % ids.length];
  return `${baseUrl}${photoId}?w=500&h=500&fit=crop`;
};

// Connect to MongoDB
await mongoose.connect(configs.mongoUri);
console.log('✅ Connected to MongoDB\n');

// Clear existing data
console.log('🗑️  Clearing existing data...');
await Category.deleteMany({});
await Brand.deleteMany({});
await Product.deleteMany({});
await User.deleteMany({});
await Discount.deleteMany({});
await Comment.deleteMany({});
console.log('✅ Data cleared\n');

// ==================== SEED CATEGORIES ====================
console.log('📁 Seeding categories...');
const categories = await Category.insertMany([
  { name: 'Điện thoại', slug: 'dien-thoai', image: getImageUrl('phone', 0), isHide: false, countProduct: 0 },
  { name: 'Laptop', slug: 'laptop', image: getImageUrl('laptop', 0), isHide: false, countProduct: 0 },
  { name: 'Tablet', slug: 'tablet', image: getImageUrl('tablet', 0), isHide: false, countProduct: 0 },
  { name: 'Tai nghe', slug: 'tai-nghe', image: getImageUrl('headphone', 0), isHide: false, countProduct: 0 },
  { name: 'Đồng hồ thông minh', slug: 'dong-ho-thong-minh', image: getImageUrl('smartwatch', 0), isHide: false, countProduct: 0 },
  { name: 'Sạc & Cáp', slug: 'sac-cap', image: getImageUrl('charger', 0), isHide: false, countProduct: 0 },
]);
console.log(`✅ Created ${categories.length} categories\n`);

// Get category references
const [phoneCategory, laptopCategory, tabletCategory, headphoneCategory, smartwatchCategory, chargerCategory] = categories;

// ==================== SEED BRANDS ====================
console.log('🏷️  Seeding brands...');
const brands = await Brand.insertMany([
  { name: 'Apple', slug: 'apple', image: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
  { name: 'Samsung', slug: 'samsung', image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
  { name: 'Xiaomi', slug: 'xiaomi', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
  { name: 'OPPO', slug: 'oppo', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
  { name: 'Realme', slug: 'realme', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
  { name: 'Anker', slug: 'anker', image: 'https://images.unsplash.com/photo-1625739218-fcb2e3a81e42?w=200&h=200&fit=crop', isHide: false, countProduct: 0 },
]);
console.log(`✅ Created ${brands.length} brands\n`);

// Get brand references
const [appleBrand, samsungBrand, xiaomiBrand, oppoBrand, realmeBrand, ankerBrand] = brands;

// ==================== SEED USERS ====================
console.log('👥 Seeding users...');
const users = await User.insertMany([
  // Admin
  {
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@vanhshop.com',
    phone: '0901234567',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
    gender: 'male'
  },
  // Staff
  {
    firstName: 'Nhân Viên',
    lastName: 'Bán Hàng',
    email: 'staff@vanhshop.com',
    phone: '0902345678',
    password: 'Staff@123',
    role: 'staff',
    status: 'active',
    gender: 'female'
  },
  // Customers
  {
    firstName: 'Nguyễn Văn',
    lastName: 'Anh',
    email: 'nguyenvana@gmail.com',
    phone: '0903456789',
    password: 'Customer@123',
    role: 'customer',
    status: 'active',
    gender: 'male'
  },
  {
    firstName: 'Trần Thị',
    lastName: 'Bình',
    email: 'tranthib@gmail.com',
    phone: '0904567890',
    password: 'Customer@123',
    role: 'customer',
    status: 'active',
    gender: 'female'
  },
  {
    firstName: 'Lê Minh',
    lastName: 'Châu',
    email: 'leminhc@gmail.com',
    phone: '0905678901',
    password: 'Customer@123',
    role: 'customer',
    status: 'active',
    gender: 'male'
  }
]);
console.log(`✅ Created ${users.length} users\n`);

// Get user references
const [adminUser, staffUser, customer1, customer2, customer3] = users;

// ==================== SEED PRODUCTS ====================
console.log('📱 Seeding products (this may take a while)...');

const productData = [
  // PHONES
  { name: 'iPhone 15 Pro Max', desc: '<h3>Titan cao cấp</h3><p>Chip A17 Pro flagship</p>', category: phoneCategory._id, brand: appleBrand._id, tags: ['flagship', '5G'], warrantyPeriod: 12, origin: 'Trung Quốc', overSpecs: [{ name: 'Màn hình', values: ['6.7 inch', '120Hz'] }], variants: [{ sku: 'IP15PM-256', variantName: '256GB', price: 29990000, marketPrice: 34990000, quantity: 50, sold: 15, thumbnail: getImageUrl('phone', 0), pictures: [] }], views: 1250, isHide: false },
  { name: 'Samsung Galaxy S24 Ultra', desc: '<h3>AI thông minh</h3><p>Camera 200MP</p>', category: phoneCategory._id, brand: samsungBrand._id, tags: ['flagship', 'AI'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Camera', values: ['200MP'] }], variants: [{ sku: 'S24U-256', variantName: '256GB', price: 27990000, marketPrice: 31990000, quantity: 60, sold: 25, thumbnail: getImageUrl('phone', 1), pictures: [] }], views: 980, isHide: false },
  { name: 'Xiaomi 14', desc: '<h3>Camera Leica</h3><p>Snapdragon 8 Gen 3</p>', category: phoneCategory._id, brand: xiaomiBrand._id, tags: ['flagship'], warrantyPeriod: 18, origin: 'Trung Quốc', overSpecs: [{ name: 'Chip', values: ['SD 8 Gen 3'] }], variants: [{ sku: 'MI14-256', variantName: '256GB', price: 19990000, marketPrice: 22990000, quantity: 55, sold: 22, thumbnail: getImageUrl('phone', 2), pictures: [] }], views: 680, isHide: false },
  { name: 'Samsung Galaxy A55 5G', desc: '<h3>Mid-range</h3><p>Camera OIS</p>', category: phoneCategory._id, brand: samsungBrand._id, tags: ['mid-range'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Camera', values: ['50MP OIS'] }], variants: [{ sku: 'A55-128', variantName: '128GB', price: 9490000, marketPrice: 10990000, quantity: 100, sold: 45, thumbnail: getImageUrl('phone', 0), pictures: [] }], views: 1580, isHide: false },
  { name: 'Xiaomi Redmi Note 13 Pro', desc: '<h3>Camera 200MP</h3><p>Sạc 67W</p>', category: phoneCategory._id, brand: xiaomiBrand._id, tags: ['budget'], warrantyPeriod: 18, origin: 'Việt Nam', overSpecs: [{ name: 'Camera', values: ['200MP'] }], variants: [{ sku: 'RN13P-256', variantName: '256GB', price: 7490000, marketPrice: 8990000, quantity: 150, sold: 78, thumbnail: getImageUrl('phone', 1), pictures: [] }], views: 2150, isHide: false },
  { name: 'OPPO A79 5G', desc: '<h3>5G giá rẻ</h3><p>Pin 5000mAh</p>', category: phoneCategory._id, brand: oppoBrand._id, tags: ['budget'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Pin', values: ['5000mAh'] }], variants: [{ sku: 'A79-128', variantName: '128GB', price: 5990000, marketPrice: 6990000, quantity: 100, sold: 48, thumbnail: getImageUrl('phone', 2), pictures: [] }], views: 1240, isHide: false },
  { name: 'Realme C55', desc: '<h3>Pin trâu</h3><p>Sạc 33W</p>', category: phoneCategory._id, brand: realmeBrand._id, tags: ['entry'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Pin', values: ['5000mAh'] }], variants: [{ sku: 'RMC55-128', variantName: '128GB', price: 4490000, marketPrice: 5490000, quantity: 200, sold: 120, thumbnail: getImageUrl('phone', 0), pictures: [] }], views: 3120, isHide: false },

  // TABLETS
  { name: 'iPad Pro M2 11 inch', desc: '<h3>Chip M2</h3><p>Liquid Retina</p>', category: tabletCategory._id, brand: appleBrand._id, tags: ['flagship'], warrantyPeriod: 12, origin: 'Trung Quốc', overSpecs: [{ name: 'Chip', values: ['M2'] }], variants: [{ sku: 'IPADP-128', variantName: '128GB', price: 21990000, marketPrice: 24990000, quantity: 30, sold: 8, thumbnail: getImageUrl('tablet', 0), pictures: [] }], views: 520, isHide: false },
  { name: 'Samsung Galaxy Tab S9', desc: '<h3>AMOLED</h3><p>S Pen</p>', category: tabletCategory._id, brand: samsungBrand._id, tags: ['flagship'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Màn hình', values: ['AMOLED'] }], variants: [{ sku: 'TABS9-128', variantName: '128GB', price: 16990000, marketPrice: 18990000, quantity: 25, sold: 6, thumbnail: getImageUrl('tablet', 1), pictures: [] }], views: 380, isHide: false },
  { name: 'Xiaomi Pad 6', desc: '<h3>Giải trí</h3><p>144Hz</p>', category: tabletCategory._id, brand: xiaomiBrand._id, tags: ['mid-range'], warrantyPeriod: 18, origin: 'Trung Quốc', overSpecs: [{ name: 'Màn hình', values: ['144Hz'] }], variants: [{ sku: 'MIPAD6-128', variantName: '128GB', price: 7990000, marketPrice: 9490000, quantity: 40, sold: 12, thumbnail: getImageUrl('tablet', 2), pictures: [] }], views: 560, isHide: false },

  // HEADPHONES
  { name: 'AirPods Pro 2', desc: '<h3>ANC</h3><p>Chip H2</p>', category: headphoneCategory._id, brand: appleBrand._id, tags: ['premium'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Tính năng', values: ['ANC'] }], variants: [{ sku: 'APP2-USB', variantName: 'USB-C', price: 5990000, marketPrice: 6990000, quantity: 80, sold: 35, thumbnail: getImageUrl('headphone', 0), pictures: [] }], views: 1120, isHide: false },
  { name: 'Samsung Galaxy Buds2 Pro', desc: '<h3>Hi-Fi</h3><p>ANC</p>', category: headphoneCategory._id, brand: samsungBrand._id, tags: ['premium'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Tính năng', values: ['ANC'] }], variants: [{ sku: 'GB2P-BLK', variantName: 'Đen', price: 3490000, marketPrice: 4990000, quantity: 60, sold: 22, thumbnail: getImageUrl('headphone', 1), pictures: [] }], views: 680, isHide: false },

  // SMARTWATCHES
  { name: 'Apple Watch Series 9', desc: '<h3>Chip S9</h3><p>Always-On</p>', category: smartwatchCategory._id, brand: appleBrand._id, tags: ['premium'], warrantyPeriod: 12, origin: 'Trung Quốc', overSpecs: [{ name: 'Màn hình', values: ['Always-On'] }], variants: [{ sku: 'AW9-41', variantName: '41mm', price: 10990000, marketPrice: 12990000, quantity: 40, sold: 15, thumbnail: getImageUrl('smartwatch', 0), pictures: [] }], views: 780, isHide: false },
  { name: 'Samsung Galaxy Watch6', desc: '<h3>Sức khỏe</h3><p>ECG</p>', category: smartwatchCategory._id, brand: samsungBrand._id, tags: ['health'], warrantyPeriod: 12, origin: 'Việt Nam', overSpecs: [{ name: 'Tính năng', values: ['ECG'] }], variants: [{ sku: 'GW6-40', variantName: '40mm', price: 5990000, marketPrice: 7490000, quantity: 35, sold: 10, thumbnail: getImageUrl('smartwatch', 1), pictures: [] }], views: 520, isHide: false },

  // CHARGERS
  { name: 'Anker PowerPort III 20W', desc: '<h3>Sạc nhanh</h3><p>PD 3.0</p>', category: chargerCategory._id, brand: ankerBrand._id, tags: ['fast-charge'], warrantyPeriod: 18, origin: 'Trung Quốc', overSpecs: [{ name: 'Công suất', values: ['20W'] }], variants: [{ sku: 'ANK-20W', variantName: 'Trắng', price: 390000, marketPrice: 490000, quantity: 200, sold: 85, thumbnail: getImageUrl('charger', 0), pictures: [] }], views: 1580, isHide: false },
  { name: 'Cáp Anker USB-C to Lightning', desc: '<h3>MFi</h3><p>Bền bỉ</p>', category: chargerCategory._id, brand: ankerBrand._id, tags: ['cable'], warrantyPeriod: 18, origin: 'Trung Quốc', overSpecs: [{ name: 'Độ dài', values: ['1m'] }], variants: [{ sku: 'ANK-C2L', variantName: '1m', price: 290000, marketPrice: 390000, quantity: 300, sold: 145, thumbnail: getImageUrl('charger', 1), pictures: [] }], views: 2240, isHide: false }
];

// Insert products one by one to trigger slug generation
const products = [];
for (const data of productData) {
  const product = await Product.create(data);
  products.push(product);
}
console.log(`✅ Created ${products.length} products\n`);

// ==================== SEED DISCOUNTS/VOUCHERS ====================
console.log('🎫 Seeding discounts...');
const now = new Date();
const discountData = [
  { name: 'Giảm 500K cho đơn từ 10 triệu', code: 'GIAM500K', desc: 'Voucher cao cấp', beginDate: now, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), quantity: 100, unlimitedQty: false, discount: 500000, discountType: 'price', minimumTotal: 10000000, maximumApplied: 500000, isHide: false },
  { name: 'Giảm 10% tối đa 300K', code: 'GIAM10', desc: 'Giảm 10%', beginDate: now, endDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000), quantity: 200, unlimitedQty: false, discount: 10, discountType: 'percent', minimumTotal: 2000000, maximumApplied: 300000, isHide: false },
  { name: 'Freeship toàn quốc', code: 'FREESHIP', desc: 'Miễn phí ship', beginDate: now, endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), quantity: 0, unlimitedQty: true, discount: 30000, discountType: 'price', minimumTotal: 500000, maximumApplied: 30000, isHide: false },
  { name: 'Giảm 5% không giới hạn', code: 'SALE5', desc: 'Khách thân thiết', beginDate: now, endDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000), quantity: 0, unlimitedQty: true, discount: 5, discountType: 'percent', minimumTotal: 1000000, maximumApplied: 200000, isHide: false },
  { name: 'Mừng năm mới - Giảm 20%', code: 'NEWYEAR', desc: 'Năm mới', beginDate: now, endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), quantity: 50, unlimitedQty: false, discount: 20, discountType: 'percent', minimumTotal: 5000000, maximumApplied: 1000000, isHide: false }
];

// Insert discounts one by one to trigger slug generation
const discounts = [];
for (const data of discountData) {
  const discount = await Discount.create(data);
  discounts.push(discount);
}
console.log(`✅ Created ${discounts.length} discounts\n`);

// ==================== SEED COMMENTS ====================
console.log('💬 Seeding comments...');
const comments = await Comment.insertMany([
  { user: customer1._id, product: products[0]._id, content: 'Sản phẩm rất tốt, giao hàng nhanh!', star: 5 },
  { user: customer2._id, product: products[0]._id, content: 'iPhone 15 Pro Max siêu đẹp, camera cực nét', star: 5 },
  { user: customer3._id, product: products[1]._id, content: 'S24 Ultra pin trâu, S Pen tiện lợi', star: 5 },
  { user: customer1._id, product: products[4]._id, content: 'Redmi Note 13 Pro giá rẻ mà camera 200MP quá ngon', star: 5 },
  { user: customer2._id, product: products[6]._id, content: 'Realme C55 giá sinh viên, pin trâu', star: 4 }
]);
console.log(`✅ Created ${comments.length} comments\n`);

// ==================== UPDATE COUNTS ====================
console.log('🔄 Updating product counts...');
const categoryCounts = {};
const brandCounts = {};

products.forEach(p => {
  const catId = p.category.toString();
  const brandId = p.brand.toString();
  categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
  brandCounts[brandId] = (brandCounts[brandId] || 0) + 1;
});

for (const [catId, count] of Object.entries(categoryCounts)) {
  await Category.findByIdAndUpdate(catId, { countProduct: count });
}

for (const [brandId, count] of Object.entries(brandCounts)) {
  await Brand.findByIdAndUpdate(brandId, { countProduct: count });
}

console.log('');
console.log('═'.repeat(70));
console.log('🎉 SEED COMPLETED SUCCESSFULLY!');
console.log('═'.repeat(70));
console.log('📊 Summary:');
console.log(`   📁 Categories: ${categories.length}`);
console.log(`   🏷️  Brands: ${brands.length}`);
console.log(`   📱 Products: ${products.length}`);
console.log(`   👥 Users: ${users.length} (Admin: 1, Staff: 1, Customers: ${users.length - 2})`);
console.log(`   🎫 Discounts: ${discounts.length}`);
console.log(`   💬 Comments: ${comments.length}`);
console.log('');
console.log('📱 Products by category:');
for (const cat of categories) {
  const count = categoryCounts[cat._id.toString()] || 0;
  console.log(`   - ${cat.name.padEnd(20)} : ${count} products`);
}
console.log('');
console.log('🏷️  Products by brand:');
for (const brand of brands) {
  const count = brandCounts[brand._id.toString()] || 0;
  console.log(`   - ${brand.name.padEnd(10)} : ${count} products`);
}
console.log('');
console.log('👤 Login Credentials:');
console.log('   Admin:    admin@vanhshop.com / Admin@123');
console.log('   Staff:    staff@vanhshop.com / Staff@123');
console.log('   Customer: nguyenvana@gmail.com / Customer@123');
console.log('');
console.log('🎫 Discount Codes:');
discounts.forEach(d => {
  const expiry = Math.ceil((d.endDate - now) / (24 * 60 * 60 * 1000));
  console.log(`   ${d.code.padEnd(15)} - ${d.name} (${expiry} ngày)`);
});
console.log('═'.repeat(70));
console.log('');

// Close connection
await mongoose.connection.close();
console.log('👋 Disconnected from MongoDB');
process.exit(0);
