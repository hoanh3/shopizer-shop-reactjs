import React from "react";

const Dashboard = () => {
  const stats = [
    { label: "Tổng số người dùng", value: 1234 },
    { label: "Đơn hàng hôm nay", value: 56 },
    { label: "Doanh thu hôm nay", value: "12.345.000₫" },
    { label: "Sản phẩm hết hàng", value: 7 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trang Quản Trị - Dashboard</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              flex: "1 0 200px",
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <h4 style={{ margin: 0, fontSize: "16px", color: "#555" }}>{stat.label}</h4>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
