import React from "react";
import {
  BsCashStack,
  BsCartCheck,
  BsPhone,
  BsArrowUpRight,
  BsBoxSeam,
} from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const SellerStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/seller-stats");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:p-10 bg-[#fcfcfd] min-h-screen">
      {/* Welcome Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          Seller <span className="text-emerald-500">Pulse</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Manage your listings and track your earnings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Revenue - Deep Gradient */}
        <div className="relative overflow-hidden group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl transition-all hover:scale-[1.02]">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">
                Total Earnings
              </p>
              <h3 className="text-5xl font-black italic">
                ${stats.revenue || 0}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <BsArrowUpRight /> <span>+12.5% this month</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <BsCashStack size={32} className="text-emerald-400" />
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
        </div>

        {/* Orders Card - Clean & Minimal */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-orange-50 text-orange-500 p-4 rounded-2xl">
              <BsCartCheck size={28} />
            </div>
            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-black rounded-full">
              Processing
            </span>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              Orders Handled
            </p>
            <h3 className="text-4xl font-black text-slate-800 mt-1">
              {stats.totalOrders || 0}
            </h3>
          </div>
        </div>

        {/* Inventory Card - With Progress Bar */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-blue-50 text-blue-500 p-4 rounded-2xl">
              <BsPhone size={28} />
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-slate-800 uppercase italic">
                Stock Status
              </p>
            </div>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            Live Listings
          </p>
          <h3 className="text-4xl font-black text-slate-800 mt-1">
            {stats.totalInventory || 0}
          </h3>

          <div className="mt-5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[70%]" />
          </div>
        </div>
      </div>

      {/* Quick Action & Analysis Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Graph Area */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-black text-slate-800 text-xl tracking-tight">
              Sales Trajectory
            </h4>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-48 flex items-center justify-center">
            <p className="text-slate-400 font-bold italic tracking-tighter">
              Graph visualizing your growth...
            </p>
          </div>
        </div>

        {/* Recent Activity Mini List */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <h4 className="font-black text-slate-800 text-xl tracking-tight mb-6">
            Recent Alerts
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <BsBoxSeam />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Low Stock Alert
                </p>
                <p className="text-xs text-slate-400">
                  iPhone 15 Pro is down to 2 units.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <BsCartCheck />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">New Sale!</p>
                <p className="text-xs text-slate-400">
                  Order #9823 was just placed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;
