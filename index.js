const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");


require("dotenv").config({
    path: ".env"
});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err, _) => {

    if(err){
        console.log("Ocurrió un error al conectarse a la base de datos");
    }else{
        server();
    }


});


function server() {
    const serverApollo = new ApolloServer({
     typeDefs,
     resolvers,
     context: ({req}) => {
          
        const token = req.headers.authorization;

          if(token){
              try{

                const user = jwt.verify(
                    token.replace("Bearer ", ""),
                    process.env.SECRET_KEY
                )

                return {
                    user
                }

              }catch(error){
                  console.log("####ERROR###");
                  console.log(error);
                  throw new Error("Token inválido");
              }
          }

     }   
    });

    serverApollo.listen().then(({url}) => {
        console.log(`Servidor GQL ON en: ${url}`);
    });         
}
