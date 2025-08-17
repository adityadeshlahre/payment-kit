import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { customerFetchViaEmailSchema, customerListResponseSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const getCustomerListUsingDodoPaymentClientHandler =
	factory.createHandlers(
		describeRoute({
			tags: ["customers"],
			description: "Retrieve a list of customers",
			parameters: [

				{
					name: "page_size",
					in: "query",
					description: "Page size of the customer list (1-100)",
					required: false,
					schema: {
						type: "integer",
						minimum: 1,
						maximum: 100,
					},
				}, {
					name: "email",
					in: "query",
					description: "Email of the customer",
					required: false,
					schema: {
						type: "string",
						format: "email",
					},
				},
				{
					name: "page_number",
					in: "query",
					description: "Page number of the customer",
					required: false,
					schema: {
						type: "integer",
						minimum: 1,
						maximum: 100
					},

				},
			],
			responses: {
				[HttpStatus.HTTP_200_OK]: {
					description: "Customers retrieved successfully",
					content: {
						"application/json": {
							schema: resolver(customerListResponseSchema),
						},
					},
				},
				[HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
					description: "Internal server error",
					content: {
						"application/json": {
							schema: resolver(customerListResponseSchema),
						},
					},
				},
			},
		}),
		zValidator("query", customerFetchViaEmailSchema),
		validator("query", customerFetchViaEmailSchema),
		async (c) => {
			console.log(c.req.valid("query"));

			try {
				const customersData = await dodoPaymentClient.customers.list({
					email: c.req.valid("query")?.email,
					page_size: c.req.valid("query")?.page_size,
					page_number: c.req.valid("query")?.page_number,
				});
				return c.json(customersData, HttpStatus.HTTP_200_OK);
			} catch (error) {
				console.error("Error retrieving customers:", error);
				throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
					message:
						error instanceof Error
							? error.message
							: "Failed to retrieve customers",
				});
			}
		},
	);
