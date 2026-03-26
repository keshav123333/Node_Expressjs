const {body,params,query,validationResult}=require('express-validator'); // npm i express-validator
// yaha upar {} iske anadar aur bhi cheez import and usse use to validate chatgpt kar usne ni bataya 


/// so ab flow samjh niche jo list registerUserValidationRules uske andar condiation de di jo true hona chaiye and then iss validate 
// func m send karenge and yaha validationresult req ko check ky koi req m koi error hai kya store if yes toh vo error print 
// and if ni toh aage bad jayenge 
async function validate(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
}


const registerUserValidationRules=[
    body("username")
    .isString()
    .withMessage("username should be a string")
    .isLength({min:3, max:20})
    .withMessage("username should be between 3 and 20 characters"),

    body("email")
    .isEmail()
    .withMessage("Please provide a valid email"),

    body("password")
    .isLength({min:6})
    .withMessage("password should be at least 6 characters long"),
    validate
]

module.exports={
    registerUserValidationRules
}