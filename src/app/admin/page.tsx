"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Lock, LogOut, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("danz_admin_auth");
      if (auth === "true") setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "DANZ2026";
    
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
      localStorage.setItem("danz_admin_auth", "true");
    } else {
      alert("Incorrect passcode");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("danz_admin_auth");
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: newStatus
      });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending': return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      case 'Approved': return <Badge className="bg-emerald-500 hover:bg-emerald-600">Approved</Badge>;
      case 'Completed': return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>;
      case 'Rejected': 
      case 'Cancelled': return <Badge className="bg-rose-500 hover:bg-rose-600">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Access</h1>
          <p className="text-slate-500 text-center mt-3 font-medium">Enter the secure passcode to access the booking dashboard.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
            className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-center tracking-[0.2em] text-xl font-bold"
          />
          <Button type="submit" className="w-full rounded-xl h-14 text-lg font-bold shadow-xl shadow-primary/20">
            Login to Dashboard
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your fleet bookings and reservations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchBookings} disabled={loading} className="rounded-xl font-semibold border-2 border-slate-200">
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="rounded-xl gap-2 font-semibold">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Vehicle</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Dates</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Locations</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500 font-medium text-lg">
                    {loading ? "Loading bookings..." : "No bookings found yet. They will appear here when submitted!"}
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900 dark:text-white text-base">{booking.name}</div>
                      <div className="text-sm text-slate-500 mt-1">{booking.phone}</div>
                      <div className="text-sm text-slate-500">{booking.email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-primary text-base">{booking.carName}</div>
                      <div className="text-sm font-semibold text-slate-500 mt-1">RM{booking.pricePerDay}/day</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-14">Pickup</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-14">Return</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{new Date(booking.returnDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-slate-900 dark:text-white max-w-[200px] truncate font-semibold" title={booking.pickupLocation}>
                        {booking.pickupLocation}
                      </div>
                      <div className="text-slate-500 text-sm mt-1">to {booking.returnLocation}</div>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        {booking.status === 'Pending' && (
                          <>
                            <button onClick={() => updateStatus(booking.id, 'Approved')} className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-xl transition-colors shadow-sm" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button onClick={() => updateStatus(booking.id, 'Rejected')} className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 rounded-xl transition-colors shadow-sm" title="Reject">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {booking.status === 'Approved' && (
                          <button onClick={() => updateStatus(booking.id, 'Completed')} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl transition-colors shadow-sm" title="Mark Completed">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {(booking.status === 'Pending' || booking.status === 'Approved') && (
                          <button onClick={() => updateStatus(booking.id, 'Cancelled')} className="text-sm font-semibold text-slate-400 hover:text-slate-600 underline ml-2">Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
