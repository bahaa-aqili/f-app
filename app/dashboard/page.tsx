"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// --- Data Samples ---
const revenueData = [
  { name: "01", current: 400, last: 240 },
  { name: "02", current: 300, last: 139 },
  { name: "03", current: 200, last: 980 },
  { name: "04", current: 278, last: 390 },
  { name: "05", current: 189, last: 480 },
  { name: "06", current: 239, last: 380 },
  { name: "07", current: 349, last: 430 },
  { name: "08", current: 349, last: 430 },
  { name: "09", current: 349, last: 430 },
  { name: "10", current: 349, last: 430 },
  { name: "11", current: 349, last: 430 },
  { name: "12", current: 349, last: 430 },
];

const orderTimeData = [
  { name: "Afternoon", value: 40, color: "#5D5FEF" },
  { name: "Evening", value: 32, color: "#8884d8" },
  { name: "Morning", value: 28, color: "#D1D5DB" },
];

const orderLineData = [
  { name: "01", current: 20, last: 40 },
  { name: "02", current: 15, last: 35 },
  { name: "03", current: 45, last: 30 },
  { name: "04", current: 40, last: 50 },
  { name: "05", current: 30, last: 40 },
  { name: "06", current: 70, last: 45 },
];

const foodItems = [
  { name: "Fresh Salad Bowl", price: "IDR 45.000", img: "🥗" },
  { name: "Chicken Noodles", price: "IDR 75.000", img: "🍜" },
  { name: "Smoothie Fruits", price: "IDR 45.000", img: "🥤" },
  { name: "Hot Chicken Wings", price: "IDR 45.000", img: "🍗" },
];

// --- Components ---

const CardHeader = ({
  title,
  subtitle,
  showBtn = true,
}: {
  title: string;
  subtitle?: string;
  showBtn?: boolean;
}) => (
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-gray-800 font-bold text-lg">{title}</h3>
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
    </div>
    {showBtn && (
      <button className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-xs font-medium">
        View Report
      </button>
    )}
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Section */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-300">
          <CardHeader title="Revenue" subtitle="Sales from 1-12 Dec, 2020" />
          <div className="mb-4">
            <span className="text-2xl font-bold block">IDR 7.852.000</span>
            <span className="text-green-500 text-sm flex items-center gap-1">
              <ArrowUpRight size={16} /> 2.1%{" "}
              <span className="text-gray-400 font-normal">vs last week</span>
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="current"
                  fill="#5D5FEF"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="last"
                  fill="#E5E7EB"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#5D5FEF]"></span> Last 6
              days
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-200"></span> Last
              Week
            </div>
          </div>
        </div>

        {/* Order Time (Pie) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-300">
          <CardHeader title="Order Time" subtitle="From 1-6 Dec, 2020" />
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderTimeData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Tooltip Overlay Mockup */}
            <div className="absolute top-1/4 right-0 bg-slate-800 text-white p-3 rounded-lg text-xs shadow-xl">
              <p className="opacity-70">Afternoon</p>
              <p>1pm - 4pm</p>
              <p className="font-bold mt-1">1.890 orders</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            {orderTimeData.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>{" "}
                  {item.name}
                </div>
                <div className="font-bold text-sm">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Ordered Food */}
        <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-300">
          <CardHeader
            title="Most Ordered Food"
            subtitle="Adipiscing elit, sed do eiusmod tempor"
            showBtn={false}
          />
          <div className="space-y-4 mt-6">
            {foodItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl shadow-sm">
                    {item.img}
                  </div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-400 group-hover:text-gray-800">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order (Line Chart) */}
        <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-300">
          <CardHeader title="Order" subtitle="Sales from 1-6 Dec, 2020" />
          <div className="mb-4">
            <span className="text-2xl font-bold block">2.568</span>
            <span className="text-red-500 text-sm flex items-center gap-1">
              <ArrowDownRight size={16} /> 2.1%{" "}
              <span className="text-gray-400 font-normal">vs last week</span>
            </span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderLineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#5D5FEF"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="last"
                  stroke="#E5E7EB"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#5D5FEF]"></span> Last 6
              days
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-200"></span> Last
              Week
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
