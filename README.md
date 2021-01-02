# SE04-Nhom20.4   React Native App
*(app thương mại điện tử cho trang web noithat1h)*

---
## Mục lục
~~~
1. Giới thiệu
2. Đề tài
3. Mục tiêu
4. Thành phần của chương trình
5. Phân tích bài toán
6. Danh sách các chức năng của phần mềm
7. Kết quả đạt được

~~~

---

## Giới thiệu
### Công nghệ phần mềm - SE04-Nhom20.4. 
###### - Trường: Đại Học Khoa học Tự Nhiên - Đại học Quốc Gia Hà Nội.
###### - Khoa: Toán - Cơ - Tin học.
### Người hướng dẫn
###### - Thầy: [Bùi Sỹ Nguyên](https://www.facebook.com/nguyenbs).
###### - Anh: [Nguyễn Quan Tuấn](https://www.facebook.com/nguyenquan.tuan.5).

### Thành viên nhóm
###### 1) Nguyễn Huy Quang
###### 2) Mạc Văn Hiếu
###### 3) Vương Trọng Nghĩa
###### 4) Đinh Phương Nam
###### 5) Đàm Anh Hào
    
##  **Đề tài**
    Tìm hiểu lập trình React Native cho bài toán thương mại.
    
## **Mục tiêu**
    - Tìm hiểu và làm quen cấu trúc của React Native.
    - Áp dụng vào lập trình ứng dụng React Native cho bài toán thương mại cụ thể
    
## **Thành phần của chương trình**    
    - Các thành phần của chương trình:
        + Web API: xử lý Business logic cho web admin.
        + Web Admin: trang web quản lý các dữ liệu và tài khoản người dùng.
        + Ứng dụng di động React Native: dành cho đối tượng khách hàng.
    
## **Phân tích bài toán** 
    Đối với đối tượng là Admin trên nền web:
    - Để truy cập được vào trang web, phải có tài khoản đăng nhập để login/ logout.
    - Có thể xem, kiểm tra thông tin của các sản phẩm và của người sử dụng (user).
    - Thông tin về cat bao gồm: id, mã sản phẩm (Sku), giá, tên sản phẩm, link thân thiện, trích dẫn, mô tả chi tiết, hình ảnh minh hoạ.
    - Thông tin về user bao gồm: id, username (gmail), password, tên, địa chỉ, số điện thoại.
    - Admin có thể thêm, sửa, xoá thông tin của sản phẩm.
    - Có thể xem thông tin của các hoá đơn đã đặt.
    
    Đối với đối tượng user trên nền ứng dụng điện thoại
    - Xem, đặt hàng sản phẩm.
    - Điền thông tin thanh toán, bao gồm: họ tên, số điện thoại, địa chỉ nhận hàng, ghi chú 
    (tuỳ chọn).
    - Xem được thông tin hàng đã đặt thành công.
    
   ### Công nghệ sử dụng
    - Ngôn ngữ lập trình:
        1. Back-end: .Net Core 2.2 và GraphQL. --Link project(https://github.com/DarkW1llow/SE04-Nhom20.4-Backend-API)
            .NET Core là một nền tảng phát triển đa mục đích, mã nguồn mở được duy trì bởi Microsoft và cộng đồng .NET trên GitHub. 
            Đó là nền tảng chéo hỗ trợ Windows, macOS và Linux) và có thể được sử dụng để xây dựng các ứng dụng thiết bị, đám mây và IoT.
            - GraphQL là một Graph Query Language được dành cho API. Nó được phát triển bởi Facebook và hiện tại nó được duy trì bởi rất nhiều công ty lớn, 
            và mọi cá nhân trên khắp thế giới. GraphQL từ khi ra đời đã gần như thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất nhiều.
            
        2. Front-end (Web admin): ReactJS. --Link project(https://github.com/DarkW1llow/SE04-Nhom20.4-Frontend-Adminv2)
          React.js là một thư viện Javascript đang nổi lên trong những năm gần đây với xu hướng Single Page Application. 
          Trong khi những framework khác cố gắng hướng đến một mô hình MVC hoàn thiện thì React nổi bật với sự đơn giản và dễ dàng phối hợp với những thư viện Javascript khác.
          Nếu như AngularJS là một Framework cho phép nhúng code javasscript trong code html thông qua các attribute như ng-model, ng-repeat...
          thì với react là một library cho phép nhúng code html trong code javascript nhờ vào JSX, 
          bạn có thể dễ dàng lồng các đoạn HTML vào trong JS.Tích hợp giữa javascript và HTML vào trong JSX làm cho các component dễ hiểu hơn
          
        3. Framework: React Native. --Link project(https://github.com/DarkW1llow/SE04-Nhom20.4-Frontend-MoblieApp)
            React Native là một framework do công ty công nghệ nổi tiếng Facebook phát triển 
        nhằm mục đích giải quyết bài toán hiệu năng của Hybrid và bài toán chi phí khi mà phải
        viết nhiều loại ngôn ngữ native cho từng nền tảng di động. Chúng ta sẽ build được 
        ứng dụng Native đó một cách đa nền tảng (multi-platform) chạy được cả hai hệ sinh thái
        iOS hay Android.
    
## **Danh sách các chức năng của phần mềm**
    - Đối với web admin:
        1. Đăng nhập: sử dụng tài khoản (email và password đã cấp) để đăng nhập. 
            * Hệ thống kiểm tra thông tin đăng nhập:
                - Bắt buộc phải nhập đầy đủ các trường.
                - Chỉ đăng nhập được với tài khoản đã được cấp.
            * Sau khi bấm Login: nếu tài khoản đăng nhập đúng thì chuyển sang trang tiếp theo
        2. Thao tác với trang thông tin sản phẩm:
            * Admin có quyền xem, tạo mới, sửa hoặc xoá thông tin sản phẩm.
        3. Thao tác trên trang order:
            * Xem thông tin hoá đơn thanh mua thành công của khách hàng
            * Không có quyền thêm, sửa, xoá các bill.
        4. Logout: thoát khỏi tài khoản sau khi hoàn tất các thao tác quản lý.
        
    - Đối với ứng dụng di động:
        1. Hiển thị danh sách sản phẩm:
            * Sau khi đăng nhập thành công, danh sách về các sản phẩm được hiển thị, 
        2. Hiển thị thông tin chi tiết sản phẩm:
            * Chi tiết sản phẩm bao gồm tên, xuất xứ, giống , nguồn gốc xuất xứ, giá tiền, ...
        3. Thông tin thanh toán:
            * KH chọn mua sản phẩm, nhập các thông tin các nhân bao gồm tên, địa chỉ, số điện thoại,
            để tiến hành thanh toán.
            * Xác nhận mua thành công, hiển thị lịch sử mua hàng cho người dùng. 
        4. Có thể tiếp tục mua mặt hàng khác sau khi mua xong

## **Kết quả đạt được**
    - Website admin đã đáp ứng được yêu cầu cơ bản của người dùng với các chức năng: hiển thị thông tin 
    tài khoản user, tài khoản admin, hiển thị thông tin danh sách các sản phẩm và hoá đơn người mua.
    Danh sách sản phẩm có thể được thay đổi bao gồm thêm, sửa, xoá. 
    - Ứng dụng trên điện thoại di dộng đáp ứng được yêu cầu ban đầu, giao diện bắt mắt, các thoa tác gần như hoàn chỉnh như một ứng dụng
    thương mại thông thường. Dữ liệu được quản lý rõ ràng, Các luồng xử lý hoạt động ổn định, đảm bảo 
    các chức năng hoạt động dễ dàng, không gây bất tiện cho người sử dụng. Việc giao tiếp giữa các
    tầng cơ bản ổn định, cơ sở dữ liệu nhất quán, dữ liệu được thao tác. Giao diện rõ ràng, dễ sử dụng.



####  **React Native App** 


####  **ReactJS**


####  **.Net Core and GraphQL**


####  **Database MySQL**

---
##  *Tài liệu tham khảo*
1. *React Native (https://reactnative.dev/docs/getting-started)*
2. *.Net Core (https://docs.microsoft.com/vi-vn/dotnet/core/introduction)*
3. *ReactJS (https://reactjs.org/docs/getting-started.html)*
4. *GraphQL (https://graphql.org/)
