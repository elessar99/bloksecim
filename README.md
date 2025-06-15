# 🔐 bloksecim

“bloksecim”, blokzincir teknolojisini kullanarak şeffaf ve güvenli oylama süreçleri oluşturmayı hedefleyen açık kaynak bir projedir.

## 🚀 Özellikler

- **Blokzincir tabanlı oy verme**: Oyların merkeziyetsiz ve değiştirilemez bir ortamda tutulması  
- **Akıllı kontratlar** ile otomatik oy sayımı ve doğrulama  
- **Frontend arayüzü** sayesinde kullanıcı dostu seçim katılımı  
- **Node.js backend** ile kullanıcı yönetimi ve veri güvenliği  
  
## 🧰 Teknolojiler

- **Solidity** – Akıllı kontratlar  
- **JavaScript / React** – Web arayüzü  
- **Node.js / Express** – Backend servisi 
- **MongoDB** – Kullanıcı verileri için NoSQL veritabanı
- **json-server** – Sahte API verisi simülasyonu
  

## ⚙️ Kurulum & Çalıştırma

### MongoDB Kullanıcı Şeması

MongoDB veritabanında kullanıcı koleksiyonu aşağıdaki alanları içerir:

```json
{
  "username": "kullaniciadi",
  "password": "şifre",
  "email": "eposta",
  "categories": [],
  "pinList": []
}
```

### Backend

- cd /backend
- npm install
- npm start

### Frontend içindeki sjon server

- cd /frontend/api
- json-server --db.json

### Frontend

- cd /frontend
- npm install
- npm start
