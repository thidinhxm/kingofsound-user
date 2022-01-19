
const voucherService = require('./voucherService');

exports.checkValidVoucher = async (req, res, next) => {
    try {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const { voucher_id } = req.body;
        const voucher = await voucherService.checkValidVoucher(voucher_id,date);
        if (voucher)
            res.json(
                {
                    success: true,
                    discount: voucher.discount
                }
            )
        else
            res.json({
                success: false,
                discount: 0
            })
    }
    catch (err) {
        next(err);
    }
}