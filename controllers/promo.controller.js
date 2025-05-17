const promoService = require('../services/promo.service');

exports.create = async (req, res) => {
    try {
        const promo = await promoService.createPromo(req.body);
        res.status(201).json(promo);
    } catch (e) {
        res.status(400).json({ error: e.errors || e.message });
    }
};

exports.getAll = async (req, res) => {
    const promos = await promoService.getAllPromos();
    res.json(promos);
};

exports.getOne = async (req, res) => {
    const promo = await promoService.getPromoById(req.params.id);
    if (!promo) return res.status(404).json({ error: 'Promo not found' });
    res.json(promo);
};

exports.getByCode = async (req, res) => {
    const promo = await promoService.getPromoByCode(req.params.code);
    if (!promo) return res.status(404).json({ error: 'Promo not found' });
    res.json(promo);
};

exports.update = async (req, res) => {
    try {
        const updated = await promoService.updatePromo(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Promo not found' });
        res.json(updated);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await promoService.deletePromo(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Promo not found' });
        res.json({ message: 'Promo deleted' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.removeByCode = async (req, res) => {
    try {
        const deleted = await promoService.deletePromoByCode(req.params.code);
        if (!deleted) return res.status(404).json({ error: 'Promo not found' });
        res.json({ message: `Promo '${req.params.code}' deleted` });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};