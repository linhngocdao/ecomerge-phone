# 🔥 Hướng dẫn Setup Firebase

## Bước 1: Truy cập Firebase Console
1. Mở https://console.firebase.google.com/
2. Đăng nhập bằng tài khoản Google
3. Tạo hoặc chọn project của bạn

## Bước 2: Tạo Service Account
1. Click ⚙️ → **Project settings** → Tab **Service accounts**
2. Chọn **Node.js**
3. Click **"Generate new private key"**
4. Click **"Generate key"** để tải file JSON

## Bước 3: Lấy thông tin từ file JSON
File JSON tải về sẽ có dạng:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  ...
}
```

## Bước 4: Cập nhật file `.env`

Copy các giá trị sau vào `.env`:

```env
# Từ "project_id"
FIREBASE_PROJECT_ID=your-project-id

# Từ "client_email"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Từ "private_key" (GIỮ NGUYÊN dấu ngoặc kép và \n)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...(rất dài)...BAQA\n-----END PRIVATE KEY-----\n"
```

## ⚠️ LƯU Ý QUAN TRỌNG:

### ✅ ĐÚNG:
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```
- Phải có dấu ngoặc kép
- Phải giữ nguyên \n
- Tất cả trên 1 dòng

### ❌ SAI:
```env
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEv...
-----END PRIVATE KEY-----
```
- Không xuống dòng trong .env
- Không bỏ dấu ngoặc kép

## Bước 5: Bảo mật
- ✅ File `.env` đã có trong `.gitignore` - KHÔNG commit lên Git
- ✅ Giữ file JSON đã tải về ở nơi an toàn
- ⚠️ KHÔNG share private key với ai

## Kiểm tra
Sau khi cấu hình, chạy server:
```bash
npm start
# hoặc
npm run dev
```

Nếu Firebase kết nối thành công, bạn sẽ không thấy lỗi liên quan đến Firebase.
