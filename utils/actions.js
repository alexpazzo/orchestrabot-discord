const reddit = require('../actions/reddit');
const fs = require("fs");
const { join } = require("path");

const actions = new Map();

const actionFiles = fs.readdirSync(join(__dirname, "../actions")).filter((file) => file.endsWith(".js"));
for (const file of actionFiles) {
    const action = require(join(__dirname, "../actions", file));
    actions.set(action.name, action);

};

module.exports = {
    /**
     * @param {string} actionString 
     */
    async executeAction(actionString, message) {
        const [actionType, arg] = actionString.split('@');

        const action = actions.get(actionType);
        if (!action) throw new Error(`Invalid action ${actionType}`);

        await action.execute(arg, message);
    }
}