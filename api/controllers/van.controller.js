import Van from "../model/van.model.js";
import { errorHandler } from "../utils/errorHandler.js";


export const test = (req, res) => {
    res.json({message: 'API is working'});
}

export const createVan = async (req, res, next) => {
    
    if(!req.body.name || !req.body.type || 
        !req.body.price || !req.body.imageURL || 
        !req.body.description || !req.body.hostId) {
        return next(errorHandler(400, 'Please provide all required field'));
    }
    try {
        const newVan = new Van ({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageURL: req.body.imageURL,
            type: req.body.type,
            hostId: req.body.hostId,
        });
        const van = await newVan.save();
        res.status(201).json(van);
    } catch (err) {
        next(err);
    }
};

export const getVans = async (req, res, next) => {
    try {
        const vans = await Van.find({});
        return res.status(200).json({
            count: vans.length,
            data: vans
        });
    } catch (err) {
        next(err);
    }
}

export const getVan = async (req, res, next) => {
    try {
        const { vanId } = req.params;
        const van = await Van.findById(vanId);
        return res.status(200).json(van);
    } catch (err) {
        next(err);
    }
}