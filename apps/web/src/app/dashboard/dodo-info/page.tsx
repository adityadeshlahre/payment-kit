"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DodoCustomerInfo() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const dodoCustomer = (session.session as any)?.dodo;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        DodoPayments Customer Information
      </h1>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">User Information</h2>
          <div className="grid gap-2">
            <div>
              <strong>User ID:</strong> {session.user.id}
            </div>
            <div>
              <strong>Name:</strong> {session.user.name}
            </div>
            <div>
              <strong>Email:</strong> {session.user.email}
            </div>
            <div>
              <strong>Email Verified:</strong>{" "}
              {session.user.emailVerified ? "Yes" : "No"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            DodoPayments Customer Information
          </h2>

          {dodoCustomer ? (
            <div className="grid gap-2">
              <div>
                <strong>Customer ID:</strong> {dodoCustomer.customer_id}
              </div>
              <div>
                <strong>Business ID:</strong> {dodoCustomer.business_id}
              </div>
              <div>
                <strong>Email:</strong> {dodoCustomer.email}
              </div>
              <div>
                <strong>Name:</strong> {dodoCustomer.name}
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                {dodoCustomer.phone_number || "Not provided"}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(dodoCustomer.created_at).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              No DodoPayments customer data found. This user might not have a
              linked DodoPayments account.
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Usage Example</h3>
          <p className="text-blue-700 text-sm">
            Now you can access DodoPayments customer data throughout your app
            using:
          </p>
          <code className="block bg-blue-100 text-blue-800 p-2 mt-2 rounded text-xs">
            const {`{data: session}`} = authClient.useSession();
            <br />
            const customerId = session?.session?.dodo?.customer_id;
          </code>
        </div>
      </div>
    </div>
  );
}
