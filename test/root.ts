import mongoose from "mongoose";

setup(() => {
  const modelNames = Object.keys(mongoose.connection.models);
  for (const model of modelNames) {
    // @ts-expect-error This is marked as read only, but we need to clear the models out on each test run.
    delete mongoose.connection.models[model];
  }
});
