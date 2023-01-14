import {GraphQLFloat} from "graphql";

const graphql = require('graphql');
import allProductsData from './allProducts';


const { GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema } = graphql;


//Schema defines data on the Graph like object types(book type), the relation between
//these object types and describes how they can reach into the graph to interact with
//the data to retrieve or mutate the data

const TableLabelsType = new GraphQLObjectType({
    name: 'TableLabelsType',
    fields: () => ({
        wartoscOdzywcza: {type: GraphQLString},
        wartoscEnergetyczna: {type: GraphQLString},
        tluszcz: {type: GraphQLString},
        wTymKwasyNasycone: {type: GraphQLString},
        weglowodany: {type: GraphQLString},
        wTymCukry: {type: GraphQLString},
        bialko: {type: GraphQLString},
        sol: {type: GraphQLString},
    })
})

const TableValuesType = new GraphQLObjectType({
    name: 'TableValuesType',
    fields: () => ({
        wartoscOdzywcza: {type: GraphQLString},
        wartoscEnergetyczna: {type: GraphQLString},
        tluszcz: {type: GraphQLString},
        wTymKwasyNasycone: {type: GraphQLString},
        weglowodany: {type: GraphQLString},
        wTymCukry: {type: GraphQLString},
        bialko: {type: GraphQLString},
        sol: {type: GraphQLString},
    })
})


const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID  },
        bottle: {type: GraphQLString},
        name: { type: GraphQLString },
        tableLabels: {type: TableLabelsType},
        tableValues: {type: TableValuesType},
        category: { type: GraphQLString },
        price: {type: GraphQLFloat},
        netPrice: {type: GraphQLFloat},
        vat: {type: GraphQLFloat},
        hint: { type: GraphQLString }
    })
});

//RootQuery describes how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: ProductType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from a database source


                //this will return the book with id passed in argument by the user
                return allProductsData.find((item) => { return item.id == args.id});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use it when they are making requests.
module.exports = new GraphQLSchema({
    query: RootQuery
});
