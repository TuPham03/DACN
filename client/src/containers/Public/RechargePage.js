import React, { useState } from "react";
import transferIcon from "../../assets/icons/transfer-icon.png";
import atmCardIcon from "../../assets/icons/atm-card.png";
import visaIcon from "../../assets/icons/visa.png";
import momoPayIcon from "../../assets/icons/momopay.png";
import zaloPayIcon from "../../assets/icons/zalopay.png";
import qrCodeIcon from "../../assets/icons/qr-code.png";

const RechargePage = () => {
  const [activeTab, setActiveTab] = useState("recharge");
  const [selectedAmount, setSelectedAmount] = useState(""); // Số tiền người dùng nhập
  const [selectedMethod, setSelectedMethod] = useState(null); // Phương thức thanh toán được chọn

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 50000 || value === "") {
      setSelectedAmount(value);
    }
  };

  const handleConfirm = () => {
    if (!selectedAmount || selectedAmount < 50000) {
      alert("Vui lòng nhập số tiền hợp lệ (tối thiểu 50,000 VND).");
      return;
    }
    if (!selectedMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    alert(
      `Xác nhận thanh toán: \n- Số tiền: ${parseInt(
        selectedAmount
      ).toLocaleString("vi-VN")} VND\n- Phương thức: ${
        selectedMethod.name
      }`
    );
  };

  const paymentMethods = [
    { id: 1, name: "Chuyển khoản", icon: transferIcon },
    { id: 2, name: "Thẻ ATM nội địa", icon: atmCardIcon },
    { id: 3, name: "Thẻ quốc tế", icon: visaIcon },
    { id: 4, name: "Ví điện tử MOMO", icon: momoPayIcon },
    { id: 5, name: "Ví điện tử ZALOPAY", icon: zaloPayIcon },
    { id: 6, name: "Quét mã QR Code", icon: qrCodeIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Quản lý giao dịch</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => handleTabChange("recharge")}
          className={`px-4 py-2 font-medium ${
            activeTab === "recharge"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500"
          }`}
        >
          Nạp tiền vào tài khoản
        </button>
        <button
          onClick={() => handleTabChange("history-recharge")}
          className={`px-4 py-2 font-medium ${
            activeTab === "history-recharge"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500"
          }`}
        >
          Lịch sử nạp tiền
        </button>
        <button
          onClick={() => handleTabChange("history-payment")}
          className={`px-4 py-2 font-medium ${
            activeTab === "history-payment"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500"
          }`}
        >
          Lịch sử thanh toán
        </button>
      </div>

      {/* Content */}
      {activeTab === "recharge" && (
        <div>
          {/* Banner ưu đãi */}
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-bold">Đối với tài khoản mới đăng kí</h2>
            <p className="mb-2">
              Tặng thêm <span className="font-bold">+50%</span> cho lần nạp đầu
              tiên tối thiểu 100.000đ trong vòng 5 ngày sau khi đăng ký tài
              khoản.
            </p>
            <p>Ưu đãi nạp tiền:</p>
            <ul className="list-disc ml-5">
              <li>Nạp từ 50.000 đến dưới 1.000.000 tặng 10%</li>
              <li>Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</li>
              <li>Nạp từ 2.000.000 trở lên tặng 25%</li>
            </ul>
          </div>

          {/* Nhập số tiền */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Nhập số tiền cần nạp</h2>
            <input
              type="number"
              min="50000"
              step="10000"
              placeholder="Nhập số tiền (tối thiểu 50,000)"
              value={selectedAmount}
              onChange={handleAmountChange}
              className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2 text-sm text-gray-500">
              Số tiền bạn nhập:{" "}
              <span className="text-blue-700 font-semibold">
                {selectedAmount
                  ? `${parseInt(selectedAmount).toLocaleString("vi-VN")} VND`
                  : "0 VND"}
              </span>
            </div>
          </div>

          {/* Danh sách phương thức nạp tiền */}
          <div>
            <h2 className="text-lg font-bold mb-4">
              Chọn phương thức nạp tiền
            </h2>
            <ul className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method) => (
                <li
                  key={method.id}
                  onClick={() => setSelectedMethod(method)}
                  className={`flex items-center p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    selectedMethod?.id === method.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="w-10 h-10 mr-4"
                  />
                  <span>{method.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nút xác nhận */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      )}

      {activeTab === "history-recharge" && (
        <div>Lịch sử nạp tiền sẽ được hiển thị tại đây.</div>
      )}
      {activeTab === "history-payment" && (
        <div>Lịch sử thanh toán sẽ được hiển thị tại đây.</div>
      )}
    </div>
  );
};

export default RechargePage;
