"use client";

import { ShoppingBag, CreditCard } from "lucide-react";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ProfileInfoSectionProps {
  firstName: string;
  email: string;
  shippingAddress: Address;
  billingAddress: Address;
}

export const ProfileInfoSection = ({
  firstName,
  email,
  shippingAddress,
  billingAddress,
}: ProfileInfoSectionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-lg font-medium text-blue-800 mb-4">Basic Information</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-700">Full Name</p>
          <p className="text-blue-800">{firstName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-700">Email Address</p>
          <p className="text-blue-800">{email}</p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium text-blue-800 mb-4">Addresses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-blue-600 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <ShoppingBag size={16} className="text-blue-600" /> Shipping Address
          </h4>
          <p className="text-gray-700 text-sm">
            {shippingAddress.street}
            <br />
            {shippingAddress.city} {shippingAddress.state} {shippingAddress.zip}
            <br />
            {shippingAddress.country}
          </p>
        </div>
        <div className="border border-blue-600 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <CreditCard size={16} className="text-blue-600" /> Billing Address
          </h4>
          <p className="text-gray-700 text-sm">
            {billingAddress.street}
            <br />
            {billingAddress.city} {billingAddress.state} {billingAddress.zip}
            <br />
            {billingAddress.country}
          </p>
        </div>
      </div>
    </div>
  </div>
);