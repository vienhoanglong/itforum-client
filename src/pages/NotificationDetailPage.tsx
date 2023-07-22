import LayoutSecondary from "@/layout/LayoutSecondary";
import React from "react";
import { HiBell, HiChevronRight } from "react-icons/hi";

export const NotificationDetailPage: React.FC = () => {
  return (
    <LayoutSecondary>
      <div className=" shadow-sm flex dark:text-light0 space-x-1 items-center p-4 dark:bg-dark1 rounded-lg bg-light4">
        <HiBell></HiBell>
        <a
          href="/notifications"
          className=" cursor-pointer underline hover:text-mainColor"
        >
          Notification
        </a>
        <HiChevronRight></HiChevronRight>
        <a
          href="/notification-list"
          className=" cursor-pointer underline hover:text-mainColor"
        >
          Notification List
        </a>
        <HiChevronRight></HiChevronRight>
        <span>Notification Detail</span>
      </div>
      <div className=" bg-light4 p-8 dark:bg-dark1 mt-2 rounded-lg shadow-sm">
        <div className="flex justify-center items-center dark:text-light0 mt-4">
          <span className="text-center text-base font-bold">
            THÔNG BÁO NỘP HỌC PHÍ HỌC KỲ 3 NĂM HỌC 2022-2023 DÀNH CHO SINH VIÊN
            BẬC ĐẠI HỌC (TB 26/2023/PTC){" "}
          </span>
        </div>
        <div className="flex justify-between items-center space-x-1 dark:text-light0 mt-8">
          <a className="block cursor-pointer hover:underline hover:text-mainColor px-1 text-[10px] bg-teal0 rounded-full">
            Môn học
          </a>
          <div className="flex justify-center items-center space-x-1">
            <span className="block">Admin</span>
            <span className="block">| Ngày đăng: 22/07/2023</span>
          </div>
        </div>
        <div className="dark:text-light0 mt-8 leading-normal">
          <p>
            Căn cứ theo kế hoạch năm học 2022-2023 đã được Ban giám hiệu phê
            duyệt, Phòng Tài chính thông báo thời gian thu học phí cho học kỳ 3
            năm học 2022-2023 như sau:
          </p>
          <p>
            <b>A. Đối tượng:</b>
          </p>
          <p>
            sau 02 ngày kể từ ngày sinh viên nộp học phí, sinh viên đăng nhập
            vào "Cổng thông tin sinh viên" chọn mục "Học phí" chọn “Học kỳ 3 năm
            học 2022-2023” để kiểm tra đối chiếu số tiền học phí đã nộp và phản
            hồi cho Phòng Tài chính bằng cách gửi email về địa chỉ
            tuition@tdtu.edu.vn nếu có sai sót hoặc trường hợp đã nộp học phí
            nhưng không được cập nhật lên hệ thống (Vui lòng kiểm tra học phí
            trong thời gian theo thông báo trước khi tiến hành gửi email).
          </p>
          <p className=" indent-8">
            1. Sinh viên khi đóng học phí phải kiểm tra các môn học đã có kết
            quả đăng ký thành công trong HK3/2022-2023 và đối chiếu số tiền
            trong phân hệ học phí, sinh viên xem phần ghi chú để môn học nào đã
            tính học phí, môn học nào chưa được tính học phí (đang chờ xét). Nếu
            có thắc mắc vui lòng gửi email về Tổ học phí: tuition@tdtu.edu.vn để
            kiểm tra đối chiếu.
          </p>

          <p className=" indent-8">
            2. Đối với trường hợp sinh viên chưa hoàn thành học phí học kỳ
            2/2022-2023 và học kỳ dự thính 2/2022-2023. Nhà Trường sẽ tiến hành
            kết chuyển phần dư nợ học phí của học kỳ 2/2022-2023, dự thính
            2/2022-2023 sang học kỳ 3/2022-2023. Sinh viên có trách nhiệm hoàn
            thành số tiền học phí phải nộp của học kỳ 3/2022-2023 để đảm bảo các
            quyền lợi học và thi theo quy định của Nhà Trường. Các trường hợp bị
            xử lý điểm F ở các học kỳ 2 và dự thính 2/2022-2023, Nhà Trường đã
            chốt dữ liệu và không xem xét thêm.
          </p>

          <p className=" indent-8">
            3. Sinh viên không hoàn thành nghĩa vụ học phí học kỳ 3/2022-2023;
            không nộp học phí đúng thời gian trong thông báo; không thực hiện
            đối chiếu và phản hồi đúng thời gian quy định ở mục F khi có sai sót
            trong quá trình thực hiện nộp tiền dẫn đến học phí không được cập
            nhật lên hệ thống,.. sẽ không đủ điều kiện tham gia đánh giá điểm
            quá trình, giữa kỳ và cuối kỳ cho các môn học của học kỳ 3/2022-2023
          </p>

          <p className=" indent-8">
            4. Đối với các môn học đã được thông báo nộp học phí trong đợt thu
            từ ngày 3/7/2023 đến ngày 7/7/2023, nếu sinh viên chưa hoàn thành
            học phí, Nhà Trường sẽ thực hiện xử lý theo quy định.
          </p>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default NotificationDetailPage;
