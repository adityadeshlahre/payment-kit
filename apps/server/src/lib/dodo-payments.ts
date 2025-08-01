class DodoPaymentsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.dodo.dev/v1") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        `Dodo Payments API Error: ${error.message || response.statusText}`,
      );
    }

    return response.json();
  }

  subscriptions = {
    create: async (data: {
      customerId: string;
      planId: string;
      paymentMethodId?: string;
      metadata?: Record<string, any>;
    }) => {
      return this.makeRequest("/subscriptions", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    update: async (
      subscriptionId: string,
      data: {
        status?: "active" | "cancelled" | "paused";
        cancelAtPeriodEnd?: boolean;
        metadata?: Record<string, any>;
      },
    ) => {
      return this.makeRequest(`/subscriptions/${subscriptionId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    changePlan: async (
      subscriptionId: string,
      data: {
        planId: string;
        prorate?: boolean;
      },
    ) => {
      return this.makeRequest(`/subscriptions/${subscriptionId}/change-plan`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    get: async (subscriptionId: string) => {
      return this.makeRequest(`/subscriptions/${subscriptionId}`);
    },

    list: async (customerId?: string) => {
      const params = customerId ? `?customer_id=${customerId}` : "";
      return this.makeRequest(`/subscriptions${params}`);
    },
  };

  customers = {
    create: async (data: {
      email: string;
      name?: string;
      metadata?: Record<string, any>;
    }) => {
      return this.makeRequest("/customers", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    get: async (customerId: string) => {
      return this.makeRequest(`/customers/${customerId}`);
    },
  };
}

export const dodoPaymentsClient = new DodoPaymentsClient(
  process.env.NODE_ENV === "development"
    ? (process.env.DODO_API_KEY_TEST as string)
    : (process.env.DODO_API_KEY_LIVE as string),
);
