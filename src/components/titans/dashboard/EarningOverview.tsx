'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
    ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CustomTable from "./CustomTable";

const chartData = [
  { month: "Jan", sales: 20000, titans: 39900 },
  { month: "Feb", sales: 40000, titans: 49500 },
  { month: "Mar", sales: 60000, titans: 52000 },
  { month: "Apr", sales: 80000, titans: 46000 },
  {month: "May", sales: 100000, titans: 46000 },
  {month: "Jun", sales: 120000, titans: 46000 },
  {month: "Jul", sales: 140000, titans: 46000 },
  {month: "Aug", sales: 160000, titans: 46000 },
  {month: "Sep", sales: 180000, titans: 46000 },
  {month: "Oct", sales: 200000, titans: 46000 },
  {month: "Nov", sales: 220000, titans: 46000 },
  {month: "Dec", sales: 240000, titans: 46000 }

];

// Chart Data
// const chartData = [
//     { month: "January", revenue: 186 },
//     { month: "February", revenue: 305 },
//     { month: "March", revenue: 237 },
//     { month: "April", revenue: 73 },
//     { month: "May", revenue: 209 },
//     { month: "June", revenue: 214 },
//   ];
  
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
  
const chartConfig = {
  sales: {
    label: "Sales Commissions",
    color: "#1FDBF4", // cyan
  },
  titans: {
    label: "Commissions from Titans",
    color: "#9B5BF5", // purple
  },
} satisfies ChartConfig;

const EarningOverview = () =>{
    return(
        <>
   <ChartContainer config={chartConfig} className="w-full h-[180px]">
         <ResponsiveContainer width="100%" height="100%">
         <LineChart data={chartData}>
           <XAxis dataKey="month" />
           <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
           <Tooltip content={<ChartTooltipContent />} />
           <Line
             type="monotone"
             dataKey="sales"
             stroke="var(--color-sales)"
             strokeWidth={1}
             dot={false}
           />
           <Line
             type="monotone"
             dataKey="titans"
             stroke="var(--color-titans)"
             strokeWidth={1}
             dot={false}
           />
         </LineChart>
         </ResponsiveContainer>
       </ChartContainer>

       <div className="p-4 space-y-6">


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

{/* ✅ White Recent Sales Table */}
<div>
 
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

    </>
       

    )
}
export default EarningOverview;