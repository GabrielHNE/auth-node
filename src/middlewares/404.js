module.exports = (req, res, next) => {
    // console.log(`Requisition: \n${req}\n\n\n\n`);
    console.log(req.url);
    const err = new Error("Page not Found 404");
    err.status = 404;
    next(err);

    return res.json({ notfound: "Not found" });
}