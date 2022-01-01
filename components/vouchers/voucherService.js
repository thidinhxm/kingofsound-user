const {models} = require("../../models")

exports.getVoucher = (id) =>
{
    return models.vouchers.findOne({where:{voucher_id:id},raw:true});
}