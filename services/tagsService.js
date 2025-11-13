import Tags from "../models/Tags.js";

export const getAllTagsService = async () => {
  return await Tags.find({}).select('name -_id') .sort({ name: 1 });
};
