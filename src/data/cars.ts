export type CarAvailability = "Available" | "Limited" | "Booked";

export interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  gallery: string[];
  transmission: string;
  fuel: string;
  seats: number;
  luggage: number;
  price: number; // daily rate
  weeklyDiscount: number; // %
  monthlyDiscount: number; // %
  deposit: number;
  popular: boolean;
  availability: CarAvailability;
  features: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Perodua Bezza",
    type: "Compact Sedan",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    luggage: 2,
    price: 120,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    deposit: 300,
    popular: true,
    availability: "Available",
    features: ["Bluetooth", "USB Charger", "Air Conditioning", "Power Steering"],
  },
  {
    id: 2,
    name: "Honda Civic",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    luggage: 3,
    price: 250,
    weeklyDiscount: 10,
    monthlyDiscount: 25,
    deposit: 500,
    popular: false,
    availability: "Available",
    features: ["Apple CarPlay", "Android Auto", "Leather Seats", "Cruise Control", "Reverse Camera"],
  },
  {
    id: 3,
    name: "Toyota Vellfire",
    type: "Premium MPV",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Petrol",
    seats: 7,
    luggage: 4,
    price: 450,
    weeklyDiscount: 15,
    monthlyDiscount: 30,
    deposit: 1000,
    popular: true,
    availability: "Available",
    features: ["Captain Seats", "Sunroof", "Power Doors", "Premium Audio", "360 Camera"],
  },
  {
    id: 4,
    name: "Honda HR-V",
    type: "Compact SUV",
    image: "https://images.unsplash.com/photo-1566274360936-ce019688b139?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1566274360936-ce019688b139?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376760367-15103a89e173?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Hybrid",
    seats: 5,
    luggage: 3,
    price: 180,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    deposit: 400,
    popular: false,
    availability: "Available",
    features: ["Keyless Entry", "Push Start", "Auto Hold", "Eco Mode"],
  },
  {
    id: 5,
    name: "Mercedes C-Class",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    luggage: 3,
    price: 600,
    weeklyDiscount: 15,
    monthlyDiscount: 35,
    deposit: 1500,
    popular: false,
    availability: "Available",
    features: ["Burmester Sound", "Ambient Lighting", "Memory Seats", "Active Brake Assist"],
  },
  {
    id: 6,
    name: "Perodua Myvi",
    type: "Hatchback",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800"
    ],
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    luggage: 2,
    price: 100,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    deposit: 200,
    popular: true,
    availability: "Available",
    features: ["Smart Link", "Advanced Safety Assist", "LED Headlamps"],
  },
];
