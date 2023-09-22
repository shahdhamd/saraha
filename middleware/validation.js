const methods=['body','params','headers','query']
const validation=(schema)=>{ //signUp مثل  validation تمثل الفنكشن الي بدي اعمله  schema
    return (req,res,next)=>{
        let validationArray=[]; // مصفوفة لتخزين الايرور
        methods.forEach(key=>{ //بلف على المصفوفة
            // بتمثل كل عنصر بلف عليه key
            //وهكذا params اللفة الثانية بتكون body اول لفة بتكون
          if(schema[key]){ // schema.body او schema.params نفس الاشي بس طريقة كتابة
                // console.log(key); // signin => body
                const validationResult=  schema[key].validate(req[key],{AbortEarly:false});
                if(validationResult?.error?.details){ 
//error الها قيمة بضمن انه في detailsو error وvalidationResul لما اضمن انه
                    validationArray.push(validationResult.error.details)
                }
            }
        })
        if(validationArray.length>0){ // يوجد ايرور
            res.json({message:'validation error',error:validationArray})
		validation=[]; // مشان يشيل كل مكونات الاريه
        }else{
            next();
        }
        // console.log(schema);
        }
}

module.exports={validation}