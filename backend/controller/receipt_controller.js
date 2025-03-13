const mongoose=require("mongoose")
const receipt_model=mongoose.model('receipt')

//retrive all receipts
const receipts=async(req,res)=>{
    try {
        const receipt=await receipt_model.find()
        if(!receipt.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:receipt}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert receipt
const new_receipt=async(req,res)=>{
    try{
        const formdata=req.body
        const receiptdata=await receipt_model.find()
        const count=receiptdata.length
        formdata.receiptno=count+1
        const receipt=await receipt_model(formdata)
        receipt.save()
        if(!receipt){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:receipt}})
        }
    }
    catch(error){
        console.log(error)
    }
}

const getcount=async(req,res)=>{
    try{
    const receipt=await receipt_model.find()
    
    if(!receipt){
        res.status(404).json({status:false,data:{message:'data is not valid'}})
    }
    else
    {
        const count=receipt.length
        res.status(200).json({status:true,data:{message:'data counted successfully',data:count}})
    }
    }catch(err){
        console.log(err)
    }
}
module.exports={new_receipt,receipts,getcount}