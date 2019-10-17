const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (model) => catchAsync(async (req, res, next) => {

        const doc = await model.findByIdAndDelete(req.params.id);
        if (!doc) {
          return next(new AppError('No tour found with that ID', 404));
        }
      
        res.status(204).json({
          status: 'success',
          data: null
        });
});

/* const closure = (a) => (b) => test((a,b) => {
    console.log('inside higher order funs') 
} );

const test = fn => {
    return (a,b) => fn(a,b)
}

const one = closure(10);
const two = one(20);
two() */

exports.updateOne = (model) => catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!doc) {
      return next(new AppError('No tour found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
});

exports.findOne = (model,populateOptions) => catchAsync(async (req, res, next) => {
    let query = model.findById(req.params.id);
    if(populateOptions) query = query.populate(populateOptions)
    //query = model.findOne({ _id: req.params.id })
    const doc = await query;

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
});
  
exports.createOne = (model) => catchAsync(async (req, res, next) => {
    const doc = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
});


exports.findAll = (model) => catchAsync(async (req, res, next) => {
    let filter = {};    
    if(req.params.tourId) filter = {'tour': req.params.tourId}

    const features = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;
    
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
});