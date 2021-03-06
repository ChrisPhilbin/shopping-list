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
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    inCart: { type: GraphQLNonNull(GraphQLBoolean) },
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
    id: { type: GraphQLNonNull(GraphQLID) },
    storeName: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
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
        if (!args.name) return new Error("Item name cannot be blank");
        let item = new Item({
          name: args.name,
          inCart: args.inCart,
          tripId: args.tripId,
        });
        return item.save();
      },
    },
    deleteItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Item.findByIdAndDelete(args.id);
      },
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        inCart: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        return Item.updateItem(args.id, args.inCart);
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
        if (!args.storeName) return new Error("Store name cannot be blank!");
        if (!args.date) return new Error("Date value cannot be blank!");
        return trip.save();
      },
    },
    deleteTrip: {
      type: TripType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Trip.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
