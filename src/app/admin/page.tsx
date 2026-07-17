"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { db, auth, app } from "@/lib/firebase";
import { Lock, LogOut, CheckCircle, XCircle, Search, Filter, Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const enableNotifications = async () => {
    try {
      const supported = await isSupported();
      if (!supported) {
        alert("Push notifications are not supported in this browser.");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const messaging = getMessaging(app);
        // Provide the VAPID key from environment or prompt
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY; 
        
        const currentToken = await getToken(messaging, { vapidKey });
        if (currentToken) {
          // Save the token to Firestore via Admin API to bypass security rules
          const response = await fetch('/api/register-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: currentToken, email: user?.email })
          });
          
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to register token');
          }

          setNotificationsEnabled(true);
          alert("Push notifications enabled! You will now receive alerts for new bookings.");
        } else {
          console.log('No registration token available.');
          alert("Failed to get push token.");
        }
      } else {
        alert("Permission denied. You can enable it in your browser settings.");
      }
    } catch (error: any) {
      console.error('An error occurred while retrieving token. ', error);
      alert("Error enabling notifications: " + error.message);
    }
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
    if (user) {
      fetchBookings();
    }
  }, [user]);

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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Access</h1>
          <p className="text-slate-500 text-center mt-3 font-medium">Sign in to access the booking dashboard.</p>
        </div>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 text-center">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
            required
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
            required
          />
          <Button type="submit" className="w-full rounded-xl h-14 text-lg font-bold shadow-xl shadow-primary/20 mt-2">
            Login to Dashboard
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your fleet bookings and reservations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={enableNotifications} 
            className={`rounded-xl font-semibold border-2 ${notificationsEnabled ? 'border-primary text-primary bg-primary/10' : 'border-slate-200'}`}
            title="Enable Push Notifications"
          >
            {notificationsEnabled ? <BellRing className="w-4 h-4 animate-pulse" /> : <Bell className="w-4 h-4" />}
            <span className="hidden sm:inline ml-2">{notificationsEnabled ? "Alerts On" : "Enable Alerts"}</span>
          </Button>
          <Button variant="outline" onClick={fetchBookings} disabled={loading} className="rounded-xl font-semibold border-2 border-slate-200">
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="rounded-xl gap-2 font-semibold">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-slate-900 dark:text-white font-medium cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
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
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500 font-medium text-lg">
                    {loading ? "Loading bookings..." : "No bookings found matching your filters."}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
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
