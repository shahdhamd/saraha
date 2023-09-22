const multer =require('multer')
const {nanoid}=require('nanoid')
function myMulter(customvalidation){ // customvalidation عبارة عن اريه
    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"upload")
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+'_'+nanoid()+'_'+file.originalname)
        }})
    function fileFilter(req,file,cb){
        if(customvalidation.includes(file.mimetype)){ // بفحص اذا النوع الملف زي النوع الي في المصفوفة
            cb(null,true);  // true => ضيفها
        }else{
            cb('invalid file type',false);
        }}
    const upload=multer({dest:'upload',fileFilter,storage});
    return upload;
}


const HME=(error,req,res,next)=>{ // الترتيب مهم
    if(error){
        res.status(400).json({message:'multer error',error});
    }else{
        next();}
}
module.exports={myMulter,HME};

