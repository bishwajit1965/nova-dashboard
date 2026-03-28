import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import Card from "../../../../components/ui/Card";
import api from "../../../../lib/api";

const BillingSummaryCard = () => {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const res = await api.get("/admin/billing-summary");
        setBillingData(res.data);
      } catch (error) {
        console.error("Failed to load billing summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  if (loading) return <Card className="p-4">Loading billing summary...</Card>;

  return (
    <Card className="p-4 space-y-2 shadow-md">
      <h2 className="text-xl font-semibold">Billing Summary</h2>
      <p className="text-sm text-muted">
        Total Monthly Revenue:{" "}
        <strong>৳{billingData?.totalRevenue.toLocaleString("en-BD")}</strong>
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={billingData.plans}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" name="Revenue (BDT)" />
          <Bar dataKey="users" fill="#6366f1" name="Users" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BillingSummaryCard;
