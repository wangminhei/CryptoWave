Chạy code : start.bat

### Tùy Chỉnh Script (Chỉnh Sửa Thông Tin Cố Định)

Nếu bạn muốn thay đổi một số thông tin mặc định trong script, hãy tìm và sửa các dòng tương ứng như sau:

| Nội dung muốn thay          | Vị trí chỉnh sửa trong code                                      | Hướng dẫn thay đổi                                      |
|-----------------------------|------------------------------------------------------------------|---------------------------------------------------------|
| **Mã giới thiệu (Referral)**| Tìm dòng: `const referralCode = 'EARNC43227';`                   | Thay `'EARNC43227'` thành mã referral của bạn           |
| **Mật khẩu tài khoản**      | Tìm dòng: `const password = 'Admin123';`                         | Thay `'Admin123'` thành mật khẩu bạn muốn sử dụng       |
| **Proxy**                   | Tìm object: <br>`const proxyConfig = { host: 'gw.dataimpulse.com', port: 824, username: '...', password: '...' };` | Thay toàn bộ `host`, `port`, `username`, `password` bằng thông tin proxy riêng của bạn (khuyến nghị để tăng tính an toàn và ổn định) |
| **Số lượng tài khoản tối đa**| Tìm dòng: `if (loopCount > 10)`                                  | Có thể tăng số `10` lên cao hơn, nhưng **không khuyến khích** vì dễ bị rate-limit hoặc block IP |

### Lưu Ý Quan Trọng

- Script hiện đang sử dụng **proxy chung** (có sẵn trong code). Để an toàn hơn và tránh bị chia sẻ traffic, bạn nên thay bằng **proxy riêng** (residential proxy hoặc proxy chất lượng cao).
- Việc tạo hàng loạt tài khoản có thể **vi phạm điều khoản dịch vụ** của CryptoWave. Hãy sử dụng ở mức hợp lý để tránh bị khóa tài khoản hoặc IP.
- Email tạm từ **generator.email** thường hết hạn nhanh, vì vậy hãy **đăng nhập tài khoản ngay sau khi script tạo xong**.
- Nếu gặp lỗi như **timeout**, **không điền được form**, hoặc đăng ký thất bại → có thể trang web đã thay đổi giao diện. Khi đó cần cập nhật lại các selector trong hàm `cryptowaveRegister` (phần nâng cao).

**Chúc bạn chạy script thành công và tạo được nhiều tài khoản như mong muốn!**  
Nếu gặp bất kỳ lỗi nào khi chạy, hãy chụp màn hình lỗi và gửi lại để mình hỗ trợ khắc phục nhé. 🚀
