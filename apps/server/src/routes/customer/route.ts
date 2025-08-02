import { Hono } from "hono";
import { getCustomerListUsingDodoPaymentClientHandler } from "./handler/get";

const customer = new Hono().get(
	"/",
	...getCustomerListUsingDodoPaymentClientHandler,
);

export default customer;
