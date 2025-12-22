# 🔐 Hướng dẫn Setup Google OAuth (Google Login)

## 📋 **Bước 1: Truy cập Google Cloud Console**

1. Mở trình duyệt và vào: **https://console.cloud.google.com/**
2. Đăng nhập bằng tài khoản Google của bạn

---

## 🎯 **Bước 2: Tạo hoặc chọn Project**

### **Nếu chưa có project:**

1. Click **"Select a project"** ở góc trên bên trái
2. Click **"NEW PROJECT"**
3. Nhập tên project (ví dụ: `vanh-shop`)
4. Click **"CREATE"**

### **Nếu đã có project:**

- Chọn project của bạn từ dropdown

---

## 🔑 **Bước 3: Enable Google+ API (nếu chưa có)**

1. Vào **"APIs & Services"** → **"Library"**
2. Tìm **"Google+ API"** hoặc **"Google Identity"**
3. Click **"ENABLE"**

---

## 🛠️ **Bước 4: Tạo OAuth 2.0 Client ID**

### **4.1. Vào Credentials:**

1. Ở menu bên trái, click **"Credentials"** (Thông tin xác thực)
2. Click **"+ CREATE CREDENTIALS"**
3. Chọn **"OAuth client ID"**

### **4.2. Configure Consent Screen (nếu chưa có):**

Nếu là lần đầu, bạn sẽ phải tạo OAuth consent screen:

1. Click **"CONFIGURE CONSENT SCREEN"**
2. Chọn **"External"** (cho phép bất kỳ ai đăng nhập)
3. Click **"CREATE"**
4. Điền thông tin:
   - **App name:** `Vanh Shop`
   - **User support email:** Email của bạn
   - **Developer contact:** Email của bạn
5. Click **"SAVE AND CONTINUE"** → **"SAVE AND CONTINUE"** → **"BACK TO DASHBOARD"**

### **4.3. Tạo OAuth Client ID:**

1. Quay lại **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Chọn **Application type:** **"Web application"**
4. Nhập **Name:** `Vanh Shop Web Client`
5. Trong **"Authorized JavaScript origins"**, click **"+ ADD URI"** và thêm:
   ```
   http://localhost:3000
   http://localhost:3001
   ```
6. Trong **"Authorized redirect URIs"**, click **"+ ADD URI"** và thêm:
   ```
   http://localhost:3000/auth/callback
   ```
7. Click **"CREATE"**

### **4.4. Lấy Client ID:**

Một popup sẽ hiện ra với:

- **Client ID**: `123456789-abc123def456.apps.googleusercontent.com`
- **Client secret**: `GOCSPX-abc123def456`

➡️ **Copy Client ID** này (bạn sẽ cần nó ở bước sau)

---

## 📝 **Bước 5: Cập nhật Client ID vào project**

### **Kiểm tra file client sử dụng Google Login:**

Thường file này sẽ nằm ở:

- `client/src/pages/auth/LoginPage.jsx` hoặc
- `client/src/components/GoogleLoginButton.jsx` hoặc
- Tìm file có `GoogleLogin` component

### **Cập nhật Client ID:**

**Option A: Dùng biến môi trường (Recommended)**

Thêm vào file `client/.env`:

```env
REACT_APP_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

**Option B: Hardcode trực tiếp (Not recommended)**

Tìm dòng có `clientId` trong code và thay thế bằng Client ID của bạn.

---

## ⚠️ **LƯU Ý QUAN TRỌNG:**

### **Về Client ID vs Client Secret:**

- ✅ **Client ID**: Public, có thể để trong code frontend
- ❌ **Client Secret**: Private, **KHÔNG BAO GIỜ** để trong frontend, chỉ dùng trong backend

### **Về Authorized Origins:**

- Development: `http://localhost:3000`
- Production: Thêm domain thật của bạn (ví dụ: `https://vanhshop.com`)

### **Testing sau khi setup:**

1. Restart React app (Ctrl+C → `npm start`)
2. Mở http://localhost:3000/auth/login
3. Click nút "Đăng nhập với Google"
4. Chọn tài khoản Google
5. Cho phép quyền truy cập
6. Đăng nhập thành công! 🎉

---

## 🔧 **Troubleshooting:**

### **Lỗi: "redirect_uri_mismatch"**

➡️ Kiểm tra lại **Authorized redirect URIs** trong Google Cloud Console

### **Lỗi: "origin_mismatch"**

➡️ Thêm `http://localhost:3000` vào **Authorized JavaScript origins**

### **Lỗi: "Access blocked"**

➡️ Kiểm tra OAuth consent screen đã được cấu hình chưa

---

## 📞 **Tài liệu tham khảo:**

- **Google Cloud Console:** https://console.cloud.google.com/
- **Google Identity Docs:** https://developers.google.com/identity/sign-in/web/sign-in
- **React Google Login:** https://www.npmjs.com/package/react-google-login

---

## ✅ **Checklist:**

- [ ] Tạo project trên Google Cloud Console
- [ ] Enable Google+ API / Google Identity
- [ ] Tạo OAuth 2.0 Client ID
- [ ] Thêm Authorized JavaScript origins: `http://localhost:3000`
- [ ] Thêm Authorized redirect URIs: `http://localhost:3000/auth/callback`
- [ ] Copy Client ID
- [ ] Cập nhật Client ID vào `client/.env` hoặc code
- [ ] Restart React app
- [ ] Test Google Login
