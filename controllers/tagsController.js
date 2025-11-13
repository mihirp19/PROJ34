import { getAllTagsService } from "../services/tagsService.js";

export const getTags = async (req, res) => {
    try {
        const tags = await getAllTagsService();
        res.json({ tags });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tags" });
    }
};
