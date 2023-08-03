import config from "./config/config";
import connect from "./db/connect";
import app from './server';


const PORT: string | number = config.app.PORT


connect().then( async function onServerStart() {
    console.log(`Connected to database`);
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
