import {GenericContainer} from "testcontainers";

module.exports = async () => {
    const container = await new GenericContainer('mongo')
        .withExposedPorts(27017)
        .withReuse()
        .start();

    process.env.MONGODB_URL = `mongodb://${container.getHost()}:${container.getMappedPort(27017)}/secret-santa`;

};