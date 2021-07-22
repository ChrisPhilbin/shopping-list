const graphql = require("graphql");
const Item = require("../models/item");
const Trip = require("../models/trip");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    inCart: { type: GraphQLBoolean },
    trip: {
      type: TripType,
      resolve(parent, args) {
        return Trip.findById(parent.tripId);
      },
    },
  }),
});

const TripType = new GraphQLObjectType({
  name: "Trip",
  fields: () => ({
    id: { type: GraphQLID },
    storeName: { type: GraphQLString },
    date: { type: GraphQLString },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        console.log(parent.id, "parent object from trip resolver");
        return Item.find({ tripId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Item.findById(args.id);
      },
    },
    trip: {
      type: TripType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Trip.findById(args.id);
      },
    },
    items: {
      type: GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find({});
      },
    },
    trips: {
      type: GraphQLList(TripType),
      resolve(parent, args) {
        return Trip.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        inCart: { type: new GraphQLNonNull(GraphQLBoolean) },
        tripId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let item = new Item({
          name: args.name,
          inCart: args.inCart,
          tripId: args.tripId,
        });
        return item.save();
      },
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        inCart: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        let item = Item.findById(args.id);
        item.inCart = args.inCart;
        return item.save();
      },
    },
    addTrip: {
      type: TripType,
      args: {
        storeName: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let trip = new Trip({
          storeName: args.storeName,
          date: args.date,
        });
        return trip.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
