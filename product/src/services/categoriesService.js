import categories from '../models/Category.js';

class CategoryService {

    static getAllCategories = async () => {
        return await categories.find();
    };

    static getCategoryById = async (id) => {
        const category = await categories.findById(id);
        return category;
    };

    static getCategoryByName = async (name) => {
        const category = await categories.find({ nome: { $regex: name }});
        return category;
    };

    static createCategory = async (data) => {
        const newCategory = new categories(data);
        await newCategory.save();
        return newCategory;
    };

    static updateCategory = async (id, nome) => {
        const result = await categories.findByIdAndUpdate(id, { $set: { nome: nome } });
        return result;
    };

    static activateDeactivateCategory = async (id, newStatus) => {
        const result = await categories.findByIdAndUpdate(id, { $set: { status: newStatus }});
        return result;
    };

    static deleteCategoryById = async (id) => {
        const result = await categories.findByIdAndDelete(id);
        return result;
    };

};

export default CategoryService;