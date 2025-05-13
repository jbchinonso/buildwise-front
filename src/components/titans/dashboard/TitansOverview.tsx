"use client";
import CustomTable from "./CustomTable";

// ✅ Summary Table (Green Table)
const summaryData = [
  {
    totalClient: "7",
    activeBuyers: "5",
    properties: "15",
    closedSales: "2",
    
  },
];

const summaryColumns = [
  { header: "Total Clients", accessor: "totalClient" },
  { header: "Active Buyers", accessor: "activeBuyers" },
  { header: "Properties", accessor: "properties" },
  { header: "Closed Sales", accessor: "closedSales" },
  
];

// ✅ Sales Table (White Table)
const salesData = [
  {
    clientName: "Sodiq Nasichukwu",
    properties: "1",
    status: "Active",
    payment: "30% completed",
    joined: "1 year 3m ago",
  },
  {
    clientName: "Tolu Emmanuel",
    properties: "1",
    status: "Active",
    payment: "30% completed",
    joined: "1 year 3m ago",
  },
  {
    clientName: "Chioma Duru",
    properties: "1",
    status: "Active",
    payment: "50% completed",
    joined: "1 year 3m ago",
  },
  {
    clientName: "Ahmed Bako",
    properties: "1",
    status: "Closed",
    payment: "100% completed",
    joined: "1 year 3m ago",
  },
];

const salesColumns = [
  { header: "Client's name", accessor: "clientName" },
  { header: "Properties", accessor: "properties" },
  { header: "Status", accessor: "status" },
  { header: "Payment", accessor: "payment" },
  { header: "Joined", accessor: "joined" },
];

const TitansOverview = () => {
  return (
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
  );
};

export default TitansOverview;
