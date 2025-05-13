"use client";
import CustomTable from "./CustomTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Chart Data
const chartData = [
  { month: "January", revenue: 186 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
];

// ✅ Summary Table (Green Table)
const summaryData = [
  {
    totalRevenue: "₦12,090,009",
    propertySold: "25",
    avgRevenuePerSale: "₦483,600",
    commissionEarned: "₦1,200,000",
    pendingCommission: "₦627,790",
  },
];

const summaryColumns = [
  { header: "Total Revenue", accessor: "totalRevenue" },
  { header: "Property Sold", accessor: "propertySold" },
  { header: "Avg Revenue per Sale", accessor: "avgRevenuePerSale" },
  { header: "Commission Earned", accessor: "commissionEarned" },
  { header: "Pending Commission", accessor: "pendingCommission" },
];

// ✅ Sales Table (White Table)
const salesData = [
  {
    client: "Sodiq Nasichukwu",
    property: "Oak Villa",
    salesPrice: "₦12,000,000",
    paid: "₦9,200,000",
    outstanding: "₦2,800,000",
    commission: "₦250,000",
  },
  {
    client: "Tolu Emmanuel",
    property: "Palm Grove",
    salesPrice: "₦8,500,000",
    paid: "₦8,000,000",
    outstanding: "₦500,000",
    commission: "₦180,000",
  },
  {
    client: "Chioma Duru",
    property: "Maple Estate",
    salesPrice: "₦14,000,000",
    paid: "₦13,000,000",
    outstanding: "₦1,000,000",
    commission: "₦300,000",
  },
  {
    client: "Ahmed Bako",
    property: "Sunset Hills",
    salesPrice: "₦10,000,000",
    paid: "₦9,500,000",
    outstanding: "₦500,000",
    commission: "₦220,000",
  },
];

const salesColumns = [
  { header: "Client", accessor: "client" },
  { header: "Property", accessor: "property" },
  { header: "Sales Price", accessor: "salesPrice" },
  { header: "Paid", accessor: "paid" },
  { header: "Outstanding", accessor: "outstanding" },
  { header: "Commission", accessor: "commission" },
];

const RevenueOverview = () => {
  return (
    <div className="p-4 space-y-6">

      {/* Chart Section */}
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1FDBF4"
              strokeWidth={1}
              dot={false}
            />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickFormatter={(value) => `${value}m`} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Green Summary Table */}

      <CustomTable
        data={summaryData}
        columns={summaryColumns}
        columnTextColor="text-gray-500"
        rowTextColor="text-black"
        headerClassName="bg-[#CCDAD6] "
        rowClassName="bg-[#CCDAD6] "
        cellPaddingY="py-0"
        
      />
      {/* <CustomTable
  data={summaryData}
  columns={summaryColumns}
  headerClassName="bg-green-100 text-green-800 font-semibold"
  rowClassName="bg-green-50"
  showRowBorder={true}
  showRowIcon={true}
  roundedHeader={true}
  columnTextColor="text-green-700"
  rowTextColor="text-green-900"
/> */}


      {/* ✅ White Recent Sales Table */}
      <div>
        <h3 className="text-base font-semibold my-2">Recent Sales</h3>
        <CustomTable
          data={salesData}
          columns={salesColumns}
           columnTextColor="text-black"
          showRowBorder={true}
          roundedHeader={true}
          showRowIcon={true}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
          rowClassName="bg-white "
        />
      </div>
    </div>
  );
};

export default RevenueOverview;
