const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a book
exports.createBook = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncError will the the whole function as an input and execute try and catch functionality
    const book = await Product.create(req.body);

    res.status(200).json({
        success: true,
        book,
    });
});

// Get all books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5;
    const bookCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const books = await apiFeature.query;

    res.status(200).json({
        success: true,
        books,
        bookCount,
    });
});

// Get Single Book
exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Product.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 500))
    }

    res.status(200).json({
        success: true,
        book
    });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const book = await Product.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 500))
    }

    res.status(200).json({
        success: true,
        book,
        bookCount,
    });
});


// Update a book
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Product.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 500))
    }

    book = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        book
    })
});

// delete a book
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Product.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 500))
    };

    await book.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});


