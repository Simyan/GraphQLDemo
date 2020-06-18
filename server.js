//step 1
const express = require('express')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')

//step 7 - Mock data source
const Movies = [
    {Uid: 1, Name: 'Inception', Director: 'Cristopher Nolan', Rating: 91},
    {Uid: 2, Name: 'Inglorious Basterds', Director: 'Quentin Tarantino', Rating: 88},
    {Uid: 3, Name: 'Spirited Away', Director: 'Hayao Miyazaki', Rating: 96},
    {Uid: 4, Name: 'Jojo Rabbit', Director: 'Taika Waititi', Rating: 94},
    {Uid: 5, Name: 'Lady Bird', Director: 'Greta Gerwig', Rating: 79},
    {Uid: 6, Name: 'Django Unchained', Director: 'Quentin Tarantino', Rating: 91},
    {Uid: 7, Name: 'Arrival', Director: 'Denis Villeneuve', Rating: 82},
    {Uid: 8, Name: 'Wolf Children', Director: 'Mamoru Hosoda', Rating: 92},
    {Uid: 9, Name: 'My Neighbor Totoro', Director: 'Hayao Miyazaki', Rating: 94},
]

//step 6 - Model graphql Types
const MovieType = new graphql.GraphQLObjectType({
    name: 'Movie',
    fields : () => ({
        Uid: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
        Name: {type:graphql.GraphQLNonNull(graphql.GraphQLString)},
        Director: {type:graphql.GraphQLNonNull(graphql.GraphQLString)},
        Rating: {type:graphql.GraphQLNonNull(graphql.GraphQLFloat)},
    })
})

//step 2
const QueryRoot = new graphql.GraphQLObjectType ({
    name: 'Query',
    fields: () => ({
        //step 2.1
        helloworld: {
            type: graphql.GraphQLString,
            resolve: () => "Hello, world!"
        },
        //step 8
        movies: {
            type: graphql.GraphQLList(MovieType),
            resolve: () => Movies
        },
        //step 8.1
        movie: {
            type: MovieType,
            args: {
                Uid: { type: graphql.GraphQLInt }
            },
            resolve: (parents, args) => Movies.find(movie => movie.Uid == args.Uid)
        }

    })
})

//Step 9
const MutationRoot = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        newMovie: {
            type: MovieType,
            args: {
                name: { type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                director: { type: graphql.GraphQLNonNull(graphql.GraphQLString)},
                rating: { type: graphql.GraphQLNonNull(graphql.GraphQLFloat)},
            },
            resolve: (parents, args) => {
                const movieObj = {Uid: Movies.length + 1, Name: args.name, Director: args.director, Rating: args.rating  }
                Movies.push(movieObj)
                return movieObj
            } 
        }
    })
})

//step 3
const schemaObj = new graphql.GraphQLSchema({ query : QueryRoot, mutation: MutationRoot});

//step 4 
const app = express();
app.use('/api', graphqlHTTP({
    schema: schemaObj,
    graphiql: true,
}));
app.listen(2800);

//step 5 - run it - node server.js



