import mongodb from "@/context/infrastructure/mongodb";

module.exports = async () => {
    await mongodb.close();
};