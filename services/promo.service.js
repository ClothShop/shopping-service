const PromoCode = require('../models/promoCode');

const createPromo = async (data) => {
    const promo = new PromoCode(data);
    return await promo.save();
};

const getAllPromos = async () => {
    return await PromoCode.find();
};

const getPromoById = async (id) => {
    return await PromoCode.findById(id);
};

const getPromoByCode = async (code) => {
    const now = new Date();
    return await PromoCode.findOne({
        code,
        is_active: true,
        valid_from: { $lte: now },
        valid_to: { $gte: now }
    });
};

const updatePromo = async (id, data) => {
    return await PromoCode.findByIdAndUpdate(id, data, { new: true });
};

const deletePromo = async (id) => {
    return await PromoCode.findByIdAndDelete(id);
};

const deletePromoByCode = async (code) => {
    return await PromoCode.findOneAndDelete({ code });
};


module.exports = {
    createPromo,
    getAllPromos,
    getPromoById,
    getPromoByCode,
    updatePromo,
    deletePromo,
    deletePromoByCode,
};
