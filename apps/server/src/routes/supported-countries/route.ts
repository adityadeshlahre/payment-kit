import { Hono } from "hono";
import { dodoPaymentsSupportedCountriesHandler } from "./handler/get";

const supportedCountries = new Hono().get(
  "/",
  ...dodoPaymentsSupportedCountriesHandler,
);

export default supportedCountries;
