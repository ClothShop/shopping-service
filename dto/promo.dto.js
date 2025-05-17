const { z } = require('zod');

const promoCodeSchema = z.object({
    code: z.string().min(3),
    discountPercentage: z.number().min(1).max(100),
    validFrom: z.string(),
    validTo: z.string(),
    isActive: z.boolean().optional(),
});

const updatePromoCodeSchema = promoCodeSchema.partial();

module.exports = { promoCodeSchema, updatePromoCodeSchema };
