export const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: " Route not found.",
        path: req.originalUrl,
        date: Date()
    });
};
//# sourceMappingURL=notFound.js.map