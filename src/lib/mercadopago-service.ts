import { CreatePaymentRequest, Transaction } from "./types";
import { CONFIG } from "./utils";
import axios from "axios";

export class MercadoPagoService {
  private accessToken: string;

  constructor() {
    this.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
    if (!this.accessToken) {
      console.warn("MERCADOPAGO_ACCESS_TOKEN is not set. Mercado Pago payments will not work.");
    }
  }

  async createPayment(transaction: Transaction, request: CreatePaymentRequest): Promise<any> {
    if (!this.accessToken) {
      throw new Error("Mercado Pago access token is not configured.");
    }

    try {
      const mpRequest: any = {
        transaction_amount: transaction.amount / 100, // Mercado Pago usa valores em reais, não centavos
        description: `Pagamento para ${request.merchant_id}`,
        payment_method_id: request.payment_method.mercadopago_data?.payment_method_id || 'pix',
        payer: {
          email: request.customer?.email || 'customer@example.com',
        },
        external_reference: transaction.id,
        installments: request.payment_method.mercadopago_data?.installments || 1,
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webhooks/mercadopago`,
      };

      // Se houver um token do Mercado Pago, adicione-o
      if (request.payment_method.mercadopago_data?.token) {
        mpRequest.token = request.payment_method.mercadopago_data.token;
      }

      // Se houver um issuer_id, adicione-o
      if (request.payment_method.mercadopago_data?.issuer_id) {
        mpRequest.issuer_id = request.payment_method.mercadopago_data.issuer_id;
      }

      const response = await axios.post(
        "https://api.mercadopago.com/v1/payments",
        mpRequest,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const mpResponse = response.data;

      // Mapear a resposta do Mercado Pago para o formato interno
      let status: Transaction["status"];
      switch (mpResponse.status) {
        case "approved":
          status = "captured";
          break;
        case "pending":
          status = "pending";
          break;
        case "in_process":
          status = "pending";
          break;
        case "rejected":
          status = "failed";
          break;
        case "cancelled":
          status = "cancelled";
          break;
        case "refunded":
          status = "refunded";
          break;
        default:
          status = "pending";
      }

      return {
        status,
        acquirer_id: "mercadopago",
        acquirer_reference: mpResponse.id.toString(),
        authorization_code: mpResponse.authorization_code,
        error_code: mpResponse.status_detail,
        error_message: mpResponse.status_detail,
        // Adicionar outros dados relevantes do Mercado Pago
        mp_payment_id: mpResponse.id,
        mp_status: mpResponse.status,
        mp_status_detail: mpResponse.status_detail,
      };
    } catch (error: any) {
      console.error("Mercado Pago payment error:", error.response?.data || error.message);
      throw new Error(`Mercado Pago payment failed: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const mercadoPagoService = new MercadoPagoService();

