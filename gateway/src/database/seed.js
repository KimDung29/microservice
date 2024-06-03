const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { logger } = require("../logs");

const modulesDir = path.join(process.cwd(), "../services");
let seedingCommands = [];

fs.readdirSync(modulesDir).forEach((module) => {
    const seedsPath = path.join(
        modulesDir,
        module,
        "src",
        "database",
        "seeders"
    );
    if (fs.existsSync(seedsPath)) {
        const command = `sequelize-cli db:seed:all --seeders-path ${seedsPath} --config src/database/dbConfig.js`;
        seedingCommands.push(command);
    }
});

const getCommands = async () => {
    return seedingCommands;
};

getCommands()
    .then((commands) => {
        const promises = commands.map((command) => {
            return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        logger.error(
                            `Error executing command: ${command}`,
                            error.stack
                        );
                        reject(error);
                    } else {
                        logger.info(
                            `Executed command successfully: ${command}`
                        );
                        resolve();
                    }
                });
            });
        });
        return Promise.all(promises);
    })
    .then(() => {
        logger.info("All seeding commands executed successfully.");
    })
    .catch((error) => {
        logger.error("Error executing seeding commands:", error.stack);
    });
