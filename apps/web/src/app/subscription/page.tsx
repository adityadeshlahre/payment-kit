"use client";

import { useSubscriptionList } from "@/hooks/query/useSubscription";

export default function Subscription() {
  const { data: subscriptions, isLoading, error } = useSubscriptionList();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Subscriptions List</h1>
      {isLoading && <div>Loading subscriptions...</div>}
      {error && <div>Error loading subscriptions: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions?.items &&
          subscriptions.items.map((subscription) => (
            <div
              key={subscription.subscription_id}
              className="p-4 border rounded"
            >
              <h2 className="text-xl font-bold">
                Subscription {subscription.subscription_id}
              </h2>
              <p>Status: {subscription.status}</p>
              <p>
                Price: ${subscription.recurring_pre_tax_amount}{" "}
                {subscription.currency}
              </p>
              <p>Customer: {subscription.customer.name}</p>
              <p>
                Next Billing:{" "}
                {new Date(subscription.next_billing_date).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
