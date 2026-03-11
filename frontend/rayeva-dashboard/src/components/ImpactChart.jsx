

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../api/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const BAR_COLORS = { plastic: "#00C49F", carbon: "#FF8042" };

export default function ImpactChart() {
  const [orders, setOrders] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then((res) => {
        setOrders(res.data);
        processMonthlyData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Total impact
  const totalPlastic = orders.reduce((acc, o) => acc + (Number(o.plasticSaved) || 0), 0);
  const totalCarbon = orders.reduce((acc, o) => acc + (Number(o.carbonSaved) || 0), 0);

  // Prepare data for PieChart
  const pieData = [
    { name: "Plastic Saved (kg)", value: totalPlastic },
    { name: "Carbon Reduced (kg CO₂)", value: totalCarbon },
  ];

  // Prepare monthly data for BarChart
  const processMonthlyData = (orders) => {
  const monthMap = {};

  orders.forEach((o) => {
    const date = new Date(o.createdAt);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthKey = `${date.getFullYear()}-${month}`;

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = {
        month: monthKey,
        plastic: 0,
        carbon: 0,
        orders: 0
      };
    }

    monthMap[monthKey].plastic += Number(o.plasticSaved) || 0;
    monthMap[monthKey].carbon += Number(o.carbonSaved) || 0;
    monthMap[monthKey].orders += 1;
  });

  const sortedData = Object.values(monthMap).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  setMonthlyData(sortedData);
};
  // PieChart label
  const renderCustomizedLabel = ({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
          <p className="font-bold">{name}</p>
          <p>{value.toLocaleString()} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="shadow-2xl p-6 rounded-xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white space-y-12">
      <h2 className="font-bold text-2xl text-center text-purple-400 mb-6">🌱 Sustainability Impact Dashboard</h2>

      {/* Pie Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-2 text-center text-green-400">Total Plastic vs Carbon Saved</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              label={renderCustomizedLabel}
              labelLine={true}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ transition: "all 0.3s" }} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-gray-300">
          Total Plastic Saved: <span className="font-semibold">{totalPlastic.toLocaleString()} kg</span> | Total Carbon Reduced: <span className="font-semibold">{totalCarbon.toLocaleString()} kg CO₂</span>
        </div>
      </div>

      {/* Bar Chart: Monthly Orders */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-2 text-center text-yellow-400">Monthly Orders & Sustainability Impact</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="orders" fill="#8884d8" name="Orders" />
            <Bar dataKey="plastic" fill={BAR_COLORS.plastic} name="Plastic Saved (kg)" />
            <Bar dataKey="carbon" fill={BAR_COLORS.carbon} name="Carbon Reduced (kg CO₂)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
