import { z } from 'zod';

export const TravelPolicyCreateSchema = z.object({
  name: z.string(),
});
export type TravelPolicyCreateSchemaType = z.infer<
  typeof TravelPolicyCreateSchema
>;

export const TravelPolicyApprovalSchema = z.object({
  email: z.string(),
  restrictions: z.array(z.string()),
  comment: z.string(),
  passenger_names: z.string(),
  order_id: z.string(),
});
export type TravelPolicyApprovalSchemaType = z.infer<
  typeof TravelPolicyApprovalSchema
>;

export const TravelPolicyAddingSchema = z.object({
  email: z.string(),
  travel_policy_name: z.string(),
  restrictions: z.array(z.string()),
});
export type TravelPolicyAddingSchemaType = z.infer<
  typeof TravelPolicyAddingSchema
>;

export const TravelPolicySendingSchema = z.object({
  approving_users: z.array(z.array(z.string())),
});
export type TravelPolicySendingSchemaType = z.infer<
  typeof TravelPolicySendingSchema
>;

export const TravelPolicyApprovedSchema = z.object({
  order_id: z.string(),
  approving_user: z.string(),
  users: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  is_fully_approved: z.boolean(),
  is_fully_rejected: z.boolean(),
});
export type TravelPolicyApprovedSchemaType = z.infer<
  typeof TravelPolicyApprovedSchema
>;

export const TravelPolicyRejectedSchema = z.object({
  order_id: z.string(),
  approving_user: z.string(),
  comment: z.string().nullable().optional(),
});
export type TravelPolicyRejectedSchemaType = z.infer<
  typeof TravelPolicyRejectedSchema
>;
