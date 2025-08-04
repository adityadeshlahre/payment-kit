import { dodoPaymentClient } from "@/lib/auth";
import { COUNTRIES } from "@/lib/countries";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

function getMatchedCountries(
  countryValues: string[],
  countryObjects: ReadonlyArray<{ title: string; value: string }>,
) {
  return countryObjects.reduce(
    (acc, country) => {
      if (countryValues.includes(country.value)) {
        acc.push({ ...country });
      }
      return acc;
    },
    [] as { title: string; value: string }[],
  );
}

export const dodoPaymentsSupportedCountriesHandler = factory.createHandlers(
  async (c: Context) => {
    try {
      const response = await dodoPaymentClient.misc.listSupportedCountries();
      const matchedCountries = getMatchedCountries(response, COUNTRIES);
      return c.json({ countries: matchedCountries });
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve products",
      });
    }
  },
);
