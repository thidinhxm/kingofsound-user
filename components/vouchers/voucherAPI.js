
const voucherService = require('./voucherService');

exports.checkValidVoucher =  async(req,res,next) =>
{
    try {
       const {voucher_id} = req.body;
       const voucher = await voucherService.getVoucher(voucher_id);
       if(voucher)
        res.json(
            {
                success: true,
                discount:voucher.discount
            }
        )
        else
            res.json({
                success: false,
                discount :0
            })
    }
    catch (err) {
        next(err);
    }
}