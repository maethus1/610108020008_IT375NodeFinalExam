const Tour = require('./../models/tourModel');
exports.getAllTours = async(req,res) => {
    try{
        const tours = await Tour.find();
        res.status(200).render("main",
            {
                status: 'success',
                results: tours.length,
                data:{tours}
            }
        );
    }catch(err){
        res.status(404).json(
            {
                status: 'fail',
                message: err
            }
        );
    }
};
exports.getOneTour = async(req, res) => {
    try{
        const tourId = parseInt(req.params.id);
        const tour = await Tour.findOne({id: tourId});
        if(tour){
            res.status(200).json(
                {
                    status: 'success',
                    data:{tours}
                }
            );
        }else{
            res.status(404).json(
                {
                    status: 'fail',
                    message: 'id not found'
                }
            );
        }

    }catch(err){
        res.status(404).json(
            {
                status: 'fail',
                message: err
            }
        );
    }
};
exports.createNewTour = async(req,res) => {
    try{
        let currentTourId = await Tour.find({}).sort({id:-1}).limit(1).then((lastTour)=>{
            return lastTour[0].id
        });
        currentTourId +=1;
        const createTour = {
            id: currentTourId,
            ...req.body
        };
        const newTour = await Tour.create(createTour);
        res.status(200).json(
            {
                status: 'success',
                data: {tour: newTour}
            }
        );
    }catch(err){
        res.status(404).json(
            {
                status: 'fail',
                message: err
            }
        );
    }
};
exports.updateTour = async(req,res) => {
    try{
        const tourId = parseInt(req.params.id);
        const tour = await Tour.findOneAndUpdate({id:tourId},req.body,{
            new: true,
            runValidator: true
        });
        if(tour){
            res.status(200).json(
                {
                    status: 'success',
                    data: {tour}
                }
            );
        }else{
            res.status(404).json(
                {
                    status: 'fail',
                    message: 'id not found'
                }
            );
        }
    }catch(err){
        res.status(404).json(
            {
                status: 'fail',
                message: err
            }
        );
    }
};
exports.deleteTour = async(req,res) => {
    try{
        const tourId = parseInt(req.params.id);
        const tour = await Tour.findOneAndDelete({id:tourId});
        if(tour){
            res.status(200).json(
                {
                    status: 'success',
                    data: null
                }
            );
        }else{
            res.status(404).json(
                {
                    status: 'fail',
                    message: 'id not found'
                }
            );
        }
    }catch(err){
        res.status(404).json(
            {
                status: 'fail',
                message: err
            }
        );
    }
};
