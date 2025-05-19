const { z } = require('zod');

const promoCodeSchema = z.object({
    code: z.string().min(3),
    discount_percentage: z.number().min(1).max(100),
    valid_from: z.string(),
    valid_to: z.string(),
    is_active: z.boolean().optional(),
});

const updatePromoCodeSchema = promoCodeSchema.partial();

module.exports = { promoCodeSchema, updatePromoCodeSchema };
