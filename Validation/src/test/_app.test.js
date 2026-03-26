// yaha hum sirf basic sa template follow as hum prod ni samjhn cha rahe hopw it work
const request=require('supertest');   //npm i jest supertest ye karna  dono download 
const app=require('../app');


//bata raha ki get req hai 
//solud return 200 ok uss func ka name iski jagah kuch aur bhi par jayda tar aise jsse test case padhne m asani ho
describe("GET /",()=>{
    it("should return 200 OK",async()=>{
        const res=await request(app).get("/")    //ye request ke help se app ke get ko call karenge 
        expect(res.statusCode).toEqual(200) //expect ki help se check ki kya ye aaye hai  .toBe bhi sahi
        expect(res.body).toHaveProperty("message","welcome to validation")
        //upar wale ki jagah niche wala bhi behj sakte upar wala check kya usme vo hai nich wale mein bas exact check
        expect(res.body).toEqual({message:"welcome to validation"})
    })
}
)

// at last terminal m npx jest likh ke run

//npx jest 