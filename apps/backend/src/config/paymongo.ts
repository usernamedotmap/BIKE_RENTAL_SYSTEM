import axios from "axios";
import { ENV } from "./env";

// const isProd = ENV.IS_PROD
//   ? ENV.TEST_PAYMONGO_SECRET_KEY
//   : ENV.TEST_PAYMONGO_SECRET_KEY;

const SECRET_KEY = ENV.PAYMONGO_SECRET_KEY;

if (!SECRET_KEY) {
  console.log('[PAYMONGO] PAYMONGO_SECRET_KEY is not set. Please set it in your environment variables.');
}

const encoded = Buffer.from(`${SECRET_KEY}:`).toString("base64");

export const paymongoClient = axios.create({
  baseURL: "https://api.paymongo.com/v1",
  headers: {
    Authorization: `Basic ${encoded}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// typs mathcing paymongo api responses
export interface PayMongoPaymentIntent {
  id: string;
  type: "payment_intent";
  attributes: {
    amount: number;
    currency: string;
    status:
      | "awaiting_payment_method"
      | "awaiting_next_action"
      | "processing"
      | "succeeded"
      | "cancelled";
    client_key: string;
    description: string;
    payment_method_allowed: string[];
    payments: any[];
    metaData: Record<string, string>;
  };
}

export interface PayMongoPayment {
  id: string;
  type: "payment";
  attributes: {
    amount: number;
    status: "paid" | "failed";
    fee: number;
    currency: string;
    description: string;
    source: {
      type: string;
      id: string;
    };
    metaData: Record<string, string>;
  };
}

export interface PayMongoWebhookEvent {
  id: string;
  type: "webhook";
  attributes: {
    type: "payment.paid" | "payment.failed" | "payment_intent.succeeded";
    data: {
      attributes: PayMongoPayment["attributes"] & {
        payment_intent_id?: string;
        metadata?: Record<string, string>;
      };
    };
  };
}
